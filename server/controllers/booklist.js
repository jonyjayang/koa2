const {mysql} =require('../qcloud')

module.exports=async(ctx)=>{
    let {page,bookid}=ctx.request.query
    let size=10
    const mysqlSelect= mysql('book')
    .select('book.*','cSessionInfo.user_info')
    .join('cSessionInfo','book.openid','cSessionInfo.open_id')
    .limit(size).offset(Number(page)*size)
    .orderBy('book.id','desc')
    //进行连表查询

    let books
    if (bookid) {
        // 根据opid过滤
        books = await mysqlSelect.where('id', bookid)
    } else {
        // 全部图书 分页
        books = await mysqlSelect.limit(size).offset(Number(page) * size)
    }
    ctx.state.data={
        list:books.map(v=>{
            const info=JSON.parse(v.user_info)
            // const bookid = JSON.parse(v.bookid)
            return Object.assign({},v,{
                user_info:{
                    nickName:info.nickName
                },
            
            })
        })
    }
}