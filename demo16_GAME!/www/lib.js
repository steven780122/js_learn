ga.lib.BulletSystem = function(){
    this.bullets = [];

    this.update = function(){

        // 放bullet:
        // 每3回合才放子彈，讓子彈變少
        if(ga.data.circle % 30 == 0){
            this.bullets.push(new ga.lib.Bullet());
        }
        

        for(let i = 0; i < this.bullets.length; i++){
            if(this.bullets[i].update()){    // 如果死掉清除! (超出版面)
                this.bullets.splice(i, 1);
                i--;
            }
        }
    };


    this.draw = function(){
        for(let i = 0; i < this.bullets.length; i++){
            // if(this.bullets[i].update()){
            //     console.log("TEST");
                this.bullets[i].draw();
            // }
        }
    };
}



ga.lib.Bullet = function(){
    // 方向可以用random 去定義4個方向!   My:
    this.random = Math.random();

    if(this.random > 0.75){   // 左右     
        this.x = 0;
        this.y = Math.random() * ga.ctx.canvas.height;
        this.vx = Math.random() * 2 + 1;
        this.vy = 0;

    }else if(this.random > 0.5){   // 右左
        this.x = ga.ctx.canvas.width;
        this.y = Math.random() * ga.ctx.canvas.height;
        this.vx = Math.random() * 2 -3;
        this.vy = 0;
    }else if(this.random > 0.25){   // 上下
        this.x = Math.random() * ga.ctx.canvas.width;
        this.y = 0;
        this.vx = 0;
        this.vy = Math.random() * 2 + 1;

    }else{
        this.x = Math.random() * ga.ctx.canvas.width;  // 下上
        this.y = ga.ctx.canvas.height;
        this.vx = 0;
        this.vy = Math.random() * 2 - 3;

    }

    this.size = 1;

    // this.x = 0;
    // this.y = Math.random() * ga.ctx.canvas.height;
    // this.vx = Math.random() * 2 + 1;
    // this.vy = 0;
    // this.size = 1;




    this.update = function(){
        this.x += this.vx;
        this.y += this.vy;

        return this.x > ga.ctx.canvas.width || this.x < 0 || this.y > ga.ctx.canvas.height || this.y < 0;

    };





    this.draw = function(){

        ga.ctx.save();   //儲存當下設定
        ga.ctx.fillStyle='white';
        
        ga.ctx.beginPath();// 畫路徑
        ga.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ga.ctx.fill();
        ga.ctx.restore();   //恢復設定
    }

}



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