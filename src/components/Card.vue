<template>
<div>
    <div class="book-card">
        <div class="thumb">
            <img :src="book.image" class="img" alt="">
        </div>
        <div class="detail">
            <div class="row">
                <div class="right">
                    {{book.rate}}
                </div>
                <div class="left">
                    {{book.title}}
                </div>
            </div>
            <div class="row">
                <div class="right">
                       浏览量:{{book.count}}
                   
                </div>
                <div class="left">
                  {{book.author}}著
                </div>
            </div>
            <div class="row">
                <div class="right">
                     <!-- {{book.user_info.nickName}} -->
                     添加者
                   
                </div>
                <div class="left">
                {{book.publisher}}
                </div>
            </div>
        </div>

    </div>
    </div>
</template>

<script>
    export default {
        props:['book'],

    }
</script>

<style lang="scss" scoped>
.book-card{
    padding: 5px;
    overflow: hidden;
    margin-top: 5px;
    margin-bottom: 5px;
    // padding-left:15px;
    font-size: 14px;
    .thumb{
        width: 90px;
        height: 90px;
        float: left;
        margin: 0 auto;
        overflow: hidden;
        .img{
            max-width: 100%;
            max-height: 100%;
        }

    }
    .detail{
        margin-left: 100px;
        .row{
            line-height: 20px;
            margin-bottom: 3px
        }
        .right{
            float: right;
        }
        .left{
            margin-right: 80px
        }
    }
}

</style>