<template>
    <div>
       <Bookdetail :info="info" :userInfo="userInfo"></Bookdetail>
       <CommentList :comments="comments"></CommentList>
       <div class="comment">
           <textarea  class="textarea" :maxlength="100" placeholder="请输入短评" v-model="comment"></textarea>
            <div class="location">
                地理位置
                <switch color="#EA5A49" :checked="lcoation"   @change="getGeo"></switch>
                <span class="text-primary">{{location}}</span>
            </div>
            <div class="phone">
                手机型号
                 <switch color="#EA5A49" :checked="phone" @change="getPhone"></switch>
                   <span class="text-primary">{{phone}}</span>
            </div>
            <button class="btn" @click="addComment">
                评论
            </button>
       </div>
    </div>
</template>

<script>
import {get,post,showModal} from "@/until"
import Bookdetail from "@/components/Bookdetail"
import CommentList from "@/components/CommentList"

import { throws } from 'assert';
    export default {
        mounted(){
            this.bookid=this.$root.$mp.query.id,
            this.getDetail()
            const userinfo = wx.getStorageSync('userinfo')
                if (userinfo) {
                    this.userinfo = userinfo
                }
            this.getComments()
        },
        data(){
            return {
                bookid:"",
                info:{},
                userInfo:{},
                userinfo: {},
                comment:'',
                location:"",
                phone:""
            }
        },
        components:{
            Bookdetail,
            CommentList
        },
        methods:{
            async getDetail(){
                const info=await get("/weapp/bookdetail",{id:this.bookid})
                 this.info=info
                 this.userInfo=info.user_info
                 wx.setNavigationBarTitle({
    				title: info.title
	    		})
            },
            async addComment(){
                const data={
                    bookid:this.bookid,
                    openid:this.userinfo.openId,
                    location:this.location,
                    phone:this.phone,
                    comment:this.comment
                }
               if (!this.comment) {
                   showModal("失败","添加内容不能为空")
                    return
                 }
                try{
                     await post("/weapp/addcomment",data)
                     this.comment=""
                }catch(e){
                     showModal('失败', e.msg)
                }
              
            },
            async getComments(){
                const comments=await get("/weapp/commentlist",{bookid:this.bookid})
                //  console.log('comments', comments)
                this.comments = comments.list||[""]
                console.log(this.comments)

            },
            getGeo(e){
                if(e.target.value){
                    // BzYAhYDFeF7gqUN8xLi3XxsiixKphYan
                    // http://api.map.baidu.com/geocoder/v2/?address=北京市海淀区上地十街10号&output=json&ak=您的ak&callback=showLocation
                    const ak = 'BzYAhYDFeF7gqUN8xLi3XxsiixKphYan'
                    let url = 'http://api.map.baidu.com/geocoder/v2/'
                     var that=this 
                     //需要重新定义this指向，因为此时为双层的函数掏钱，内部的this访问无法访问到外部data内定义的location，所以需要在外部定义var that=this来进行调用
                    wx.getLocation({
                        success: function(res) {
                            wx.request({
                                url:url,
                                data: {
                                    location:`${res.latitude},${res.longitude}`,
                                    output:'json',
                                    ak
                                },
                                success: res=>{
                                    console.log(res)
                                if (res.data.status === 0) {
                                           that.location = res.data.result.formatted_address
                                    // console.log(res.data.result.formatted_address);
                                    } else {
                                    this.location = '未知地点'
                                    // console.log('出错了')
                                    }
                                },
                            })
                        },
                    })
                }else{
                    this.location=""
                }
            },
            getPhone(e){
                if(e.target.value){
                    const phoneInfo=wx.getSystemInfoSync()
                    this.phone=phoneInfo.model
                }else{
                    this.phone=''
                }
            }
        }
    }
</script>
<style scoped lang="scss">
.comment{
    margin-top: 10px;
    .textarea{
        width: 750rpx;
        height: 200rpx;
        background: #eee;
        padding: 10px;
    }
    .location{
        margin-top: 10px;
        padding: 5px 10px;
    }
    .phone{
        margin-top: 10px;
        padding: 5px 10px;
    }
}
</style>