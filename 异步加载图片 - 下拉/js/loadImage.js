//默认配置
const config = {
    page: 1
}


class AsyncLoadImages {
    //...reset参数 来获取形参集合

    //解构赋值来传参
    // constructor({ id, page } = {}) {
    // 合并默认配置与用户配置
    constructor(options) {
        Object.assign(config, options)
        this.wrap = document.getElementById(config.id);
        this.page = config.page;
        this.flag = config.flag;
        this.startY = 0;
        this.endY = 0;
        this.imgs = null;
        this.init();
    }
    init() {
        //请求图片
        this.getImages();
    }
    getImages() {
        //发起ajax请求
        this.getJson("http://localhost:8090/mock").then((result) => {
            let res = JSON.parse(result);
            let img = [];
            this.imgs = res;

            //如果标识为true,代表需要单张加载
            if (this.flag == true) {

                res.map((item, index) => {
                    //配置显示几张图
                    if (index > this.page - 1) return;
                    img.push(item);
                    this.loadImages(img);
                });
            } else {
                //渲染全部图片
                this.loadImages(res);
            }
            //绑定触摸事件
            this.touchstrart();
        });
    }
    //加载图片
    loadImages(img) {
        img.map((item, index) => {
            this.createImage(item.url);
        });
    }
    //创建图片
    createImage(path) {
        return new Promise((resolve, reject) => {
            let oImg = new Image();
            oImg.onload = function() {
                resolve(oImg);
            }
            oImg.onerror = function() {
                reject("can't find image source");
            }
            oImg.src = path;
            this.wrap.append(oImg);
        });

    }
    getJson(url) {
        return new Promise((resolve, reject) => {
            let xml = new XMLHttpRequest();
            xml.open("GET", url);
            xml.onreadystatechange = function() {
                if (xml.readyState !== 4) return;
                if (xml.status == 200) {
                    resolve(xml.responseText)
                } else {
                    reject("error")
                }
            }
            xml.send(null);
        });
    }
    touchstrart() {
        //获取起始点y轴坐标
        document.body.addEventListener("touchstart", (event) => {
            this.startY = event.touches[0].clientY;
            this.touchmove();
        });
    }
    touchmove() {
        //获取结束点Y轴坐标
        document.body.addEventListener("touchmove", (event) => {
            this.endY = event.touches[0].clientY;
        });
        this.touchend();
    }
    touchend() {
        //获取滑动距离
        let abs = Math.abs(this.startY - this.endY);
        //获取屏幕高度
        let screen = document.body.clientHeight;
        //如果滑动距离小于屏幕的一半，不执行
        if (abs < screen / 2) return;
        ++this.page;
        if (this.page > this.imgs.length) return;
        this.createImage(this.imgs[this.page - 1].url);
    }

}