<template>
    <div>
        <div class="rate">
    <span>☆☆☆☆☆</span>
    <div class="hollow" :style='style'>
      ★★★★★
    </div>
    </div>
    </div>
</template>

<script>
    export default {
        props:{
            value:{type:[Number,String],default:'0'}
        },
        computed: {
            style() {
                return `width:${this.value/2.5}em` 
            }
        },
    }
</script>

<style scoped lang="scss">
.rate{
    position: relative;
    .hollow{
        position: absolute;
        display: inline-block;
        top: 0;
        left: 0;
        width: 0em;
        overflow: hidden;

    }
}
</style>