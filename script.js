var landing = document.querySelector("#landing-content");
var heading = document.querySelector("#heading");
var hsList = document.querySelector("#attachHS");
var highscore = document.querySelector("#highscore");
var homeBTN  = document.querySelector("#home");
var clearHS = document.querySelector("#clearHS");
var startButton = document.querySelector("#start-button");
var questions = document.querySelector("#questions");
var questionsHeader = document.querySelector("#questionsHeader");
var choice1 = document.querySelector("#choice1");
var choice2 = document.querySelector("#choice2");
var choice3 = document.querySelector("#choice3");
var choice4 = document.querySelector("#choice4");
var endingScore = document.querySelector("#endingScore");
var scoreText = document.querySelector("#scoreText");
var initials = document.querySelector("#initials");
var submit = document.querySelector("#submit");
var answerIndicator = document.querySelector("#answerIndicator");



var hsArr = JSON.parse(localStorage.getItem("highscore")) || [];

var highscoreButton = document.querySelector("#view-highscore");

var time = 0;
var timer = document.querySelector("#timer");
var currAnswer = "";
var index = 0;
var startTimer = 0;
var score = 0;
var tempObj = {
    initials: "",
    score: 0
}

highscoreButton.addEventListener("click",moveToHS);

homeBTN.addEventListener("click",function(){
    landing.style.display="block";
    heading.style.display="block";
    highscore.style.display="none";
});

clearHS.addEventListener("click",function(){
    localStorage.clear();
    hsArr = [];
    displayHS();
});

startButton.addEventListener("click",function(){
    landing.style.display="none";
    questions.style.display="block";
    quizStart();
});

submit.addEventListener("click",function(){
    tempObj.initials = initials.value;
    tempObj.score = score;
    hsArr.push(tempObj);
    localStorage.setItem("highscore", JSON.stringify(hsArr));
    moveToHS();
})


function quizStart(){
    time = 75;
    index = 0;
    shuffle(questionArr);
    populateQuestions(index);
    startTimer = setInterval(function(){
        time--;
        timerUpdate();
        isTimeUp();
    }, 1000);
    choice1.addEventListener("click",evaluate);
    choice2.addEventListener("click",evaluate);
    choice3.addEventListener("click",evaluate);
    choice4.addEventListener("click",evaluate);
}

function populateQuestions(index){
    var temp = questionArr[index];
    currAnswer = temp.answer;
    questionsHeader.textContent=temp.question;
    var choiceTemp = [];
    for (var i =0;i<temp.choices.length;i++){
        choiceTemp.push(temp.choices[i]);
    }
    choice1.textContent=choiceTemp[0];
    choice2.textContent=choiceTemp[1];
    choice3.textContent=choiceTemp[2];
    choice4.textContent=choiceTemp[3];
}

function isTimeUp(){
    if (time<0){
        clearInterval(startTimer);
        time=0;
        timerUpdate();
        endQuiz();
    }
    else{
        return;
    }
}
function timerUpdate(){
    timer.textContent = "Time: "+time;
}

function displayHS(){
    while(hsList.firstChild){
        hsList.firstChild.remove();
    }
    if(hsArr.length>1){
        hsArr.sort(compare);
    }
    
    for (var i = 0 ; i < hsArr.length; i++){
        var temp = hsArr[i];
        var listHS = document.createElement("div");
        listHS.setAttribute("style","text-align: left; margin-bottom: 20px");

        listHS.textContent = (i+1)+" "+temp.initials+"-"+temp.score;
        hsList.appendChild(listHS);
    }
}

function evaluate(){
    if(this.textContent == currAnswer){
        answerPopup(0);
    }
    else{
        answerPopup(1);
        time -= 15;
        isTimeUp();
    }
    index++;
    if(index+1> questionArr.length){
        endQuiz();
    }
    else{
        populateQuestions(index);
    }
}

function answerPopup(index){
    var indicator = document.querySelector("#indicatorText");
    switch(index){
        case 0:
            indicator.textContent = "Correct!";
            break;
        case 1:
            indicator.textContent = "Wrong!";
            break;
    }
    answerIndicator.style.display = "block";
    var tempTimer = setTimeout(function(){
        answerIndicator.style.display = "none";
    },1000);
}

function endQuiz(){
    clearInterval(startTimer);
    score = time;
    time = 0;
    timerUpdate();
    questions.style.display = "none";
    endingScore.style.display = "block";
    scoreText.textContent = "Your score is: "+score;
    initials.value = "";
}

function moveToHS(){
    landing.style.display="none";
    heading.style.display="none";
    highscore.style.display="block";
    endingScore.style.display="none";
    displayHS();
}
//small helper functions
function compare(a,b){
    return (b.score - a.score);
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
