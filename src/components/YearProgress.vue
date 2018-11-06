<template>
    <div>
          <progress :percent="percent" active activeColor="#57bceb"/>
        <p class="day">{{year}}已经过去了{{days}}天，{{percent}}%</p>
    </div>
</template>

<script>
    export default {
        methods:{
            isLoopYear(){
                 const year = new Date().getFullYear()
                if(year%400===0){
                    return true;
                }else if(year%4===0&&year%100!=1){
                    return true;

                }
                else{
                    return false;
                }

            },
            getDayOfYear(){
                return this.isLoopYear()?366:365;
            }
        },
        computed:{
            year(){
              return new Date().getFullYear();  
            },
            days(){
                let startDay=new Date();
                startDay.setMonth(0);
                startDay.setDate(1);
                let offsetDate=new Date().getTime()-startDay.getTime();
                return parseInt(offsetDate/1000/60/60/24)+1;
            },
            percent(){
                return parseInt(this.days * 100 / this.getDayOfYear());
            }
        },
        data(){
            return {
                  getYear: new Date().getFullYear()
            }
        }
        
    }
</script>

<style scoped>

</style>