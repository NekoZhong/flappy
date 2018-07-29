var start = document.getElementById('start');
var firstPage = document.getElementById('firstPage');
var bird = document.getElementById('flyBird');
var score = document.getElementById('score');
var lose = document.getElementById('lose');
var lastscore = document.getElementById('lastscore');
var highestscore = document.getElementById('highestscore');
var wing = document.querySelector("#wing");
var dead = document.querySelector("#die");
var swoshing = document.querySelector("#swoshing");
var hit = document.querySelector("#hit");
var point = document.querySelector("#point");
start.onclick = function () {
    swoshing.play();    
    firstPage.style.display = "none";
    var timer = null;
    var iSpeedY = 0;
    var die = false;
    var last = null;
    var bigTimer = null;
    var count = 0;            
    clearInterval(timer);
    timer = setInterval(() => {
        iSpeedY += 0.5;
        var t = bird.offsetTop + iSpeedY;

        if (t < 0) {
            die = true;
            t = 0;
            iSpeedY = 0;
            clearInterval(bigTimer);
            lose.style.display = "block";
            clearInterval(last);
            hit.play();            
        }
        if (t > innerHeight - bird.offsetHeight -150) {
            die = true;
            iSpeedY = 0;
            clearInterval(timer);
            clearInterval(bigTimer);
            clearInterval(last);  
            lose.style.display = "block";
            flyingStop();
            hit.play();               
        }
        
        bird.style.top = t + 'px';
    }, 30);

    onkeydown = event => {
        wing.play();        
        if (die) return;
        iSpeedY -= 10;
    }

    last = setInterval(addZz, 1500)
    clearInterval(bigTimer);
    var m = false;
    bigTimer = setInterval(() => {
        var allTopG = document.querySelectorAll('.topG');
        var allBottomG = document.querySelectorAll('.bottomG');
        for (var i = 0; i < allTopG.length; i++) { 
            if (setBoom(bird, allTopG[i]) || setBoom(bird, allBottomG[i])) {
                die = true;
                clearInterval(bigTimer);
                clearInterval(last);
                lose.style.display = "block";
                hit.play();
                
            }
            if (allTopG[i].leftData == '-10') {
                pipe.removeChild(allTopG[i])
                pipe.removeChild(allBottomG[i]);
                continue;

            }
            if (allTopG[i].leftData == '50') {
                m = true;


            }

            //  
            allBottomG[i].style.left = allTopG[i].style.left = allTopG[i].leftData - 1 + '%';

            allTopG[i].leftData = allTopG[i].leftData - 1;

            if (allTopG[i].leftData <= 50 && m == true){
                count++
                m = false;
                score.innerHTML = count;
                lastscore.innerHTML = count;
                highestscore.innerHTML = count;
                point.play();
                
            }
            
        }
    }, 30);
    
}

function random(min, max) {
    return parseInt(Math.random() * (max - min + 1) + min);
};

function addZz() {
    var pipe = document.getElementById('pipe');
    pipe.style.height = innerHeight - 150 + 'px';
    var oDiv = document.createElement('div');
    var upImg = document.createElement('img');
    oDiv.className = 'topG';
    oDiv.leftData = '100';
    upImg.src = "./images/pipe_up.png";
    oDiv.appendChild(upImg);

    var downImg = document.createElement('img');
    var oDiv2 = document.createElement('div');
    oDiv2.className = 'bottomG';
    oDiv2.leftData = '100';
    downImg.src = "./images/pipe_down.png";
    oDiv2.appendChild(downImg);

    var h = random(50, 300);
    oDiv.style.height = h + 'px';
    oDiv2.style.height = innerHeight - h - 300 + 'px';
    // oDiv2.style.top = h  + 100 +'px';
    pipe.appendChild(oDiv);
    pipe.appendChild(oDiv2);
}

function setBoom(objA, objB) {
    var objBl = objB.offsetLeft;
    var objBt = objB.offsetTop;
    var objBr = objBl + objB.offsetWidth;
    var objBb = objBt + objB.offsetHeight;


    var objAt = objA.offsetTop + objA.offsetHeight;
    var objAl = objA.offsetWidth + objA.offsetLeft;
    var objAr = objA.offsetLeft;
    var objAb = objA.offsetTop;

    if (objAt > objBt && objAl > objBl && objBr > objAr && objAb < objBb) {

        return true
    }
    else {
        return false;
    }
}
function flyingStop() {
    document.getElementById("flyBird").style.animationPlayState = "paused";
};


