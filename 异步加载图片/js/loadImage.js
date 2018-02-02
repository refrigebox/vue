let getJson = (url) => {
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
let createImage = (path) => {
    return new Promise((resolve, reject) => {
        let oImg = new Image();
        oImg.onload = function() {
            resolve(oImg);
        }
        oImg.onerror = function() {
            reject("can't find image source");
        }
        oImg.src = path;
        wrap.append(oImg);
    });

}

let loadImages = function(imagesArray, wrap) {
    imagesArray.map((item, index) => {
        createImage(item.url, wrap);

    });
}