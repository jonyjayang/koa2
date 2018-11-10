const {mysql}=require("../qcloud")

module.exports=async(ctx)=>{
    const top=await mysql('book').select("*").orderBy('count',"desc").limit(9)
    ctx.state.data={
        list:top
    }
}