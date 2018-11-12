<template>
    <div>
        <div class="comment-list" v-if="comments.length">
            <div class="page-title" >
                评论
            </div>
            <div class="comment" v-for="comment in comments" :key="comment.id">
                <div class="user">
                    <div class="inline">
                        <img :src="comment.image" alt=""  class="avatar"
                mode='aspectFit'>
                        {{comment.title}}
                    </div>
                      <div class="right text-primary">
                            {{comment.location||'未知地点'}}
                            <span class="text-primary">
                                --
                            </span>
                            {{comment.phone||'未知型号'}}
                        </div>
                </div>
                  <div class="content">
                    {{comment.comment}}
                  </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        props:{
             comments:{type:[Array],default:[]}
        },
        mounted(){
            console.log(this.comments)
        }
 
    }
</script>

<style scoped lang="scss">
.comment-list{
  background:#eee;
  font-size:14px;
  .comment{
    background: white;
    margin-bottom:10px;
    padding:5px 20px;
    .content{
      margin:10px 0;
    }
    .user{
    
      .inline{
        display:inline-block;
        .avatar{
          width:20px;
          height:20px;
          border-radius: 50%;
        }
      }
      .right{
          display:inline-block;
          font-size:26rpx;
          vertical-align:bottom;
          margin-left:52rpx;

      }

    }

  }

}
</style>