const BASE_URL = 'https://opentdb.com/api.php?amount=10&category=18&type=multiple'
const button = document.querySelector('button')
const answersDiv = document.querySelector('#answers')
const questionHeading = document.querySelector('#question')
const triviaDiv = document.querySelector('.triviaDiv')

// const questionHeading = document.createElement('div')
// const section = document.querySelector('section')
// section.appendChild('questionHeading')


button.addEventListener('click', getData)

async function getData() {
  let response = await axios.get(`${BASE_URL}`)
  triviaGameQuestions(response.data.results)
  triviaGameAnswers(response.data.results)
}

let index = 0
let score = 0 
let currentQuestion = 1
let totalQuestions 

function triviaGameQuestions(question) {

  questionHeading.innerText = question[index].question
}

function triviaGameAnswers(answers) {
  totalQuestions = answers.length

  const allAnswers = [answers[index].correct_answer, ...answers[index].incorrect_answers]
  // console.log(allAnswers[0])
  const shuffledAnswers = shuffle(allAnswers)

  let input1Value = shuffledAnswers[0].split(' ').join('-')
  let input2Value = shuffledAnswers[1].split(' ').join('-')
  let input3Value = shuffledAnswers[2].split(' ').join('-')
  let input4Value = shuffledAnswers[3].split(' ').join('-')
  // console.log(shuffledAnswers[0])

   answersDiv.innerHTML = `
  <button class='option' value=${input1Value}>
  <label for="choice-1">${shuffledAnswers[0]}</button>
  <br>
  <button class='option' value=${input2Value}>
  <label for="choice-2">${shuffledAnswers[1]}</button>
  <br>
  <button class='option' value=${input3Value}>
  <label for="choice-3">${shuffledAnswers[2]}</button>
  <br>
  <button class='option' value=${input4Value}>
  <label for="choice-4">${shuffledAnswers[3]}</button>
  <br>
  `

  const answerButton = document.querySelector('.option')
  
  button.addEventListener('click', () => {
    let checked = document.querySelector('input[name="answer"]:checked').Value;
    let checkedAnswer = checked.split('-').join(' ')
  
    if (checkedAnswer === answers[index].correct_answer) {
      score++
    }

    index++ 
    currentQuestion++

    if (index < answers.length) {
      // Next question.
      triviaGameQuestions(answers) 
      triviaGameAnswers(answers)

    } else {
      // End game. 
      endGame()
    }
  })
}

// let timeLimit = 10;
// let startTime = Date.now(); //get the time at the moment a user first sees the question
// clearInterval(trivia.countDown);
// trivia.countDown = setInterval(function () {
//   if (trivia.state == "question") { //ensure the user has not already answered
//     let elapsedTime = (Date.now() - startTime)/1000; //calculate the time elapsed
//     let clock = timeLimit - Math.floor(elapsedTime);//calculate the countdown w/o decimals
//     $('#timer').html(clock);// place the clock time in the html for viewing
//     if (clock == 0) { //if time is up
//       clearInterval(trivia.countDown); //stops our timer at 0. Don't want -1 ...
//       trivia.triggerAnswer(false); //marks the answer as incorrect in trivia library
//     }
//   }
//   else clearInterval(trivia.countDown);
// }, 100);//100 is the time interval in milliseconds



function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}

function endGame() {
  triviaDiv.innerHTML = `
    <h2> Thank You for Playing!</h2> 
    <p>Out of ${totalQuestions} questions you scored a total of ${score} points</p>
    `
}  
// setTimeout(function(){code here},seconds*1000)