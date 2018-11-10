const {mysql} =require('../qcloud')

module.exports=async(ctx)=>{
    let {page}=ctx.request.query
    let size=10
    const books=await mysql('book')
    .select('book.*','cSessionInfo.user_info')
    .join('cSessionInfo','book.openid','cSessionInfo.open_id').limit(size).offset(Number(page)*size).orderBy('book.id','desc')
    //进行连表查询
    ctx.state.data={
        list:books.map(v=>{
            const info=JSON.parse(v.user_info)
            return Object.assign({},v,{
                user_info:{
                    nickName:info.nickName
                }
            })
        })
    }
}