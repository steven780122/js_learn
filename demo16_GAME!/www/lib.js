ga.lib.Plane = function(){
    this.x = ga.ctx.canvas.width /2;   // 從畫面的中間開始
    this.y = ga.ctx.canvas.height /2;
    this.size = 24;
    this.speed = 2;   //建立飛機速度
    this.update = function(){     // 後來改為紀錄鍵盤狀態後:
        let speed = this.speed;
        if(ga.keys.space){
            speed *= 2;
        }

        // 不要用else if (行為不一樣喔!  這樣會更順 因為會重疊)
        if(ga.keys.left){
            this.x -= speed;
        }
        if(ga.keys.top){
            this.y -= speed;
        }
        if(ga.keys.right){
            this.x += speed;
        }
        if(ga.keys.bottom){
            this.y += speed;
        }
        return false;  // 沒事不會死掉
    };    // 標準動作  更新邏輯 


    this.draw = function(){
        ga.ctx.save();   // 儲存繪圖設定
        let img;

        if(ga.keys.space){
            img = ga.res.imgs.explosion;     // 當按下space時變成爆炸圖!!!
        }else{
            img = ga.res.imgs.plane;
        }
        ga.ctx.drawImage(img, this.x - this.size /2, this.y - this.size /2, this.size, this.size);


        // 之前smoke的註釋:
        //改為畫影像，因為影像要載入時間，所以事先準備!!!!  不可以onload，所有要等地都要事先準備!!! 像是遊戲!!
        // ctx.drawImage(smoke, this.x-this.size/2, this.y-this.size/2, this.size, this.size);  // 尺寸不要固定喔!  因為smoke會擴散
        // /2是因為我們一班是用中間思考(smoke圖中央)
        
        

        ga.ctx.restore();  // 恢復上一個儲存的設定
        
    };
}