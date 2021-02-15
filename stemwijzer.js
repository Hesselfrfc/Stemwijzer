
let currentSubject = 0;


const introHome = document.getElementById("introHome");
const startButton = document.getElementById("startBtn");
const titleHeader = document.getElementById("title");
const statementPara = document.getElementById("statement");
const choiceBtns = document.getElementById("choiceButtons");
const backBtn = document.getElementById("returnButton");
const nextButton = document.getElementById("nextBtn");
const skipStatement = document.getElementById("skipStatement");


startButton.onclick = clickStartBtn;
choiceBtns.onclick = nextStatement;
backBtn.onclick = previousStatement;
skipStatement.onclick = skipStatements;




//show element
function show (element){
    element.classList.remove("hidden");
}

//hide element
function hide(element){
    element.classList.add("hidden");
}

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

//go to next statement on button click
function nextStatement(){
    currentSubject++
    if(currentSubject < subjects.length){
        titleHeader.innerHTML = subjects[currentSubject].title;
        statementPara.innerHTML = subjects[currentSubject].statement;     
    } else {
        currentSubject--
    }
    console.log(subjects[currentSubject].title);
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
    console.log(subjects[currentSubject].title);
}

function skipStatements(){
    currentSubject++
    if(currentSubject < subjects.length){
        titleHeader.innerHTML = subjects[currentSubject].title;
        statementPara.innerHTML = subjects[currentSubject].statement;     
    } else {
        currentSubject--
    }
    console.log(subjects[currentSubject].title);
}

