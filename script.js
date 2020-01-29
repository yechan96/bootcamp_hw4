var landing = document.querySelector("#landing-content");
var heading = document.querySelector("#heading");
var hsList = document.querySelector("#attachHS");
var highscore = document.querySelector("#highscore");
var homeBTN  = document.querySelector("#home");
var clearHS = document.querySelector("#clearHS");
var startButton = document.querySelector("#start-button");

var hsArr = [];
// JSON.parse(localStorage.getItem("highscore")) || [];

var highscoreButton = document.querySelector("#view-highscore");

var time = 0;
var timer = document.querySelector("#timer");

highscoreButton.addEventListener("click",function(){
    landing.style.display="none";
    heading.style.display="none";
    highscore.style.display="block";
    displayHS();
});

homeBTN.addEventListener("click",function(){
    landing.style.display="block";
    heading.style.display="block";
    highscore.style.display="none";
});

clearHS.addEventListener("click",function(){
    localStorage.clear();
});

startButton.addEventListener("click",function(){
    var obj = [
    {
        initials: "AJ",
        score: "20"
    },
    {
        initials: "AJ",
        score: "30"
    }

    ];

    localStorage.setItem("highscore", JSON.stringify(obj));
});




// var startTimer = setInterval(function(){
//     time--;
//     timerUpdate();
//     isTimeUp();
// }, 1000);
// button.addEventListener("click",function(){
//     time -= 15;
//     timerUpdate();
//     isTimeUp();
// });

function isTimeUp(){
    if (time<0){
        clearInterval(startTimer);
        time=0;
        timerUpdate();
    }
    else{
        return;
    }
}
function timerUpdate(){
    timer.textContent = "Time: "+time;
}

function displayHS(){
    hsArr.sort(compare);
    for (var i = 0 ; i < hsArr.length; i++){
        var temp = hsArr[i];
        var listHS = document.createElement("div");
        listHS.textContent = (i+1)+" "+temp.initials+"-"+temp.score;
        hsList.appendChild(listHS);
    }
}

function compare(a,b){
    return (b.score - a.score);
}
