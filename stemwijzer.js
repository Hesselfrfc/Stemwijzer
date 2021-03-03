
let currentSubject = 0;
var partyResults = [];
var partySize = 10;

parties.forEach(party => {
    party.points = 0;
});

subjects.forEach(subject => {
    subject.myAnswer = '';
    subject.important = false;
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
const calcRes = document.getElementById("showResults")
const importantStatement = document.getElementById("important");
const filterSecular = document.getElementById("secular");
const filterAll = document.getElementById("all");
const filterBig = document.getElementById("big");
var agreeButton = document.getElementById("agreeBtn");
var neitherButton = document.getElementById("neitherBtn");
var disagreeButton = document.getElementById("disagreeBtn");
var uitslagen = document.getElementById("uitslagen");
var partijen = document.getElementById("partijen");
var buttons = document.getElementsByClassName("btn");



startButton.onclick = clickStartBtn;
backBtn.onclick = previousStatement;
skipStatement.onclick = skipStatements;
agreeButton.onclick = agree;
neitherButton.onclick = neither;
disagreeButton.onclick = disagree;
calcRes.onclick = resultCalc;
filterSecular.onclick = getSecularParties;
filterAll.onclick = getAllParties;
filterBig.onclick = getBigParties;




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
    element.classList.add("activeBtn");
}

function removeActiveButton(element){
    element.classList.remove("activeBtn");
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

function displayStatament(){
    titleHeader.innerHTML = subjects[currentSubject].title;
    statementPara.innerHTML = subjects[currentSubject].statement;
}

// go to previous statement on button click
function previousStatement(){
    currentSubject--
    if(currentSubject >=0){
        displayStatament();    
    } else {
        currentSubject ++
    }
    console.log(currentSubject);
}

// skip the question/statement
function skipStatements(){
    currentSubject++
    if(currentSubject < subjects.length){
        displayStatament();      
    } else {
        currentSubject--
        rememberChoice(subjects[currentSubject].myAnswer);
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
        importantStatement.checked = false;
        displayStatament(); 
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
        displayStatament(); 
        rememberChoice(subjects[currentSubject].myAnswer);
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
        importantStatement.checked = false;
        displayStatament(); 
        rememberChoice(subjects[currentSubject].myAnswer);
    }
    console.log(currentSubject);
}

// this function creates an array which will be stored with your answers
function choice(insert){

    subjects[currentSubject].myAnswer = insert;
    subjects[currentSubject].important = importantStatement.checked;
    console.log(subjects[currentSubject].myAnswer);

}

// this function checks if the statement is set on "important"
function rememberChoice(){
    importantStatement.checked = false;

    if(subjects[currentSubject].important == true){
        importantStatement.checked = true;
    }
}

// this function compares your answer on the statement with the opinion of the parties. If
// your answer has the same value as the party, they get +1 point, if the statement is important, they get +2
function calculate(){

    subjects.forEach(subject => {
        subject.parties.forEach(function(partyPar, partyIndex){
            if(subject.myAnswer == subject.parties[partyIndex].position){
                var scoreParty = parties.find(party => party.name == subject.parties[partyIndex].name);
                if(subject.important == true) {
                    scoreParty.points+=2;
                }else {
                    scoreParty.points+=1;
                }
            }
        });      
    });
    result();
}

// this function filters all secular parties
function getSecularParties() {
    partyResults = [];

    partyResults = parties.filter(party => {
        return party.secular == true;
    });   
}


// this function selects all parties within the party array
function getAllParties() {
    partyResults = [];

    partyResults = parties;

}

// this function selects all parties that are "big". This value is set within a var on row 4
function getBigParties() {
    partyResults = [];

    partyResults = parties.filter(party => {
        return party.size >= partySize;
    });

}


// this function sorts the parties from highest points to lowest
function result(){
    hide(container);
    hide(skipStatement);
    hide(choiceBtns);
    show(seeResults);
   
    parties.sort(function (a, b) {
        return b.points - a.points;
    });
    console.log(parties);

}

// this function lets you choose between the 3 filter options and shows the result of the filtered parties
function resultCalc(){
    if(partyResults.length == 0) {
        return alert('Kies uit de drie knoppen');
    }

    hide(seeResults);
    show(uitslagen);

    
    partyResults.forEach(party => {
            partijen.innerHTML+=party.long + "" + "</br>";      
    });

}