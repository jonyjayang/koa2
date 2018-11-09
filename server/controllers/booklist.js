const {mysql} =require('../qcloud')

module.exports=async(ctx)=>{
    const books=await mysql('book').select('*')
    ctx.state.data={
        list:books
    }
}