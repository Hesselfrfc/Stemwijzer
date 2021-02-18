var parties = [
    {
       name: "PVV",
       secular: true,
       size: 20,
       long: "Partij voor de Vrijheid"
     },
     {
       name: "D66",
       secular: true,
       size: 19,
       long: "Democratie 66"
     },
     {
       name: "CU",
       secular: false,
       size: 6,
       long: 'Christen Unie'
     },
     {
       name: "SP",
       secular: true,
       size: 14,
       long: "Socialistische Partij"
     }
   ];


let currentSubject = 0;

parties.forEach(party => {
    party.points = 0;

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



startButton.onclick = clickStartBtn;
backBtn.onclick = previousStatement;
skipStatement.onclick = skipStatements;
agreeButton.onclick = agree;
neitherButton.onclick = neither;
disagreeButton.onclick = disagree;
seeResults.onclick = result;




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

    rekenen();
}



function rekenen(){

    for (i = 0; i < subjects[currentSubject].parties.length; i ++){

            if(subjects[currentSubject].parties[i].position == subjects[currentSubject].myAnswer){
                for(x = 0; x < parties.length; x++){
                    if(subjects[currentSubject].parties[i].name == parties[x].name){
                        console.log(parties[x].name);
                    }
                }
            }
    } 
}



function result(){
    hide(container);
    hide(skipStatement);
    hide(choiceBtns);
    show(seeResults);

}



