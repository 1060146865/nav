const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem('x');
const xObject = JSON.parse(x);
const hashMap = xObject || [{
        logo: 'A',
        url: 'https://www.acfun.cn'
    },
    {
        logo: 'B',
        url: 'https://www.bilibili.com'
    }
]




const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        console.log(simplifyUrl(node.url))
        const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div> 
            </div>
            <div class="close">
                    <svg class="icon">
                    <use xlink:href="#icon-guanbi"></use>
                    </svg>
            </div>
      
    </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() // 阻止冒泡
            hashMap.splice(index, 1)
            render()
            mous()
        })
    })

}
render()
mous()

$('.addButton').on('click', () => {
    let url = window.prompt('请问你要添加的网址是啥?')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        url: url
    })
    render()
    mous()


});

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}


$(fu).focus(function () {
    // $(document).keydown(function (e) {
    //     e.preventDefault();
    // });
    // $(document).on('keypress', (e) => {
    //     const {
    //         key
    //     } = e
    //     for (let i = 0; i < hashMap.length; i++) {
    //         if (hashMap[i].logo.toLowerCase() === key) {
    //             e.preventDefault();
    //         }
    //     }
    // })
    $(document).unbind('keypress');

}).blur(function () {
    kd();
});

function kd() {
    $(document).keydown(function (event) {
        if (event.keyCode == "107") {
            let url = window.prompt('请问你要添加的网址是啥?')
            if (url.indexOf('http') !== 0) {
                url = 'https://' + url
            }
            hashMap.push({
                logo: simplifyUrl(url)[0].toUpperCase(),
                url: url
            })
            render()
            mous()
        }
    });
    $(document).on('keypress', (e) => {
        const {
            key
        } = e
        for (let i = 0; i < hashMap.length; i++) {
            if (hashMap[i].logo.toLowerCase() === key) {
                window.open(hashMap[i].url)
            }
        }
    })
}


function mous() {
    $('.siteList').find('li').each(function () {
        $(this).mouseenter(function () {
            let index = $(this).index()
            $('.siteList .close').eq(index).css("display", "block");
        }).mouseleave(function () {
            let index = $(this).index()
            $('.siteList .close').eq(index).css("display", "none");
        }) // text1 是内容 ，$(this).index() 是下标

        $(this).on('touchstart', function (e) {
            let index = $(this).index()
            timeOutEvent = setTimeout(function () {
                $('.siteList .close').eq(index).css("display", "block");
                console.log("aaaaa");
                //此处为长按事件-----在此显示遮罩层及删除按钮
            }, 500);

        }).on("touchmove", function () {
            let index = $(this).index()
            $('.siteList .close').eq(index).css("display", "none");
            clearTimeout(timeOutEvent);
            timeOutEvent = 0;
            e.preventDefault();
        })
    });

}
$(fu).on('click', 'keypress', (e) => {
    console.log("aaaa");
    e.stopPropagation()
    document.onkeydown = showKey;
})

window.onload = function () {
    var oInput = document.getElementById("fu");
    oInput.focus();
}