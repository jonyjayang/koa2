<template>
    <div class="container">
        <button  open-type="getUserInfo" @click="doLogin">授权用户信息</button>
    </div>
</template>

<script>
export default {
  method: {
    doLogin() {
         let session = qcloud.Session.get()
      let user = wx.getStorageSync("userinfo");
      if (!user) {
        qcloud.setLoginUrl(config.loginUrl);
        qcloud.login({
          success: function(userinfo) {
            console.log("登陆成功", userinfo);
            showSuccess("登陆成功");
            wx.setStorageSync("userinfo", userinfo);
          },
          fail: function(err) {
            console.log("denglushibai", err);
          }
        });
      } else {
            	this.userInfo = wx.getStorageSync('userInfo')
            }
    }
  }
};
</script>

<style scoped>
</style>