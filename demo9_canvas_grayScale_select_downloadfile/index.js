let express = require("express");
let app = express();


app.use(express.static("www"))    // 設定資料夾www為靜態檔案的資料夾

// 啟動伺服器在 localhost:3000
// 如果要上線不是要測試可以打80，使用者就不用再打port
app.listen(3000, function(){   
    // 伺服器啟動成功的回呼函式
    console.log("伺服器啟動成功");
});   


// 處理客戶的要求，取得Request物件和Response物件
app.get("/test", function(req, res){
    // res.send(hello("Steven"));    //印出 Hello Steven

    // // 取得標準http 參數
    // res.send(hello(req.query.name))

    // //取得主網址後path
    // res.send(req.path)

    // // 取得Request Header!!
    // let lang = req.get("Accept-Language");
    // res.send(lang)


    // res.download("./package.json")


    // let data = ["Hello", "World"]
    // let data2 = {x:100, y:50}
    // res.json(data2)


    // // 設定Response Header (可以觀察設前設後開發者工具變化)
    // res.set("Content-Type", "text/plain")  // 這樣的話就不會把tag當作html的格式來處理，會變純文字

    // // 設定HTTP Status Code
    // res.status(404).send("404 Error!")

});
