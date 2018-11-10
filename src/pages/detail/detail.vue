<template>
    <div>
        图书id{{bookid}}
    </div>
</template>

<script>
import {get} from "@/until"
    export default {
        mounted(){
            this.bookid=this.$root.$mp.query.id,
            this.getDetail()
        },
        data(){
            return {
                bookid:""
            }
        },
        methods:{
            async getDetail(){
                const info=await get("/weapp/bookdetail",{id:this.bookid})
            }
        }
    }
</script>

<style scoped>

</style>