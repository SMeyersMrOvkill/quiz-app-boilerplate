/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What colour was Darth Vader\'s lightsaber?',
      answers: [
        'blue',
        'green',
        'purple',
        'red'
      ],
      correctAnswer: 'red'
    },
    {
      question: 'How many Shrek movies exist?',
      answers: [
        '2',
        '3',
        '4',
        '5'
      ],
      correctAnswer: '4'
    },
    {
      question: 'What is the current year?',
      answers: [
        '1969',
        '2000',
        '2020',
        '20'
      ],
      correctAnswer: '2020'
    },
    {
      question: 'What was Emperor Palpatine\'s first name?',
      answers: [
        'Frank',
        'Drallo',
        'Shiv',
        'Doofenshmirtz'
      ],
      correctAnswer: 'Shiv'
    },
    {
      question: 'Who voices Shrek\'s truest companion in the Shrek series?',
      answers: [
        'Daniel Breaker',
        'Kevin Hart',
        'Eddie Murphy',
        'Chris Rock'
      ],
      correctAnswer: 'Eddie Murphy'
    },
    {
      question: 'Who is the current president of the United States?',
      answers: [
        'Barack Obama',
        'Donald Trump',
        'George H.W. Bush',
        'Abraham Lincoln'
      ],
      correctAnswer: 'Donald Trump'
    }
    
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  failedToAnswer: false,
  message: ""
};

/********** DATA MANIPULATION FUNCTIONS **********/

function startQuiz() {
  store.quizStarted = true;
  store.questionNumber = 0;
  store.score = 0;
}

function restartQuiz() {
  store.quizStarted = false;
  store.questionNumber = 0;
  store.score = 0;
}

function getSelectedAnswer() {
  return $('input[name=question' + store.questionNumber + ']:checked').val();
}

function getCorrectAnswer() {
  return store.questions[store.questionNumber].correctAnswer;
}

function scoreQuestion() {
  let answer = getSelectedAnswer();
  if(answer == undefined || answer == null) {
    store.failedToAnswer = true;
    render();
    return;
  }
  if(answer == getCorrectAnswer()) {
    store.message = "That's right! '" + answer + "' is the correct answer!";
    store.score += 1;
  } else {
    store.message = "Nope! '" + getCorrectAnswer() + "' was the correct answer!";
  }
  store.questionNumber += 1;
}

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

function templateStartPage() {
  return `<div class="card">
  <h2>Welcome to the random topic quiz!</h2>
  <p>This quiz will test your mastery of random topics.</p>
  <button id="start">Start</button>`;
}

function templateEndPage() {
  return `<div class="card">
  <h2>Congratulations!</h2>
  <p>You have finished the quiz. You scored ${store.score} points out of ${store.questions.length}</p>
  <strong>Your score: ${((store.score/store.questions.length) * 100).toFixed(3)}</strong>
  <button id="restart">Play again?</button>`;
}

function templateMessage() {
  return `<div class="card">
  <h2>${store.message}</h2>
  <button id="close">Close</button>`;
}

function templateQuestion() {
  let template = `<div class="card">`;
  if(store.failedToAnswer) {
    store.failedToAnswer = false;
    template += "<strong>Please select an answer.</strong></br>";
  }
  template += `<h2>${store.questions[store.questionNumber].question}</h2><form id="questionform">`;
  for(let i = 0; i < store.questions[store.questionNumber].answers.length; i++) {
    let answer = store.questions[store.questionNumber].answers[i];
    template += `<div class="form-group"><input type="radio" name="question${store.questionNumber}" value="${answer}">
    <label for="question${store.questionNumber}">${answer}</label></div>`
  }
  template += `<button id="answer">Submit Answer</button></form>`;
  return template;
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function render() {
  if(store.message != "") {
    console.log("Showing message", store.message);
    $('main').html(templateMessage());
  } else if(!store.quizStarted) {
    $('main').html(templateStartPage());
  } else if (store.questionNumber == store.questions.length) { 
    $('main').html(templateEndPage());
  } else {
    $('main').html(templateQuestion());
  }
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function handleStartQuiz(evt) {
  startQuiz();
  render();
}

function handleRestartQuiz(evt) {
  restartQuiz();
  render();
}

function handleAnswerQuestion(evt) {
  evt.preventDefault();
  scoreQuestion();
  render();
}

function handleCloseMessage(evt) {
  store.message = "";
  render();
}

$(() => {
  render();
  $('main').on('click', '#start', handleStartQuiz);
  $('main').on('click', '#restart', handleRestartQuiz);
  $('main').on('click', '#answer', handleAnswerQuestion);
  $('main').on('click', '#close', handleCloseMessage);
});