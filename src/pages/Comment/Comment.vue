<template>
    <div>
         <CommentCard :key='bookid' v-for='bookid in bookids' :bookid="bookid"></CommentCard>
      
    </div>
</template>

<script>
import {get} from '@/until'
// import CommentList from '@/components/CommentList'
// import Card from '@/components/Card'
import CommentCard from '@/components/CommentCard'
    export default {
        methods:{
             async getbookid(){
                const bookid = await get('/weapp/bookid',{
                    openid:this.userinfo.openId
                })
                this.bookids=bookid
                // console.log(bookid)
                // bookid.forEach(v => {
                   
                //      this.bookid.push(v.bookid)
                //      console.log(this.bookid)
               
                // });
                   
            },
            //   async getBooks(){
            //         //  detail.tags=detail.tags.split(",");
            //         for(let i=0;i<this.bookid.length;i++){
            //             const books = await get('/weapp/booklist',{
            //              bookid:this.bookid[i]
            //      })
            //     console.log(books.list)
            //     this.books = books.list
                        
            //         }
               
            // },
                init(){
      wx.showNavigationBarLoading()
      this.getbookid()
    //   this.getBooks()
      wx.hideNavigationBarLoading()
    },

        },
        data(){
            return{
                bookids:[],
                books:[],
                userinfo:{},
             
            }
        },
        components:{
            //  Card,
             CommentCard
        },
      
          onShow(){
            if(!this.userinfo.openId){
            let userinfo = wx.getStorageSync('userinfo')
            if(userinfo){
                this.userinfo = userinfo
                this.init()
            }
            }
         }
    }
</script>

<style scoped>

</style>