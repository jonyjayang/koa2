const https = require('https')
const { mysql } = require('../qcloud')
// 新增图书
// 1. 获取豆瓣信息
// https://developers.douban.com/wiki/?title=book_v2#get_isbn_book
// https://api.douban.com/v2/book/isbn/9787536692930
// 2. 入库
module.exports=async(ctx)=>{
    const { isbn, openid } = ctx.request.body
    if(isbn&&openid){
        const findres=await mysql('book').select().where('isbn',isbn);
        if(findres.length){
            ctx.state={
                code:-1,
                data:{
                    msg:'图书已存在'
                }
            }
            return 
        }
        let url = "https://api.douban.com/v2/book/isbn/" + isbn;
        let bookinfo = await getJSON(url);
        let rate = bookinfo.rating.average
        console.log(bookinfo);
        let { title, image, alt, publisher, summary, price } = bookinfo;
        let tags = bookinfo.tags.map(v => {
            return `${v.title} ${v.count}`
        }).join(',');
        let author = bookinfo.author.join(",");
        try {
            await mysql('book').insert({ isbn, openid, rate, title, image, alt, publisher, summary, price, tags, author })
            ctx.state.data = {
                // isbn, openid, title, image, alt, publisher, summary, price, rate, tags, author, count,
                title,
                msg: "success"
            }
        } catch (e) {
            ctx.state = {
                code: -1,
                data: {
                    msg: '新增失败' + e.sqlMessage
                }
            }

        }
       
    }
}
function getJSON(url){
    return new Promise((reslove,reject)=>{
        https.get(url,res=>{
            let urlData='';
            res.on('data',data=>{
                urlData+=data
            });
            res.on('end',data=>{
                const bookinfo=JSON.parse(urlData);
                if(bookinfo.title){
                    reslove(bookinfo)
                }
                reject(bookinfo);
            })
        })
    })

}