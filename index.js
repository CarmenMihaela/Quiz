let state = {
    firstGame: true,
    questionIndex: 0,
    numberOfQuestions: 0,
    questions: [],
    answers: {}
}

let layout = {
    circlesDiv: [],
    answerContainersDiv: [],
    rectanglesDiv: [],
    scoreDiv: undefined,
    subTitle: undefined,
    questionDiv: undefined,
    bigContainerDiv: undefined,
    previousButton: undefined,
    nextButton: undefined
}

function markAnswer(event) {
    if (state.answers[state.questionIndex] == undefined) {
        state.answers[state.questionIndex] = event.currentTarget.innerText

        displayQuestion()
    }
}

function resetState() {
    state = {
        ...state,
        questionIndex: 0,
        numberOfQuestions: 0,
        questions: [],
        answers: {}
    }
}

function displayQuestion() {
    layout.subTitle.innerText = (state.questionIndex+1) + "/" + state.numberOfQuestions
    layout.questionDiv.innerHTML = "What is " + state.questions[state.questionIndex].firstNumber + " " + state.questions[state.questionIndex].operation + " " + state.questions[state.questionIndex].secondNumber

    for( i = 0; i < 5; i++ ) {
        layout.rectanglesDiv[i].innerText = state.questions[state.questionIndex].answers[i]
        color = 'white'
        if( state.answers[state.questionIndex] ) {
            if( state.questions[state.questionIndex].answers[i] == state.questions[state.questionIndex].correctAnswer ) {
                color = 'green'
            } else if ( state.questions[state.questionIndex].answers[i] == state.answers[state.questionIndex] ) {
                color = 'red'
            }
        }

        layout.rectanglesDiv[i].style.backgroundColor = color
        layout.circlesDiv[i].style.backgroundColor = color
    }

    
}

function showResult() {
    initialDiv.removeChild(layout.bigContainerDiv)
    document.body.removeChild(layout.previousButton)
    document.body.removeChild(layout.nextButton)

    layout.scoreDiv = document.createElement('p')
    layout.scoreDiv.style.backgroundColor = "transparent"
    let message = ''

    goodAnswer = Object.keys( state.answers ).filter( key => state.answers[key] == state.questions[key].correctAnswer ).length

    if (goodAnswer > 0) {
        message = "Congratulations! You answered correctly to " + goodAnswer + " out of " + state.numberOfQuestions + " questions."
    } else {
        message = "You did not answer correctly to any of the questions. Try again!"
    }

    layout.scoreDiv.innerText = message
    initialDiv.appendChild(layout.scoreDiv)

    initialDiv.appendChild(startButton)
    startButton.innerText = "Restart"
    state.firstGame = false
}

function createBoard() {
    if (!state.firstGame) {
        initialDiv.removeChild(layout.scoreDiv)
    }
    initialDiv.removeChild(startButton)
    layout.bigContainerDiv = document.createElement('div')
    layout.bigContainerDiv.classList.add('container')
    initialDiv.appendChild(layout.bigContainerDiv)

    let title = document.createElement('h1')
    title.style.backgroundColor = "transparent"
    let titleText = document.createTextNode("Math Problem")
    title.appendChild(titleText)
    layout.bigContainerDiv.appendChild(title)

    layout.subTitle = document.createElement('h2')
    layout.bigContainerDiv.appendChild(layout.subTitle)
    layout.questionDiv = document.createElement('h2')
    layout.bigContainerDiv.appendChild(layout.questionDiv)

    layout.answerContainersDiv = []
    layout.circlesDiv = []
    layout.rectanglesDiv = []

    for (i = 0; i < 5; i++) {
        let answerContainer = document.createElement('div')
        answerContainer.classList.add('answerContainer')

        let circle = document.createElement('div')
        circle.classList.add('circle' + (i + 1))

        let circleText = document.createTextNode("" + (i + 1))
        circle.appendChild(circleText)

        answerContainer.appendChild(circle)

        let rectangle = document.createElement('div')
        rectangle.classList.add('rectangle' + (i + 1))
        answerContainer.appendChild(rectangle)
        layout.bigContainerDiv.appendChild(answerContainer)

        layout.answerContainersDiv.push(answerContainer)
        layout.circlesDiv.push(circle)
        layout.rectanglesDiv.push(rectangle)
    }

    layout.previousButton = document.createElement('button')
    let previousButtonText = document.createTextNode("previous")
    layout.previousButton.appendChild(previousButtonText)
    document.body.appendChild(layout.previousButton)
    layout.previousButton.classList.add('btn')
    layout.previousButton.setAttribute("id", "previous")

    layout.nextButton = document.createElement('button')
    let nextButtonText = document.createTextNode("next")
    layout.nextButton.appendChild(nextButtonText)
    document.body.appendChild(layout.nextButton)
    layout.nextButton.classList.add('btn')
    layout.nextButton.setAttribute("id", "next")

    for (i = 0; i < 5; i++) {
        layout.rectanglesDiv[i].addEventListener("click", (event) => {
            markAnswer(event)
        })
    }

    layout.previousButton.addEventListener("click", showPreviousQuestion)
    layout.nextButton.addEventListener("click", showNextQuestion)
}

function generateQuestions() {
    state.questions = []
    state.numberOfQuestions = Math.floor(Math.random() * 3) + 1 //the number of questions is between 1 and 10  Math.floor(Math.random() * 10)+1
    state.questionIndex = 0

    for (i = 0; i < state.numberOfQuestions; i++) {
        let operations = ["+", "-"]
        let numbers = []

        while (numbers.length < 2) {
            let number = Math.floor(Math.random() * 100) + 1
            if (numbers.indexOf(number) === -1) numbers.push(number) //an array with unique positive numbers is generated
        }


        let firstNumber = numbers[0]
        let operation = operations[Math.floor(Math.random() * operations.length)]
        let secondNumber = numbers[1]

        function correctAnswer(firstNumber, operation, secondNumber) {
            if (operation == "-") {
                correctAnswer = firstNumber - secondNumber
            } else if (operation == "+") {
                correctAnswer = firstNumber + secondNumber
            } 
            return correctAnswer
        }

        correctAnswer = correctAnswer(firstNumber, operation, secondNumber)

        let answers = [] // the correct answer is included in the possible answers array
        while (answers.length < 5) {
            let answer = Math.floor(Math.random() * 200) + 1
            answer *= Math.round(Math.random()) ? 1 : -1
            if (answer != correctAnswer && answers.indexOf(answer) === -1) answers.push(answer) //an array with unique positive and negative numbers is generated
        }

        answers.splice(Math.floor(Math.random() * 5), 0, correctAnswer)

        let question = {
            firstNumber: firstNumber,
            secondNumber: secondNumber,
            operation: operation,
            correctAnswer: correctAnswer,
            answers: answers
        }
        
        state.questions.push(question)
    }
}

function showNextQuestion() {
    if (state.questionIndex < state.numberOfQuestions-1) {
        state.questionIndex++
        displayQuestion()          
    } else if (Object.keys(state.answers).length == state.numberOfQuestions) {
        showResult()
    }
}

function showPreviousQuestion() {
    if (state.questionIndex > 0) {
        state.questionIndex--
        
        displayQuestion()
    }
}

function playGame() {
    resetState()
    generateQuestions()
    createBoard()
    displayQuestion()
}

let initialDiv = document.getElementById('initial')
let startButton = document.createElement('button')
let startButtonText = document.createTextNode("Start")

startButton.appendChild(startButtonText)
startButton.setAttribute("id", "start")

initialDiv.appendChild(startButton)
startButton.classList.add('btn')

startButton.addEventListener("click", playGame)