<template>
    <div>
        <Card :key='book.id' v-for='book in books' :book="book"></Card>
        <p class="footer" v-if="!more">没有更多</p>
    </div>
</template>

<script>
import Card from "@/components/Card";
import { get, showSuccess, showModal } from "../../until";
export default {
  data() {
    return {
      books: [],
      page: 0,
      more: false
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
      if (books.length < 10 && this.page > 0) {
        this.more = false;
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
    }
  },
  mounted() {
    this.getList(true);
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
    Card
  }
};
</script>

<style scoped>
</style>