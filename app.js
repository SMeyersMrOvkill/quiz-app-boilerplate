/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What color is Darth Vader\'s lightsaber?',
      answers: [
        'red',
        'orange',
        'pink',
        'green'
      ],
      correctAnswer: 'red'
    },
    {
      question: 'What is the current year?',
      answers: [
        '1970',
        '2015',
        '2020',
        '2005'
      ],
      correctAnswer: '2020'
    }
    
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
};

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
<strong>Your score: ${((store.score/store.questions.length) * 100).toFixed(3)}</strong><br />
<button id="restart">Play again?</button>`;
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function render() {
  if(!store.quizStarted) {
    $('main').html(templateStartPage());
  } else if (store.questionNumber == store.questions.length) { 
    $('main').html(templateEndPage());
  } else {
    $('main').html("");
  }
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function handleStartQuiz(evt) {
  store.quizStarted = true;
  store.questionNumber = 0;
  store.score = 0;
  render();
}

function handleRestartQuiz(evt) {
  store.quizStarted = false;
  store.questionNumber = 0;
  store.score = 0;
  render();
}

$(() => {
  render();
  $('main').on('click', '#start', handleStartQuiz);
  $('main').on('click', '#restart', handleRestartQuiz);
});