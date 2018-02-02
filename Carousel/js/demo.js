let temp=[];
let imgArr=[];
let loadImg=(url)=>{
    return new Promise(function(resolve,reject){
        let oImg=new Image();
        oImg.onload=()=>{
            resolve(oImg);
        }
        oImg.onerror=()=>{
            reject("error")
        }
        oImg.src=url;
    })
}


let ajax=(url)=>{
    return new Promise((resolve,reject)=>{
        let xhr=new XMLHttpRequest();
        xhr.open("GET",url);
        xhr.onreadystatechange=()=>{
            if(xhr.readyState!==4)return;
            if(xhr.status==200){
                resolve(xhr.responseText);
            }else{
                reject(new Error("error"));
            }
        }
        xhr.send(null);
    })
}

class Carousel{
    constructor(){
        this.box=document.querySelector(".box");
        this.uls=document.getElementById("uls");
        this.ulis=this.uls.getElementsByTagName("li");
        this.ols=document.getElementById("ols");
        this.olis=this.ols.getElementsByTagName("li");
        this.timer=null;
        this.init();
    }
    init(){
        this.rightClick();
        this.leftClick();
        this.auto();
        this.click();
        this.count=0;
        this.mouseover();
    }
    rightClick(){
        let right=document.getElementById("right");
        right.onclick=()=>{
            this.count++;
            if(this.count>this.ulis.length-1){
               this.count=0;
            }
            console.log(this.count);
            this.show(this.count);
       }
    }
    leftClick(){
        let left=document.getElementById("left");
        left.onclick=()=>{
            this.count--;
            if(this.count<0){
                this.count=this.ulis.length-1;
            }
            this.show(this.count);
        }
    }
    auto(){
        this.timer=setInterval(()=>{
            this.count++;
            if(this.count>this.ulis.length-1){
               this.count=0;
            }
            this.show(this.count);
        },2000)
    }
    mouseover(){
        this.box.onmouseover=()=>{
            clearInterval(this.timer);
        }
        this.box.onmouseout=()=>{
           this.auto();
        }
    }
    click(){
        for(let i=0;i<this.olis.length;i++){
            this.olis[i].index=i;
            this.olis[i].onclick=()=>{
                this.show(this.count);
            }
        }
    }
    show(index){
        for(let i=0;i<this.ulis.length;i++){
            this.ulis[i].style.display='none';
            this.olis[i].style.background='';
        }
        this.ulis[index].style.display='block';
        this.olis[index].style.background='#ccc';
    }
}


