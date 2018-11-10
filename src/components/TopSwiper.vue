<template>
    <div>
        <div class="topSwiper">
            <swiper
            class="swiper"
			:indicator-dots="indicatorDots"
			:indicator-color="indicatorColor"
			:indicator-active-color="indicatorActiveColor"
			:autoplay="autoplay"
			:circular="circular"
			:display-multiple-items="items"
            >
            	<div :key="index" v-for="(top, index) in top">
				<swiper-item>
					<img
						@click="bookDetail(top)"
						:src="top.image"
						mode="aspectFit"
						class="slide-image"
						alt="">
				</swiper-item>
			</div>
            </swiper>
        </div>
    </div>
</template>

<script>
    export default {
        props:["top"],
        data(){
            return{
                indicatorDots:false,
                indicatorColor:"57bceb",
                indicatorActiveColor:"#EA5149",
                autoplay:true,
                circular:true,
                items:3

            }
        },
        methods:{
            bookDetail(item){
                wx.navigateTo({
				url: '/pages/detail/main?id=' + item.id
			})
            }
        }
        
        
    }
</script>

<style scoped>
.swiper {
		padding-top: 15px;
	}
	.slide-image {
		width: 100%;
		height: 250rpx;
	}
</style>