;

let arr = ['A', 'B', 'C', 'D'];
let data = [{ 'A': ['A页面'] }, { 'B': ['B页面'] }, { 'C': ['C页面'] }, { 'D': ['D页面'] }]
class Tab {
    constructor() {
        this.init();
    }
    init() {
        this.createBox();
    }
    createBox() {
        let box = document.createElement('div');
        box.className = 'box';
        box.id = 'box';
        document.body.appendChild(box);
        this.createTitle();
    }
    createTitle() {
        let box = document.getElementById('box');
        let title = '<ul id="top">';
        for (let i = 0, len = arr.length; i < len; i++) {
            if (i == 0) {
                title += `<li class='active'>${arr[i]}</li>`;
            } else {
                title += `<li>${arr[i]}</li>`;
            }
        }
        title += '</ul><div id="show" class="center"></div>';
        box.innerHTML = title;
        this.clickHighlighting();
    }
    clickHighlighting() {
        let listTitle = document.getElementById('top').getElementsByTagName('li');
        let show = document.getElementById('show');
        show.innerHTML = data[0]['A'];
        for (let i = 0, len = listTitle.length; i < len; i++) {
            listTitle[i].onclick = function() {
                for (let j = 0, len = listTitle.length; j < len; j++) {
                    listTitle[j].className = '';
                }
                listTitle[i].className = 'active';
                show.innerHTML = data[i][listTitle[i].innerText];

            }
        }
    }
}

new Tab();