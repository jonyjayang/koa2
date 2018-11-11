const {mysql} =require("../qcloud")


module.exports=async(ctx)=>{
    const {id}=ctx.request.query
    //在图书详情页获取到图书信息
    const detail=await mysql('book').select("book.*","cSessionInfo.user_info")
                              .join('cSessionInfo',"book.openid","cSessionInfo.open_id")
                              .where("id",id).first()
     detail.user_info=JSON.parse(detail.user_info);
     detail.tags=detail.tags.split(",");
     detail.summary=detail.summary.split("\n");
     ctx.state.data=detail



    //浏览量加一
    await mysql('book').where('id',id).increment('count',1) 


}