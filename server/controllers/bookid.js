const { mysql } = require("../qcloud")



module.exports = async (ctx) => {
    const { openid } = ctx.request.query
    const bookid = await mysql("comments").select("bookid").where("openid", openid).groupBy("bookid");
    ctx.state.data=bookid;
}