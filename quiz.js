let initialDiv = document.getElementById('initial')
let startButton = document.createElement('button')
let startButtonText = document.createTextNode("Start")
let timesPlayed = 0
let score
let goodAnswer = 0
let isClicked = {}


function makeStartButton() {
    startButton.appendChild(startButtonText)
    startButton.setAttribute("id", "start")
    initialDiv.appendChild(startButton)
    startButton.classList.add('btn')
}

makeStartButton()


if (timesPlayed > 0) {
    initialDiv.removeChild(score)
}
//making a container for all the game elements (question and answers)
initialDiv.removeChild(startButton)
let bigContainer = document.createElement('div')
bigContainer.classList.add('container')
initialDiv.appendChild(bigContainer)
//making the title 
let title = document.createElement('h1')
title.style.backgroundColor = "transparent"
let titleText = document.createTextNode("Math Problem")
title.appendChild(titleText)
bigContainer.appendChild(title)
//making the question
let subTitle = document.createElement('h2')
bigContainer.appendChild(subTitle)
let question = document.createElement('h2')
bigContainer.appendChild(question)

function buildAnswers(index) {
    let firstAnswerContainer, secondAnswerContainer, thirdAnswerContainer, fourthAnswerContainer, fifthAnswerContainer
    let firstCircle, secondCircle, thirdCircle, fourthCircle, fifthCircle
    let firstRectangle, secondRectangle, thirdRectangle, fourthRectangle, fifthRectangle
    let firstCircleText, secondCircleText, thirdCircleText, fourthCircleText, fifthCircleText

    let answerContainers = [firstAnswerContainer, secondAnswerContainer, thirdAnswerContainer, fourthAnswerContainer, fifthAnswerContainer]
    let circles = [firstCircle, secondCircle, thirdCircle, fourthCircle, fifthCircle]
    let circlesText = [firstCircleText, secondCircleText, thirdCircleText, fourthCircleText, fifthCircleText]
    let rectangles = [firstRectangle, secondRectangle, thirdRectangle, fourthRectangle, fifthRectangle]
    let className
    let circleNumber

    answerContainers[index] = document.createElement('div')
    answerContainers[index].classList.add('answerContainer')

    circles[index] = document.createElement('div')
    className = "circle" + index
    circles[index].classList.add(className)

    circleNumber = index
    circlesText[index] = document.createTextNode(circleNumber)
    circles[index].appendChild(circlesText[index])
    answerContainers[index].appendChild(circles[index])

    rectangles[index] = document.createElement('div')
    className = "rectangle" + index
    rectangles[index].classList.add(className)
    answerContainers[index].appendChild(rectangles[index])

    bigContainer.appendChild(answerContainers[index])
}

buildAnswers(1)
buildAnswers(2)
buildAnswers(3)
buildAnswers(4)
buildAnswers(5)

function makePrevNextButtons() {
    let previousButton = document.createElement('button')
    let previousButtonText = document.createTextNode("previous")
    previousButton.appendChild(previousButtonText)
    document.body.appendChild(previousButton)
    previousButton.classList.add('btn')
    previousButton.setAttribute("id", "previous")

    let nextButton = document.createElement('button')
    let nextButtonText = document.createTextNode("next")
    nextButton.appendChild(nextButtonText)
    document.body.appendChild(nextButton)
    nextButton.classList.add('btn')
    nextButton.setAttribute("id", "next")
}

makePrevNextButtons()

function fillInValues() {
    let questionIndex = 1
    let numberOfQuestions = Math.floor(Math.random() * 3) + 1 //the number of questions is between 1 and 10  Math.floor(Math.random() * 10)+1
    subTitle.innerText = questionIndex + "/" + numberOfQuestions
        question.innerHTML = "What is " + questions[0].firstNumber + " " + questions[0].operation + " " + questions[0].secondNumber

}

fillInValues()


function buildGameLayout() {
    let counterOfAnsweredQuestions = 0
    let isClicked = "no" //on-off switch so that once a choice is made, it cannot be changed or counted more than once

    let questions = []
    let numberOfQuestions = Math.floor(Math.random() * 3) + 1 //the number of questions is between 1 and 10  Math.floor(Math.random() * 10)+1
    let questionIndex = 1



    for (i = 0; i < numberOfQuestions; i++) {
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
            } return correctAnswer
        }

        correctAnswer = correctAnswer(firstNumber, operation, secondNumber)

        let answers = [] // the correct answer is included in the possible answers array
        while (answers.length < 4) {
            let answer = Math.floor(Math.random() * 200) + 1
            answer *= Math.round(Math.random()) ? 1 : -1
            if (answers.indexOf(answer) === -1) answers.push(answer) //an array with unique positive and negative numbers is generated
        }

        answers.splice(Math.floor(Math.random() * 4), 0, correctAnswer)
        console.log(answers)


        let Question = {
            firstNumber: firstNumber,
            secondNumber: secondNumber,
            operation: operation,
            correctAnswer: correctAnswer,
            firstAnswer: answers[0],
            secondAnswer: answers[1],
            thirdAnswer: answers[2],
            fourthAnswer: answers[3],
            fifthAnswer: answers[4]
        }
        questions.push(Question)

        subTitle.innerText = questionIndex + "/" + numberOfQuestions
        question.innerHTML = "What is " + questions[0].firstNumber + " " + questions[0].operation + " " + questions[0].secondNumber
        firstRectangle.innerText = questions[0].firstAnswer
        secondRectangle.innerText = questions[0].secondAnswer
        thirdRectangle.innerText = questions[0].thirdAnswer
        fourthRectangle.innerText = questions[0].fourthAnswer
        fifthRectangle.innerText = questions[0].fifthAnswer

    }

    function checkAnswerFifth(event) {
        if (isClicked == "no") {
            if (event.currentTarget.innerText == questions[0].correctAnswer) {
                event.currentTarget.style.backgroundColor = 'green'
                fifthCircle.style.backgroundColor = 'green'
                goodAnswer++
                isClicked = "yes"
                counterOfAnsweredQuestions++
                questions[0].fifthColor = window.getComputedStyle(fifthRectangle, null).getPropertyValue('background-color')
            } else {
                event.currentTarget.style.backgroundColor = 'red'
                fifthCircle.style.backgroundColor = 'red'
                isClicked = "yes"
                counterOfAnsweredQuestions++
                questions[0].fifthColor = window.getComputedStyle(fifthRectangle, null).getPropertyValue('background-color')
                if (questions[0].firstAnswer == questions[0].correctAnswer) {
                    firstRectangle.style.backgroundColor = 'green'
                    firstCircle.style.backgroundColor = 'green'
                    questions[0].firstColor = window.getComputedStyle(firstRectangle, null).getPropertyValue('background-color')
                }
                if (questions[0].secondAnswer == questions[0].correctAnswer) {
                    secondRectangle.style.backgroundColor = 'green'
                    secondCircle.style.backgroundColor = 'green'
                    questions[0].secondColor = window.getComputedStyle(secondRectangle, null).getPropertyValue('background-color')
                }
                if (questions[0].thirdAnswer == questions[0].correctAnswer) {
                    thirdRectangle.style.backgroundColor = 'green'
                    thirdCircle.style.backgroundColor = 'green'
                    questions[0].thirdColor = window.getComputedStyle(thirdRectangle, null).getPropertyValue('background-color')
                }
                if (questions[0].fourthAnswer == questions[0].correctAnswer) {
                    fourthRectangle.style.backgroundColor = 'green'
                    fourthCircle.style.backgroundColor = 'green'
                    questions[0].fourthColor = window.getComputedStyle(fourthRectangle, null).getPropertyValue('background-color')
                }
            }
        }
    }

    fifthRectangle.addEventListener("click", () => {
        checkAnswerFifth(event)
    })
    function checkAnswerFourth(event) {
        if (isClicked == "no") {
            if (event.currentTarget.innerText == questions[0].correctAnswer) {
                event.currentTarget.style.backgroundColor = 'green'
                fourthCircle.style.backgroundColor = 'green'
                goodAnswer++
                isClicked = "yes"
                counterOfAnsweredQuestions++
                questions[0].fourthColor = window.getComputedStyle(fourthRectangle, null).getPropertyValue('background-color')
            } else {
                event.currentTarget.style.backgroundColor = 'red'
                fourthCircle.style.backgroundColor = 'red'
                isClicked = "yes"
                counterOfAnsweredQuestions++
                questions[0].fourthColor = window.getComputedStyle(fourthRectangle, null).getPropertyValue('background-color')
                if (questions[0].firstAnswer == questions[0].correctAnswer) {
                    firstRectangle.style.backgroundColor = 'green'
                    firstCircle.style.backgroundColor = 'green'
                    questions[0].firstColor = window.getComputedStyle(firstRectangle, null).getPropertyValue('background-color')
                }
                if (questions[0].secondAnswer == questions[0].correctAnswer) {
                    secondRectangle.style.backgroundColor = 'green'
                    secondCircle.style.backgroundColor = 'green'
                    questions[0].secondColor = window.getComputedStyle(secondRectangle, null).getPropertyValue('background-color')
                }
                if (questions[0].thirdAnswer == questions[0].correctAnswer) {
                    thirdRectangle.style.backgroundColor = 'green'
                    thirdCircle.style.backgroundColor = 'green'
                    questions[0].thirdColor = window.getComputedStyle(thirdRectangle, null).getPropertyValue('background-color')
                }
                if (questions[0].fifthAnswer == questions[0].correctAnswer) {
                    fifthRectangle.style.backgroundColor = 'green'
                    fifthCircle.style.backgroundColor = 'green'
                    questions[0].fifthColor = window.getComputedStyle(fifthRectangle, null).getPropertyValue('background-color')
                }
            }
        }
    }

    fourthRectangle.addEventListener("click", () => {
        checkAnswerFourth(event)
    })

    function checkAnswerThird(event) {
        if (isClicked == "no") {
            if (event.currentTarget.innerText == questions[0].correctAnswer) {
                event.currentTarget.style.backgroundColor = 'green'
                thirdCircle.style.backgroundColor = 'green'
                goodAnswer++
                isClicked = "yes"
                counterOfAnsweredQuestions++
                questions[0].thirdColor = window.getComputedStyle(thirdRectangle, null).getPropertyValue('background-color')
            } else {
                event.currentTarget.style.backgroundColor = 'red'
                thirdCircle.style.backgroundColor = 'red'
                isClicked = "yes"
                counterOfAnsweredQuestions++
                questions[0].thirdColor = window.getComputedStyle(thirdRectangle, null).getPropertyValue('background-color')
                if (questions[0].firstAnswer == questions[0].correctAnswer) {
                    firstRectangle.style.backgroundColor = 'green'
                    firstCircle.style.backgroundColor = 'green'
                    questions[0].firstColor = window.getComputedStyle(firstRectangle, null).getPropertyValue('background-color')
                }
                if (questions[0].secondAnswer == questions[0].correctAnswer) {
                    secondRectangle.style.backgroundColor = 'green'
                    secondCircle.style.backgroundColor = 'green'
                    questions[0].secondColor = window.getComputedStyle(secondRectangle, null).getPropertyValue('background-color')
                }
                if (questions[0].fourthAnswer == questions[0].correctAnswer) {
                    fourthRectangle.style.backgroundColor = 'green'
                    fourthCircle.style.backgroundColor = 'green'
                    questions[0].fourthColor = window.getComputedStyle(fourthRectangle, null).getPropertyValue('background-color')
                }
                if (questions[0].fifthAnswer == questions[0].correctAnswer) {
                    fifthRectangle.style.backgroundColor = 'green'
                    fifthCircle.style.backgroundColor = 'green'
                    questions[0].fifthColor = window.getComputedStyle(fifthRectangle, null).getPropertyValue('background-color')
                }
            }
        }
    }

    thirdRectangle.addEventListener("click", () => {
        checkAnswerThird(event)
    })

    function checkAnswerSecond(event) {
        if (isClicked == "no") {
            if (event.currentTarget.innerText == questions[0].correctAnswer) {
                event.currentTarget.style.backgroundColor = 'green'
                secondCircle.style.backgroundColor = 'green'
                goodAnswer++
                isClicked = "yes"
                counterOfAnsweredQuestions++
                questions[0].secondColor = window.getComputedStyle(secondRectangle, null).getPropertyValue('background-color')
            } else {
                event.currentTarget.style.backgroundColor = 'red'
                secondCircle.style.backgroundColor = 'red'
                isClicked = "yes"
                counterOfAnsweredQuestions++
                questions[0].secondColor = window.getComputedStyle(secondRectangle, null).getPropertyValue('background-color')
                if (questions[0].firstAnswer == questions[0].correctAnswer) {
                    firstRectangle.style.backgroundColor = 'green'
                    firstCircle.style.backgroundColor = 'green'
                    questions[0].firstColor = window.getComputedStyle(firstRectangle, null).getPropertyValue('background-color')
                }
                if (questions[0].thirdAnswer == questions[0].correctAnswer) {
                    thirdRectangle.style.backgroundColor = 'green'
                    thirdCircle.style.backgroundColor = 'green'
                    questions[0].thirdColor = window.getComputedStyle(thirdRectangle, null).getPropertyValue('background-color')
                }
                if (questions[0].fourthAnswer == questions[0].correctAnswer) {
                    fourthRectangle.style.backgroundColor = 'green'
                    fourthCircle.style.backgroundColor = 'green'
                    questions[0].fourthColor = window.getComputedStyle(fourthRectangle, null).getPropertyValue('background-color')
                }
                if (questions[0].fifthAnswer == questions[0].correctAnswer) {
                    fifthRectangle.style.backgroundColor = 'green'
                    fifthCircle.style.backgroundColor = 'green'
                    questions[0].fifthColor = window.getComputedStyle(fifthRectangle, null).getPropertyValue('background-color')
                }
            }
        }
    }

    secondRectangle.addEventListener("click", () => {
        checkAnswerSecond(event)
    })

    function checkAnswerFirst(event) {
        if (isClicked == "no") {
            if (event.currentTarget.innerText == questions[0].correctAnswer) {
                event.currentTarget.style.backgroundColor = 'green'
                firstCircle.style.backgroundColor = 'green'
                goodAnswer++
                isClicked = "yes"
                counterOfAnsweredQuestions++
                questions[0].firstColor = window.getComputedStyle(firstRectangle, null).getPropertyValue('background-color')
            } else {
                event.currentTarget.style.backgroundColor = 'red'
                firstCircle.style.backgroundColor = 'red'
                isClicked = "yes"
                counterOfAnsweredQuestions++
                questions[0].firstColor = window.getComputedStyle(firstRectangle, null).getPropertyValue('background-color')
                if (questions[0].secondAnswer == questions[0].correctAnswer) {
                    secondRectangle.style.backgroundColor = 'green'
                    secondCircle.style.backgroundColor = 'green'
                    questions[0].secondColor = window.getComputedStyle(secondRectangle, null).getPropertyValue('background-color')
                }
                if (questions[0].thirdAnswer == questions[0].correctAnswer) {
                    thirdRectangle.style.backgroundColor = 'green'
                    thirdCircle.style.backgroundColor = 'green'
                    questions[0].thirdColor = window.getComputedStyle(thirdRectangle, null).getPropertyValue('background-color')
                }
                if (questions[0].fourthAnswer == questions[0].correctAnswer) {
                    fourthRectangle.style.backgroundColor = 'green'
                    fourthCircle.style.backgroundColor = 'green'
                    questions[0].fourthColor = window.getComputedStyle(fourthRectangle, null).getPropertyValue('background-color')
                }
                if (questions[0].fifthAnswer == questions[0].correctAnswer) {
                    fifthRectangle.style.backgroundColor = 'green'
                    fifthCircle.style.backgroundColor = 'green'
                    questions[0].fifthColor = window.getComputedStyle(fifthRectangle, null).getPropertyValue('background-color')
                }
            }
        }
    }

    firstRectangle.addEventListener("click", () => {
        checkAnswerFirst(event)
    })


    function nextQuestion() {
        questionIndex++
        console.log(questionIndex)

        let isClicked = "no"

        if (questionIndex <= numberOfQuestions) {


            firstRectangle.style.backgroundColor = 'white'
            secondRectangle.style.backgroundColor = 'white'
            thirdRectangle.style.backgroundColor = 'white'
            fourthRectangle.style.backgroundColor = 'white'
            fifthRectangle.style.backgroundColor = 'white'

            firstCircle.style.backgroundColor = 'white'
            secondCircle.style.backgroundColor = 'white'
            thirdCircle.style.backgroundColor = 'white'
            fourthCircle.style.backgroundColor = 'white'
            fifthCircle.style.backgroundColor = 'white'

            subTitle.innerText = questionIndex + "/" + numberOfQuestions
            question.innerHTML = "What is " + questions[questionIndex - 1].firstNumber + " " + questions[questionIndex - 1].operation + " " + questions[questionIndex - 1].secondNumber
            firstRectangle.innerText = questions[questionIndex - 1].firstAnswer
            secondRectangle.innerText = questions[questionIndex - 1].secondAnswer
            thirdRectangle.innerText = questions[questionIndex - 1].thirdAnswer
            fourthRectangle.innerText = questions[questionIndex - 1].fourthAnswer
            fifthRectangle.innerText = questions[questionIndex - 1].fifthAnswer

            circles = [firstCircle, secondCircle, thirdCircle, fourthCircle, fifthCircle]
            rectangles = [firstRectangle, secondRectangle, thirdRectangle, fourthRectangle, fifthRectangle]

            function checkAnswer(event, answerIndex) {
                if (isClicked == "no") {
                    if (event.currentTarget.innerText == questions[questionIndex - 1].correctAnswer) {
                        event.currentTarget.style.backgroundColor = 'green'
                        circles[answerIndex - 1].style.backgroundColor = 'green'
                        goodAnswer++
                        isClicked = "yes"
                        counter++
                    } else {
                        event.currentTarget.style.backgroundColor = 'red'
                        circles[answerIndex - 1].style.backgroundColor = 'red'
                        isClicked = "yes"
                        counterOfAnsweredQuestions++
                        questions[questionIndex - 1].fifthColor = window.getComputedStyle(fifthRectangle, null).getPropertyValue('background-color')
                        if (questions[questionIndex - 1].firstAnswer == questions[questionIndex - 1].correctAnswer) {
                            firstRectangle.style.backgroundColor = 'green'
                            firstCircle.style.backgroundColor = 'green'
                            questions[questionIndex - 1].firstColor = window.getComputedStyle(firstRectangle, null).getPropertyValue('background-color')
                        }
                        else if (questions[questionIndex - 1].secondAnswer == questions[questionIndex - 1].correctAnswer) {
                            secondRectangle.style.backgroundColor = 'green'
                            secondCircle.style.backgroundColor = 'green'
                            questions[questionIndex - 1].secondColor = window.getComputedStyle(secondRectangle, null).getPropertyValue('background-color')
                        }
                        else if (questions[questionIndex - 1].thirdAnswer == questions[questionIndex - 1].correctAnswer) {
                            thirdRectangle.style.backgroundColor = 'green'
                            thirdCircle.style.backgroundColor = 'green'
                            questions[questionIndex - 1].thirdColor = window.getComputedStyle(thirdRectangle, null).getPropertyValue('background-color')
                        }
                        else if (questions[questionIndex - 1].fourthAnswer == questions[questionIndex - 1].correctAnswer) {
                            fourthRectangle.style.backgroundColor = 'green'
                            fourthCircle.style.backgroundColor = 'green'
                            questions[questionIndex - 1].fourthColor = window.getComputedStyle(fourthRectangle, null).getPropertyValue('background-color')
                        }
                    }
                }
            }

            fifthRectangle.addEventListener("click", (event) => {
                checkAnswer(event, 5)
            })

            fourthRectangle.addEventListener("click", (event) => {
                checkAnswer(event, 4)
            })

            thirdRectangle.addEventListener("click", (event) => {
                checkAnswer(event, 3)
            })

            secondRectangle.addEventListener("click", (event) => {
                checkAnswer(event, 2)
            })

            firstRectangle.addEventListener("click", (event) => {
                checkAnswer(event, 1)
            })



        } else if (counterOfAnsweredQuestions === numberOfQuestions) {
            initialDiv.removeChild(bigContainer)
            document.body.removeChild(previousButton)
            document.body.removeChild(nextButton)

            score = document.createElement('p')
            score.style.backgroundColor = "transparent"
            let message
            if (goodAnswer > numberOfQuestions) {
                goodAnswer = numberOfQuestions
            }
            if (goodAnswer > 0) {
                message = "Congratulations! You answered correctly to " + goodAnswer + " out of " + numberOfQuestions + " questions."
            }
            if (goodAnswer == 0) {
                message = "You did not answer correctly to any of the questions. Try again!"
            }

            score.innerText = message
            initialDiv.appendChild(score)
            timesPlayed++

            initialDiv.appendChild(startButton)
            startButton.innerText = "Restart"

        }
    }

    previousButton.addEventListener("click", () => {
        if (questionIndex > 1) {
            questionIndex--
            console.log(questionIndex)
            subTitle.innerText = questionIndex + "/" + numberOfQuestions
            question.innerHTML = "What is " + questions[questionIndex - 1].firstNumber + " " + questions[questionIndex - 1].operation + " " + questions[questionIndex - 1].secondNumber
            firstRectangle.innerText = questions[questionIndex - 1].firstAnswer
            secondRectangle.innerText = questions[questionIndex - 1].secondAnswer
            thirdRectangle.innerText = questions[questionIndex - 1].thirdAnswer
            fourthRectangle.innerText = questions[questionIndex - 1].fourthAnswer
            fifthRectangle.innerText = questions[questionIndex - 1].fifthAnswer
            firstCircle.style.backgroundColor = questions[questionIndex - 1].firstColor
            firstRectangle.style.backgroundColor = questions[questionIndex - 1].firstColor
            secondCircle.style.backgroundColor = questions[questionIndex - 1].secondColor
            secondRectangle.style.backgroundColor = questions[questionIndex - 1].secondColor
            thirdCircle.style.backgroundColor = questions[questionIndex - 1].thirdColor
            thirdRectangle.style.backgroundColor = questions[questionIndex - 1].thirdColor
            fourthCircle.style.backgroundColor = questions[questionIndex - 1].fourthColor
            fourthRectangle.style.backgroundColor = questions[questionIndex - 1].fourthColor
            fifthCircle.style.backgroundColor = questions[questionIndex - 1].fifthColor
            fifthRectangle.style.backgroundColor = questions[questionIndex - 1].fifthColor
            isClicked = "yes"
        }
    })


    nextButton.addEventListener("click", () => {

        nextQuestion()
    })

}

startButton.addEventListener("click", () => {
    buildGameLayout()
})


