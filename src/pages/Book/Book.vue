<template>
    <div>
  <Card class="" :key='book.id' v-for='book in books' :book="book"></Card>
    </div>
</template>

<script>
import Card from '@/components/Card'
import {get,showSuccess, showModal} from '../../until'
    export default {
        data(){
            return{
                books:[],
            }
        },
        methods:{
           async getList(){
                const books=await get('/weapp/booklist')
                this.books=books.list


            }
        },
        mounted(){
            this.getList();
        },
        components:{
            Card
        }
    }
</script>

<style scoped>

</style>