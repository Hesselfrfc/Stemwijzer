

let currentSubject = 0;

parties.forEach(party => {
    party.points = 0;
});

subjects.forEach(subject => {
    subject.myAnswer = '';
});

const introHome = document.getElementById("introHome");
const startButton = document.getElementById("startBtn");
const titleHeader = document.getElementById("title");
const statementPara = document.getElementById("statement");
const choiceBtns = document.getElementById("choiceButtons");
const backBtn = document.getElementById("returnButton");
const nextButton = document.getElementById("nextBtn");
const skipStatement = document.getElementById("skipStatement");
const seeResults = document.getElementById("checkResults");
var agreeButton = document.getElementById("agreeBtn");
var neitherButton = document.getElementById("neitherBtn");
var disagreeButton = document.getElementById("disagreeBtn");
var uitslagen = document.getElementById("uitslagen");
var partijen = document.getElementById("partijen");



startButton.onclick = clickStartBtn;
backBtn.onclick = previousStatement;
skipStatement.onclick = skipStatements;
agreeButton.onclick = agree;
neitherButton.onclick = neither;
disagreeButton.onclick = disagree;
seeResults.onclick = resultCalc;




//show element
function show (element){
    element.classList.remove("hidden");
}

//hide element
function hide(element){
    element.classList.add("hidden");
}

//add active class
function activeButton(element){
    element.classList.add("activeBtn")
}

//show subjects title and statement instead of default text
function clickStartBtn(){

    const container = document.getElementById("container");
    show(container);
    hide(startButton);
    show(choiceBtns);
    show(backBtn);
    hide(introHome);
    show(skipStatement);

    titleHeader.innerHTML = subjects[currentSubject].title;
    statementPara.innerHTML = subjects[currentSubject].statement;
}

// go to previous statement on button click
function previousStatement(){
    currentSubject--
    if(currentSubject >=0){
        titleHeader.innerHTML = subjects[currentSubject].title;
        statementPara.innerHTML = subjects[currentSubject].statement;        
    } else {
        currentSubject ++
    }
    console.log(currentSubject);
}

// skip the question/statement
function skipStatements(){
    currentSubject++
    if(currentSubject < subjects.length){
        titleHeader.innerHTML = subjects[currentSubject].title;
        statementPara.innerHTML = subjects[currentSubject].statement;     
    } else {
        currentSubject--
    }
    console.log(currentSubject);
}

// this function saves your answer (which is pro/agree) and shows the next statement
function agree(){
    choice("pro");
    if ((subjects.length -1) == currentSubject){
        calculate();

    } else {
        currentSubject ++;
        titleHeader.innerHTML = subjects[currentSubject].title;
        statementPara.innerHTML = subjects[currentSubject].statement;
    }
    console.log(currentSubject);
}

// this function saves your answer and shows the next statement
function neither(){
    choice("none");
    if ((subjects.length -1) == currentSubject){
        calculate();
    } else {
        currentSubject ++;
        titleHeader.innerHTML = subjects[currentSubject].title;
        statementPara.innerHTML = subjects[currentSubject].statement;
    }
    console.log(currentSubject);
}

// this function saves your answer (which is contra/disagree) and shows the next statement
function disagree(){
    choice("contra");
    if ((subjects.length -1) == currentSubject){
        calculate();

    } else {
        currentSubject ++;
        titleHeader.innerHTML = subjects[currentSubject].title;
        statementPara.innerHTML = subjects[currentSubject].statement;
    }
    console.log(currentSubject);
}

// this function creates an array which will be stored with your answers
function choice(insert){

    subjects[currentSubject].myAnswer = insert;
    console.log(subjects[currentSubject].myAnswer);

}



function calculate(){

    subjects.forEach(subject => {
        subject.parties.forEach(function(partyPar, partyIndex){
            if(subject.myAnswer == subject.parties[partyIndex].position){
                var scoreParty = parties.find(party => party.name == subject.parties[partyIndex].name);
                scoreParty.points+=1;
            }
        });
        
    });
    console.log(parties);
    result();
}



function result(){
    hide(container);
    hide(skipStatement);
    hide(choiceBtns);
    show(seeResults);

}

function resultCalc(){
    hide(seeResults);
    show(uitslagen);

    parties.sort(function (a, b) {
        return b.points - a.points;
    });
    console.log(parties);

    parties.forEach(party => {

       var percentage = 100 / subjects.length * party.points;
       var afronden = percentage.toFixed();
        partijen.innerHTML += party.name + " "  + afronden +  "%" + "</br>";
    });

}

