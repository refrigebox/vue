class Dialog {
    // 构造一个函数
    constructor(title = '说散就散', constent = '') {
        this.title = title || '歌名';
        this.constent = constent || '歌词';
        this.Lyric = Lyric.arr;
        this.init();
    }

    // 实例化方法
    init() {
        this.creatPopup();
    }

    // 创建背景
    creatBgBox() {
        var bgBox = document.createElement('div');
        bgBox.className = 'bg';
        return bgBox;
    }

    // 创建框子
    creatAlertBox() {
        var alertBox = document.createElement("div");
        alertBox.className = 'alertBox';
        alertBox.innerHTML = `
        <div class='show'>
            <h3 class='center'>${this.title}</h3>
            <span class='close'>&times;</span>
            <p class='center'>${this.constent}</p>
        </div>
        `
        return alertBox;
    }

    // 关闭按钮
    creatClose() {
        let close = document.querySelector('.close');
        let show = document.querySelector('.show');
        close.onclick = function() {
            document.body.remove(show);
        }
    }

    //放入数据
    creatList() {
        let len = this.Lyric.length;
        let Lyric = '<ul class="Lyric_list">';
        for (let i = 0; i < len; i++) {
            Lyric += `<li class='center'>${this.Lyric[i]}</li>`;
        }
        return Lyric += '</ul>';
    }

    // 添加页面
    creatPopup() {
        let bg_box = this.creatBgBox();
        let alert_box = this.creatAlertBox();
        let val = this.creatList();

        document.body.append(bg_box);
        document.body.append(alert_box);
        document.querySelector('.show').innerHTML += val;

        this.creatClose();
    }
}

let dialog = new Dialog();