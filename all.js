var checked = document.querySelector('.checked')
var bminum = JSON.parse(localStorage.getItem('bminum')) || [] // JSON.parse(string) ：接受一個JSON 字符串並將其轉換成一個JavaScript 對象。
var lvch = document.querySelector('.lvch') // window.localStorage ： 放在localStorage的資料會永久保存，直到被使用者清除。
var list = document.querySelector('.container2')

//監聽
lvch.addEventListener('click', bmi)
list.addEventListener('click', listdel)
updatelist(bminum)

//存入資料
function bmi(e) {
    var cm = document.querySelector('.cm').value
    var kg = document.querySelector('.kg').value
    var bmi = (kg / ((cm * 0.01) * (cm * 0.01))).toFixed(2)
    var Today = new Date();
    var day = Today.getFullYear() + ' - ' + (Today.getMonth() + 1) + ' - ' + Today.getDate()
    var bmiarr = {
        height: cm,
        weight: kg,
        bmi: bmi,
        day: day
    }
    bminum.push(bmiarr) //push 方法會將一或多個值加入至一個陣列中。
    updatelist(bminum)
    localStorage.setItem('bminum', JSON.stringify(bminum)) //將資料轉為 JSON 格式的字串。JSON.stringify(obj) ：接受一個JavaScript 對象並將其轉換為一個JSON 字符串。
    //BMI分級顏色圈
    if (bmi < 18.5) {
        lvch.setAttribute('class', 'lvck lvck-b') //在頁面中創建一個script標籤物件，使用setAttribute設定屬性
        lvch.innerHTML = '<span class="checked-v">' + bmi + '</span><br><span class="checked-b">BMI</span><div class="loop loopbg-b"> <img src="img/icons_loop.png" alt=""></div>'
    } else if (bmi >= 18.5 && 23.9) {
        lvch.setAttribute('class', 'lvck lvck-g')
        lvch.innerHTML = '<span class="checked-v">' + bmi + '</span><br><span class="checked-b">BMI</span><div class="loop loopbg-g"> <img src="img/icons_loop.png" alt=""></div>'
    } else if (bmi > 24 && bmi <= 27.9) {
        lvch.setAttribute('class', 'lvck lvck-o')
        lvch.innerHTML = '<span class="checked-v">' + bmi + '</span><br><span class="checked-b">BMI</span><div class="loop loopbg-o"> <img src="img/icons_loop.png" alt=""></div>'
    } else if (bmi >= 28 && bmi < 30) {
        lvch.setAttribute('class', 'lvck lvck-bo')
        lvch.innerHTML = '<span class="checked-v">' + bmi + '</span><br><span class="checked-b">BMI</span><div class="loop loopbg-bo"> <img src="img/icons_loop.png" alt=""></div>'
    } else if (bmi >= 30.1 && bmi < 35) {
        lvch.setAttribute('class', 'lvck lvck-bbo')
        lvch.innerHTML = '<span class="checked-v">' + bmi + '</span><br><span class="checked-b">BMI</span><div class="loop loopbg-bbo"> <img src="img/icons_loop.png" alt=""></div>'
    } else if (bmi >= 35) {
        lvch.setAttribute('class', 'lvck lvck-r')
        lvch.innerHTML = '<span class="checked-v">' + bmi + '</span><br><span class="checked-b">BMI</span><div class="loop loopbg-r"> <img src="img/icons_loop.png" alt=""></div>'
    }
}


//更新列表
function updatelist() {
    var str = '';
    for (var i = 0; i < bminum.length; i++) {
        var bmilv = ''
        var color = ''
        if (bminum[i].bmi < 18.5) {
            bmilv = '過輕'
            color = 'color-b'
        } else if (bminum[i].bmi >= 18.5 && bminum[i].bmi <= 23.9) {
            bmilv = '理想'
            color = 'color-g'
        } else if (bminum[i].bmi > 24 && bminum[i].bmi <= 27.9) {
            bmilv = '過重'
            color = 'color-o'
        } else if (bminum[i].bmi >= 28 && bminum[i].bmi < 30) {
            bmilv = '輕微肥胖'
            color = 'color-bo'
        } else if (bminum[i].bmi >= 30.1 && bminum[i].bmi < 35) {
            bmilv = '中度肥胖'
            color = 'color-bbo'
        } else if (bminum[i].bmi >= 35) {
            bmilv = '重度肥胖'
            color = 'color-r'
        }
        str += '<div class="list"><div class="color ' + color + '"></div><h3 class="lv">' + bmilv + '</h3><span class="bmi">BMI</span><h3 class = "bminum">' + bminum[i].bmi + '</h3> <span class = "weight"> weight </span><h3 class = "weightnum"> ' + bminum[i].weight + 'kg</h3><span class = "height"> height </span> <h3 class = "heightnum"> ' + bminum[i].height + 'cm </h3><time datetime =""  class = "time">' + bminum[i].day + ' </time><a href="#"  data-num="' + i + '"> 刪除 </a></div>'
    }
    list.innerHTML = str;
}


//刪除資料
function listdel(e) {
    var del = e.target.nodeName
    if (del !== "A") {
        return
    }
    var num = e.target.dataset.num
    bminum.splice(num, 1)
    localStorage.setItem('bminum', JSON.stringify(bminum))
    updatelist(bminum)
}
