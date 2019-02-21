/*定义新数组*/
var enemyArr = [];

/*定义放子弹数组*/
var bulletArr = [];

/*节流阀*/
var upBtnFlag = false;
var downBtnFlag = false;
var leftBtnFlag = false;
var rightBtnFlag = false;

/*申明玩家(全局变量)*/
var gamePerson;


var timeId1;
var timeId2;
var timeId3;
var timeId4;
var timeId5;


/*总分*/
var totalMark = 0;


/*=====================开始按钮=========================*/
//获取按钮
var startKeyCodeObj = document.getElementById("startKeyCode");
//获取main及内容
var mainObj = document.getElementById("main");
var mainInnerObj = mainObj.getElementsByTagName("div");

var audioObj = document.getElementsByTagName("audio")[0];

/*获取返回按钮*/
var fanHuiBtn = document.getElementsByClassName("fanHuiBtn")[0];
/*获取分数板*/
var rMark = document.getElementsByClassName("rMark")[0];
var panObj = rMark.getElementsByTagName("span")[0];

panObj.innerText = totalMark + "分";

//绑定开始按钮，并注册事件
startKeyCodeObj.onclick = startGame;

function startGame() {

    for (var i = 0; i < mainInnerObj.length; i++) {
        mainInnerObj[i].style.display = "none";
    }
    mainObj.style.background = "url(" + "images/bg.jpg" + ") no-repeat -100px -240px";
    fanHuiBtn.style.display = "block";
    rMark.style.display = "block";
    audioObj.src = "music/bingo.mp3";

    downTime();//调用倒计时函数

    /*实例化玩家对象*/
    gamePerson = new GamePerson("small", "images/dragon/small/move.gif", 370, 250, 1000, 10);

    /*玩家人物移动*/
    timeId1 = setInterval(startMoveP, 50);

    /*子弹飞*/
    timeId2 = setInterval(bulletFly, 30);


    /*创建敌方怪物*/
    timeIdOne = setInterval(enemyMonster, 2000);

    timeIdTwo = setInterval(enemyPlane, 5000);

    timeIdThree = setInterval(enemyGhost, 10000);

    timeIdFour = setInterval(enemyMonster4, 50000);


    /*移动敌方怪物*/
    timeId4 = setInterval(moveMonster, 50);


    timeId5 = setInterval(collision, 50);


}

/*返回按钮事件*/
fanHuiBtn.onclick = function () {
    window.location.reload();
};

/*=====================游戏玩家========================*/
/**
 * @param {string} imgsrc 图片路径
 * @param {number} x      起始坐标x
 * @param {number} y      起始坐标y
 * @param {number} blood  起始血量
 * @param {number} speed  起始速度
 * @constructor 创建游戏玩家
 */
function GamePerson(name, imgsrc, x, y, blood, speed) {
    this.personObj = document.createElement("img");
    this.imgsrc = imgsrc;
    this.name = name;
    this.x = x;
    this.y = y;
    this.blood = blood;
    this.speed = speed;
    this.shoot = function () {/*实例化子弹*/
        if (gamePerson.name == "small") {
            var personObjWidth = parseInt(gamePerson.personObj.offsetWidth);
            var bullet = new Bullet("images/dragon/small/att.gif", parseInt(this.personObj.style.left) + personObjWidth, parseInt(this.personObj.style.top) + 50, 10, 10);
            bulletArr.push(bullet);
        }
        if (gamePerson.name == "middle") {
            var personObjWidth = parseInt(gamePerson.personObj.offsetWidth);
            var bullet = new Bullet("images/dragon/small/att.gif", parseInt(this.personObj.style.left) + personObjWidth, parseInt(this.personObj.style.top) + 40, 10, 10);
            bulletArr.push(bullet);
        }
        if (gamePerson.name == "large") {
            var personObjWidth = parseInt(gamePerson.personObj.offsetWidth);
            var bullet = new Bullet("images/dragon/small/att.gif", parseInt(this.personObj.style.left) + personObjWidth, parseInt(this.personObj.style.top) + 55, 10, 10);
            bulletArr.push(bullet);
        }
        if (gamePerson.name == "final") {
            var personObjWidth = parseInt(gamePerson.personObj.offsetWidth);
            var bullet = new Bullet("images/dragon/small/att.gif", parseInt(this.personObj.style.left) + personObjWidth, parseInt(this.personObj.style.top) + 100, 10, 10);
            bulletArr.push(bullet);
        }
        // var personObjWidth = parseInt(gamePerson.personObj.offsetWidth);
        // var bullet = new Bullet("images/dragon/small/att.gif", parseInt(this.personObj.style.left) + personObjWidth, parseInt(this.personObj.style.top) + 15, 10, 10);
        // bulletArr.push(bullet);
    };

    this.upMove = function () {/*上*/
        if (parseInt(this.personObj.style.top) <= 0) {
            this.personObj.style.top = "0";
        } else {
            this.personObj.style.top = parseInt(this.personObj.style.top) - this.speed + "px";
        }
    };
    this.downMove = function () {/*下*/
        // console.log(this.personObj.style.top)
        if (parseInt(this.personObj.style.top) >= 610) {
            this.personObj.style.top = "610px";
        } else {
            this.personObj.style.top = parseInt(this.personObj.style.top) + this.speed + "px";
        }
    };
    this.leftMove = function () {/*左*/
        if (parseInt(this.personObj.style.left) <= 160) {
            this.personObj.style.left = "160px";
        } else {
            this.personObj.style.left = parseInt(this.personObj.style.left) - this.speed + "px";
        }
    };
    this.rightMove = function () {/*右*/
        if (parseInt(this.personObj.style.left) >= 1300) {
            this.personObj.style.left = "1300px";
        } else {
            this.personObj.style.left = parseInt(this.personObj.style.left) + this.speed + "px";
        }
    };

    /*初始化函数，实例化对象后使初始化的对象显示在页面中相应的位置*/
    this.init = function () {
        this.personObj.src = this.imgsrc;
        this.personObj.style.position = "absolute";
        this.personObj.style.left = this.x + "px";
        this.personObj.style.top = this.y + "px";
        mainObj.appendChild(this.personObj);
    };
    this.init();
}

/*玩家移动判断部分*/
document.onkeydown = function () {/*按键按下*/
    var e = window.event || arguments[0];
    if (e.keyCode == 38) {
        // console.log("上")
        upBtnFlag = true;
    } else if (e.keyCode == 40) {
        // console.log("下")
        downBtnFlag = true;
    } else if (e.keyCode == 37) {
        // console.log("左")
        leftBtnFlag = true;
    } else if (e.keyCode == 39) {
        // console.log("右")
        rightBtnFlag = true;
    } else if (e.keyCode == 32) {
        audioObj.src = "music/dragonShoot.mp3";
        if (gamePerson.name == "small") {
            gamePerson.personObj.src = "images/dragon/small/magicmissile.gif";
        } else if (gamePerson.name == "middle") {
            gamePerson.personObj.src = "images/dragon/middle/magicmissile.gif";
        } else if (gamePerson.name == "large") {
            gamePerson.personObj.src = "images/dragon/large/magicmissile.gif";
        } else if (gamePerson.name == "final") {
            gamePerson.personObj.src = "images/dragon/final/magicmissile.gif";
        }

    }
};

document.onkeyup = function () {/*按键抬起*/
    var e = window.event || arguments[0];
    if (e.keyCode == 38) {
        upBtnFlag = false;
    } else if (e.keyCode == 40) {
        downBtnFlag = false;
    } else if (e.keyCode == 37) {
        leftBtnFlag = false;
    } else if (e.keyCode == 39) {
        rightBtnFlag = false;
    } else if (e.keyCode == 32) {
        setTimeout(function () {
            gamePerson.shoot();
        }, 200);

        if (gamePerson.name == "small") {
            setTimeout(function () {
                /*图片换回来*/
                gamePerson.personObj.src = "images/dragon/small/move.gif";
            }, 600)
        } else if (gamePerson.name == "middle") {
            setTimeout(function () {
                /*图片换回来*/
                gamePerson.personObj.src = "images/dragon/middle/move.gif";
            }, 1000)
        } else if (gamePerson.name == "large") {
            setTimeout(function () {
                /*图片换回来*/
                gamePerson.personObj.src = "images/dragon/large/move.gif";
            }, 1000)
        } else if (gamePerson.name == "final") {
            setTimeout(function () {
                /*图片换回来*/
                gamePerson.personObj.src = "images/dragon/final/move.gif";
            }, 1000)
        }

    }
};

var gamePersonLeft;
var gamePersonTop;

/*玩家移动函数部分*/
function startMoveP() {
    if (upBtnFlag == true) {
        gamePerson.upMove();
    } else if (downBtnFlag == true) {
        gamePerson.downMove();
    } else if (leftBtnFlag == true) {
        gamePerson.leftMove();
    } else if (rightBtnFlag == true) {
        gamePerson.rightMove();
    }

    gamePersonLeft = parseInt(gamePerson.personObj.style.left);
    gamePersonTop = parseInt(gamePerson.personObj.style.top);
    var gamePersonWidth = parseInt(gamePerson.personObj.offsetWidth);
    var gamePersonHeight = parseInt(gamePerson.personObj.offsetHeight);

    for (var i = 0; i < enemyArr.length; i++) {//循环怪物的数组
        var enemyMonsterLeft = parseInt(enemyArr[i].monsterNode.style.left);
        var enemyMonsterTop = parseInt(enemyArr[i].monsterNode.style.top);
        //获取怪物的宽度
        var enemyMonsterWidth = parseInt(enemyArr[i].monsterNode.offsetWidth);
        //获取怪物的高度
        var enemyMonsterHeight = parseInt(enemyArr[i].monsterNode.offsetHeight);

        if (gamePersonLeft + gamePersonWidth >= enemyMonsterLeft && gamePersonLeft <= enemyMonsterLeft + enemyMonsterWidth && gamePersonTop + gamePersonHeight >= enemyMonsterTop && gamePersonTop <= enemyMonsterTop + enemyMonsterHeight) {
            gamePerson.blood = gamePerson.blood - enemyArr[i].attack;
            if (gamePerson.blood <= 0) {
                audioObj.src = "music/dragondie.mp3";
                gamePerson.personObj.src = "images/dragon/dead/dead.gif";
                overGame();
            }
        }

    }

}

function overGame() {
    /*创建div标签*/
    var divObj = document.createElement("div");
    divObj.style.width = "217px";
    divObj.style.height = "196px";
    divObj.style.position = "absolute";
    divObj.style.left = gamePersonLeft + 50 + "px";
    divObj.style.top = gamePersonTop + 50 + "px";
    mainObj.appendChild(divObj);

    /*创建大img标签节点*/
    var imgObj = document.createElement("img");
    imgObj.src = "images/ui/tipBg.png";
    divObj.appendChild(imgObj);
    /*创建小img标签节点*/
    var smallImgObj = document.createElement("img");
    smallImgObj.src = "images/ui/tipYC.gif";
    divObj.appendChild(smallImgObj);
    smallImgObj.style.position = "absolute";
    smallImgObj.style.right = "20px";
    smallImgObj.style.bottom = "10px";
    smallImgObj.style.cursor = "pointer";

    /*点击确定刷新界面*/
    smallImgObj.onclick = function () {
        window.location.reload();
    };

    /*创建大p标签节点*/
    var pObj = document.createElement("p");
    pObj.innerText = "游戏结束！您的分数为:";
    divObj.appendChild(pObj);
    pObj.className = "pText";

    /*创建小p标签节点*/
    var smallObj = document.createElement("p");
    smallObj.innerText = "若发现BUG,请联系:110";
    pObj.appendChild(smallObj);
    smallObj.className = "smallPText";

    /*创建span*/
    var spanObj = document.createElement("span");
    spanObj.innerText = "分";
    smallObj.before(spanObj);
    /*创建放分数的span*/
    var span2Obj = document.createElement("span");
    span2Obj.innerText = totalMark;
    span2Obj.style.color = "red";
    span2Obj.style.fontSize = "30px";
    spanObj.before(span2Obj);

    /*清理所有操作*/
    clearInterval(timeId1);
    clearInterval(timeId2);
    clearInterval(timeId4);
    clearInterval(timeId5);
    clearInterval(timeIdOne);
    clearInterval(timeIdTwo);
    clearInterval(timeIdThree);
    clearInterval(timeIdFour);

    /*停止时间*/
    clearInterval(timeF2);
    clearInterval(timeF1);
    clearInterval(timeF3);
    clearInterval(timeF4);
}


/*=====================玩家子弹部分================*/
/**
 *
 * @param {string} imgsrc 图片路径
 * @param {number} x      子弹坐标x
 * @param {number} y      子弹坐标y
 * @param {number} attack 子弹攻击力
 * @param {number} speed  子弹速度
 * @constructor  玩家子弹
 */
function Bullet(imgsrc, x, y, attack, speed) {
    this.bulletNode = document.createElement("img");
    this.imgsrc = imgsrc;
    this.x = x;
    this.y = y;
    this.attack = attack;
    this.speed = speed;
    this.isDead = false;
    this.move = function () {/*子弹移动方式*/
        this.bulletNode.style.left = parseInt(this.bulletNode.style.left) + this.speed + "px";
    };
    this.init = function () {/*子弹初始化*/
        this.bulletNode.src = this.imgsrc;
        this.bulletNode.style.position = "absolute";
        this.bulletNode.style.left = this.x + "px";
        this.bulletNode.style.top = this.y + "px";
        mainObj.appendChild(this.bulletNode);
    };
    this.init();
}

/*子弹移动*/
function bulletFly() {
    for (var i = 0; i < bulletArr.length; i++) {
        if (bulletArr[i].isDead == false) {
            bulletArr[i].move();
            if (parseInt(bulletArr[i].bulletNode.style.left) >= 1349) {
                mainObj.removeChild(bulletArr[i].bulletNode);
                bulletArr.splice(i, 1);
            }
        } else {
            mainObj.removeChild(bulletArr[i].bulletNode);
            bulletArr.splice(i, 1);
        }

    }
}


/*=====================敌方怪物====================*/
/**
 *
 * @param {string} imgsrc 图片路径
 * @param {number} x      起始坐标x
 * @param {number} y      起始坐标y
 * @param {number} blood  起始血量
 * @param {number} speed  起始速度
 * @constructor
 */
function EnemyMonster(name, imgsrc, x, y, blood, speed, attack, mark) {
    this.monsterNode = document.createElement("img");
    this.imgsrc = imgsrc;
    this.name = name;
    this.x = x;
    this.y = y;
    this.blood = blood;
    this.speed = speed;
    this.attack = attack;
    this.enemyMonsterDieTime = 15;
    this.isDead = false;
    this.mark = mark;
    this.move = function () {
        this.monsterNode.style.left = parseInt(this.monsterNode.style.left) - this.speed + "px";
    };

    /*初始化*/
    this.init = function () {
        this.monsterNode.src = this.imgsrc;
        this.monsterNode.style.position = "absolute";
        this.monsterNode.style.left = this.x + "px";
        this.monsterNode.style.top = this.y + "px";
        mainObj.appendChild(this.monsterNode);
    };
    this.init();
}

function enemyMonster() {
    /*实例化敌方怪物*/
    var enemyMonsterObj = new EnemyMonster("bird", "images/enemy/bird/move.gif", Math.random() * 10 + 1339, Math.random() * 400 + 10, 10, Math.random() * 5, 200, 5);
    enemyArr.push(enemyMonsterObj);
}

function enemyPlane() {
    /*实例化敌方飞机*/
    var enemyMonsterObj = new EnemyMonster("plane", "images/enemy/plane/move.gif", Math.random() * 10 + 1339, Math.random() * 400 + 10, Math.random() * 20, Math.random() * 9, 300, 6);
    enemyArr.push(enemyMonsterObj);
}

function enemyGhost() {
    /*实例化敌方怪物3*/
    var enemyMonsterObj = new EnemyMonster("ghost", "images/enemy/ghost/move.gif", Math.random() * 10 + 1339, Math.random() * 400 + 10, Math.random() * 20 + 10, Math.random() * 5, 500, 7);
    enemyArr.push(enemyMonsterObj);
}

function enemyMonster4() {
    /*实例化敌方怪物4*/
    var enemyMonsterObj = new EnemyMonster("boss", "images/enemy/boss/move.gif", Math.random() * 10 + 1339, Math.random() * 500 + 10, Math.random() * 100 + 100, Math.random() * 1, 800, 8);
    enemyArr.push(enemyMonsterObj);
}

/*敌方怪物移动*/
function moveMonster() {
    for (var i = 0; i < enemyArr.length; i++) {
        if (enemyArr[i].isDead == false) {
            enemyArr[i].move();
            if (parseInt(enemyArr[i].monsterNode.style.left) <= 160) {
                mainObj.removeChild(enemyArr[i].monsterNode);
                enemyArr.splice(i, 1);
            }
        } else {
            enemyArr[i].enemyMonsterDieTime--;
            if (enemyArr[i].enemyMonsterDieTime <= 0) {
                mainObj.removeChild(enemyArr[i].monsterNode);
                enemyArr.splice(i, 1);
            }
        }

    }
}

/*========子弹与怪物碰撞的函数==========*/
function collision() {
    for (var i = 0; i < enemyArr.length; i++) {//循环怪物的数组
        for (var j = 0; j < bulletArr.length; j++) {//循环子弹的数组
            var bulletLeft = parseInt(bulletArr[j].bulletNode.style.left);
            var bulletTop = parseInt(bulletArr[j].bulletNode.style.top);
            var enemyMonsterLeft = parseInt(enemyArr[i].monsterNode.style.left);
            var enemyMonsterTop = parseInt(enemyArr[i].monsterNode.style.top);
            //获取子弹的宽度
            var bulletWidth = parseInt(bulletArr[j].bulletNode.offsetWidth);
            //获取子弹的高度
            var bulletHeight = parseInt(bulletArr[j].bulletNode.offsetHeight);
            //获取怪物的宽度
            var enemyMonsterWidth = parseInt(enemyArr[i].monsterNode.offsetWidth);
            //获取怪物的高度
            var enemyMonsterHeight = parseInt(enemyArr[i].monsterNode.offsetHeight);
            if (bulletLeft + bulletWidth >= enemyMonsterLeft && bulletLeft + bulletWidth <= enemyMonsterLeft + enemyMonsterWidth && bulletTop + bulletHeight >= enemyMonsterTop && bulletTop <= enemyMonsterTop + enemyMonsterHeight) {
                enemyArr[i].blood = enemyArr[i].blood - bulletArr[j].attack;
                if (enemyArr[i].blood <= 0) {
                    if (enemyArr[i].name == "bird") {
                        enemyArr[i].monsterNode.src = "images/enemy/bird/hit.gif";
                        audioObj.src = "music/birdDie.mp3";
                    } else if (enemyArr[i].name == "plane") {
                        enemyArr[i].monsterNode.src = "images/enemy/plane/hit.gif";
                        audioObj.src = "music/planDie.mp3";
                    } else if (enemyArr[i].name == "ghost") {
                        enemyArr[i].monsterNode.src = "images/enemy/ghost/die.gif";
                        audioObj.src = "music/ghostDie.mp3";
                    } else if (enemyArr[i].name == "plane") {
                        enemyArr[i].monsterNode.src = "images/enemy/boss/die.gif";
                        audioObj.src = "music/bossDie.mp3";
                    }
                    enemyArr[i].isDead = true;
                    totalMark = totalMark + enemyArr[i].mark;
                    panObj.innerText = totalMark + "分";
                }
                bulletArr[j].isDead = true;

            }
            if (totalMark >= 80 && totalMark < 180) {
                gamePerson.personObj.src = "images/dragon/middle/move.gif";
                gamePerson.name = "middle";
                bulletArr[j].bulletNode.src = "images/dragon/middle/att.gif";
                bulletArr[j].attack = "30";
            }
            if (totalMark >= 180 && totalMark < 300) {
                gamePerson.personObj.src = "images/dragon/large/move.gif";
                bulletArr[j].bulletNode.src = "images/dragon/large/att.gif";
                bulletArr[j].attack = "60";
                gamePerson.name = "large";
            }
            if (totalMark >= 300) {
                gamePerson.personObj.src = "images/dragon/final/move.gif";
                bulletArr[j].bulletNode.src = "images/dragon/final/att.gif";
                bulletArr[j].attack = "90";
                gamePerson.name = "final";
            }
        }
    }
}


/*倒计时*/

var timeF4;
var timeF3;
var timeF2;
var timeF1;

function downTime() {
    var gameMaxTime = document.getElementsByClassName("gameMaxTime")[0];//获取大div
    gameMaxTime.style.display = "block";

    /*获取时间四部分*/
    var span04 = gameMaxTime.getElementsByClassName("span04")[0];
    var span04Img = span04.getElementsByTagName("img")[0];
    /*获取时间三部分*/
    var span03 = gameMaxTime.getElementsByClassName("span03")[0];
    var span03Img = span03.getElementsByTagName("img")[0];

    /*获取时间二部分*/
    var span02 = gameMaxTime.getElementsByClassName("span02")[0];
    var span02Img = span02.getElementsByTagName("img")[0];

    /*获取时间二部分*/
    var span01 = gameMaxTime.getElementsByClassName("span01")[0];
    var span01Img = span01.getElementsByTagName("img")[0];

    var count04 = 9;
    var count03 = 2;
    var count02 = 9;
    var count01 = 5;
    setTimeout(function () {
        span03Img.src = "images/num/2.gif";
    }, 1000);
    timeF4 = setInterval(f4, 1000);

    function f4() {
        span04Img.src = "images/num/" + count04 + ".gif";
        count04--;
        if (count04 == -1 && count03 != 0) {
            count04 = 9;
            count03--;
            setInterval(function () {
                span03Img.src = "images/num/" + count03 + ".gif";
            }, 1100);

        } else if (count04 == -1 && count03 == 0) {
            span04Img.src = "images/num/0.gif";
            clearInterval(timeF4);
            timeF2 = setInterval(f2, 1000)
        }
    }

    function f2() {
        span01Img.src = "images/num/" + count01 + ".gif";
        span02Img.src = "images/num/" + count02 + ".gif";
        count02--;
        if (count02 == -1 && count01 != 0) {
            count02 = 9;
            count01--;
            timeF1 = setInterval(function () {
                span01Img.src = "images/num/" + count01 + ".gif";
            }, 11000)
        } else if (count02 == -1 && count01 == 0) {
            overGame();
        }
    }
}




