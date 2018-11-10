<template>
    <div>
        <TopSwiper :top="top"></TopSwiper>
        <Card :key='book.id' v-for='book in books' :book="book"></Card>
        <p class="footer"  v-show="more">没有更多</p>
    </div>
</template>

<script>
import Card from "@/components/Card";
import TopSwiper from "@/components/TopSwiper"
import { get, showSuccess, showModal } from "../../until";
export default {
  data() {
    return {
      books: [],
      page: 0,
      more: false,
      top:[]
    };
  },
  methods: {
    async getList(init) {
      if (init) {
        this.page = 0;
      }
      //下拉
    //   wx.startPullDownRefresh()
      wx.showNavigationBarLoading();
      const books = await get("/weapp/booklist", { page: this.page });
      //判断是否还有更多数据
      if (books.list.length < 10 && this.page > 0) {
        this.more = true
        console.log(this.more)
      }
      //进行初始化
      if (init) {
        this.books = books.list;
        wx.stopPullDownRefresh();
        this.page = 0;
      } else {
        // 下拉刷新，累加图书
        this.books = this.books.concat(books.list);
        // 去掉下拉加载icon
       
      }
       wx.hideNavigationBarLoading();
    },
    async getTop(){
      const tops=await get("/weapp/top")
      this.top=tops.list
    }
  },
  mounted() {
    this.getList(true);
    this.getTop();
  },
  // 下拉刷新
  
  onPullDownRefresh() {
    this.getList(true);
    console.log("aaa");
  },
	onReachBottom() {
		if (this.more) {
			return false
		}
		this.page = this.page + 1
		this.getList()
	},

  components: {
    Card,
    TopSwiper
  }
};
</script>

<style scoped>
</style>