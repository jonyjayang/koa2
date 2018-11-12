<template>
    <div>
         <Card :key='index' v-for='(book,index) in books' :book="book"></Card>
        
    </div>
</template>

<script>
import Card from '@/components/Card'
import {get} from '@/until'
    export default {
         props:{
             bookid:{type:[Array],default:[]}
        },
        data(){
            return{
               books:[],
            }
        },
        methods:{
                async getBooks(){
                const books = await get('/weapp/booklist',{
                    bookid:this.bookid.bookid
                })
                this.books = books.list
                },
        },
        mounted(){
            this.getBooks()
           
        },
         components:{
             Card,
           
        },
    }
</script>

<style scoped>

</style>