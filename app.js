/**
 * Example store structure
 */
const STORE = {
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
  message: ""
};

/********** DATA MANIPULATION FUNCTIONS **********/

/**
 * Starts the quiz
 */
function startQuiz() {
  STORE.quizStarted = true;
  STORE.questionNumber = 0;
  STORE.score = 0;
}

/**
 * Restarts the quiz
 */
function restartQuiz() {
  STORE.quizStarted = false;
  STORE.questionNumber = 0;
  STORE.score = 0;
}

/**
 * Prettiness function for getting the current question.
 */
function getCurrentQuestion() {
  return STORE.questions[STORE.questionNumber].question;
}

/**
 * Prettiness function for getting the currently selected answer.
 */
function getSelectedAnswer() {
  return $('input[name=question' + STORE.questionNumber + ']:checked').val();
}

/**
 * Prettiness function for getting the correct answer to the current question.
 */
function getCorrectAnswer() {
  return STORE.questions[STORE.questionNumber].correctAnswer;
}

/**
 * Calculates the score of a question.
 * Moves the page accordingly.
 */
function scoreQuestion() {
  let answer = getSelectedAnswer();
  if(answer == undefined || answer == null) {
    STORE.message = "Please answer the question";
    render();
    return;
  }
  if(answer == getCorrectAnswer()) {
    STORE.message = "That's right! '" + answer + "' is the correct answer!";
    STORE.score += 1;
  } else {
    STORE.message = "Nope! '" + getCorrectAnswer() + "' was the correct answer!";
  }
  STORE.questionNumber += 1;
}

function getScore() {
  return ((STORE.score/STORE.questions.length) * 100).toFixed(2);
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

/**
 * Generates the template for the start of a quiz.
 */
function templateStartPage() {
  return `<div class="card">
  <h2>Welcome to the random topic quiz!</h2>
  <p>This quiz will test your mastery of random topics.</p>
  <button id="start">Start</button>`;
}

/**
 * Generates the template for the end of a quiz.
 */
function templateEndPage() {
  return `<div class="card">
  <h2>Congratulations!</h2>
  <p>You have finished the quiz. You scored ${STORE.score} points out of ${STORE.questions.length}</p>
  <strong>Your score: ${getScore()}%</strong>
  <button id="restart">Play again?</button>`;
}

/**
 * Generates the template for a message.
 */
function templateMessage() {
  return `<div class="card">
  <h2>${STORE.message}</h2>
  <button id="close">Close</button>`;
}

/**
 * Generates the partial template for an individual answer within a question.
 * @param {string} answer 
 */
function templateAnswer(answer) {
  return `<div class="form-group">
  <input type="radio" name="question${STORE.questionNumber}" value="${answer}">
  <label for="question${STORE.questionNumber}">${answer}</label>
  </div>`;
}

/**
 * Generates the template for the question dialog.
 * @see templateAnswer
 */
function templateQuestion() {
  let template = `<div class="card">
  <strong>Question ${STORE.questionNumber} of ${STORE.questions.length} - ${getScore()}%
  <h2>${getCurrentQuestion()}</h2>
  <form id="questionform">`;
  for(let i = 0; i < STORE.questions[STORE.questionNumber].answers.length; i++) {
    let answer = STORE.questions[STORE.questionNumber].answers[i];
    template += templateAnswer(answer);
  }
  template += `<button id="answer">Submit Answer</button></form>`;
  return template;
}

/********** RENDER FUNCTION(S) **********/

/**
 * This function conditionally replaces the contents of the <main> tag based on the state of the store
 */
function render() {
  if(STORE.message != "") {
    console.log("Showing message", STORE.message);
    $('main').html(templateMessage());
  } else if(!STORE.quizStarted) {
    $('main').html(templateStartPage());
  } else if (STORE.questionNumber == STORE.questions.length) { 
    $('main').html(templateEndPage());
  } else {
    $('main').html(templateQuestion());
  }
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

/**
 * Start the quiz from the beginning
 * @see startQuiz
 * @see render
 * @param {Event} evt 
 */
function handleStartQuiz(evt) {
  startQuiz();
  render();
}

/**
 * Restart the quiz when we're at the end.
 * @see restartQuiz
 * @see render
 * @param {Event} evt 
 */
function handleRestartQuiz(evt) {
  restartQuiz();
  render();
}

/**
 * Answer a question.
 * @see scoreQuestion
 * @see render
 * @param {Event} evt 
 */
function handleAnswerQuestion(evt) {
  evt.preventDefault();
  scoreQuestion();
  render();
}

/**
 * Close a message dialog.
 * @see render
 * @param {Event} evt 
 */
function handleCloseMessage(evt) {
  STORE.message = "";
  render();
}

/**
 * Tie in all event handling functions
 */
$(() => {
  render();
  $('main').on('click', '#start', handleStartQuiz);
  $('main').on('click', '#restart', handleRestartQuiz);
  $('main').on('click', '#answer', handleAnswerQuestion);
  $('main').on('click', '#close', handleCloseMessage);
});