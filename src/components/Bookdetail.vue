<template>
    <div>
        <div class="bookinfo">
            <div class="thumb">
                <img :src="info.image" class="back" mode="aspectFill"  alt="">
                <img :src="info.image" class="bookImg" mode="aspectFit">
                <div class="info">
                    <div class="title">{{info.title}}</div>
                    <div class="author">{{info.author}}</div>
                </div>
            </div>
            <div class="detail">
                      <img :src="userInfo.avatarUrl" class='avatar' mode='aspectFit'>
                         {{userInfo.nickName}}
                    <div class="right text-primary">
                        {{info.rate}}分
                        <Rate :value='info.rate'></Rate>
                    </div>
            </div>
            <div class="tags">
                <div class="badge" :key="index" v-for="(tag,index) in info.tags">{{tag}}</div>
            </div>
            <div class="summary">
                简介：
                <p :key="sum" v-for="sum in info.summary">{{sum}}</p>
            </div>

        </div>
            <!-- <button class="backlist" @click="backBookList">返回列表</button> -->
            
    </div>
</template>

<script>
import Rate from '@/components/Rate'
    export default {
        props:['info',"userInfo"],
        data(){

        },
        components:{
            Rate
        },
        methods:{
            // backBookList () {
			//     wx.navigateBack()
		    // }
        }
        
    }
</script>

<style lang="scss"  scoped>
.bookinfo{
  font-size: 14px;
  
  .badge{
    display: inline-block;
    margin:5px;
    padding:5px;
    border-radius: 10px;
    border:1px #EA5A49 solid;
    color:#EA5A49;
  }
  .summary{
    padding:0 15px;
    margin-top:10px;
    p{
      text-indent: 2em;
      font-size:14px;
    }
  }
  .right{
    float: right;
  }
  .detail{
    padding:5px 10px;
    .avatar{
      width:20px;
      height:20px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  .thumb{
    width:750rpx;
    height:500rpx;
    overflow:hidden;
    position: relative;
    .back{
      filter: blur(15px);
      width:100%;
    }
    .bookImg{
      position: absolute;
      width:100%;
      height:300rpx;
      left:0;
      top:30rpx;
    }
    .info{
      color:white;
      position: absolute;
      width:100%;
      left:0;
      top:330rpx;
      text-align: center;
      .title{
        font-size:20px;
      }
      .author{
        font-size: 14px;
      }

    }
  }
}
// .backlist {
// 	margin:20px auto;
// 	text-align:center;
// 	background: #57bceb;
// 	color: #fff;
// }

</style>