<template>
    <div class="container">
      <div class="userinfo">
          <!-- <open-data type="userAvatarUrl" class="headerimg"></open-data> -->
          <img :src="userinfo.avatarUrl" alt="">
          <p>{{userinfo.nickName}}</p>
      </div>
      <YearProgress v-bind:getYear="getYear"></YearProgress>
      <button class="btn"  v-if="userinfo.openId">添加图书</button>
      <button v-else open-type="getUserInfo" @click="doLogin" @getuserinfo="bindGetUserInfo">授权用户信息</button>
    </div>
</template>

<script>
import {get, showSuccess} from '../../until'
import qcloud from 'wafer2-client-sdk'
import config from '../../config'
import YearProgress from '@/components/YearProgress'
export default {
  methods: {
    doLogin() {
   let user = wx.getStorageSync('userinfo')
      const self = this
      if (!user) {
        qcloud.setLoginUrl(config.loginUrl)
        qcloud.login({
          success: function (userinfo) {
            qcloud.request({
              url: config.userUrl,
              login: true,
              success (userRes) {
                showSuccess('登录成功')
                wx.setStorageSync('userinfo', userRes.data.data)
                self.userinfo = userRes.data.data
              }
            })
          }

        })
      }
    },

  },
  onShow(){
   let userinfo = wx.getStorageSync('userinfo');

    console.log([userinfo]);
    if (userinfo) {
      this.userinfo = userinfo
    }
  },
  components:{
    YearProgress
  },
  data(){
    return {
      userinfo:{
        avatarUrl: '../../../static/img/unlogin.png',
        nickName: '点击登录'
      },
       getYear: new Date().getFullYear()
    }
  }
};
</script>

<style lang="scss" >
.container{
  padding: 0 30rpx;
}
.userinfo{
  margin-top: 100rpx;
  text-align: center;
  img{
    width: 150rpx;
    height: 150rpx;
    margin: 20rpx;
    border-radius: 50%;
  }

}
  
</style>