let score = 0;
let questionNumber = 0;

//Get question from STORE and returns as HTML radio buttons
function getQuestions(){
 if (questionNumber < STORE.length){
   return `<div class="question-${questionNumber}">
    <h2>${STORE[questionNumber].question}</h2>
    <form>
    <fieldset>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
    <span>${STORE[questionNumber].answers[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
    <span>${STORE[questionNumber].answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
    <span>${STORE[questionNumber].answers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
    <span>${STORE[questionNumber].answers[3]}</span>
    </label>
    <button type="submit" class="btn submit">Submit</button>
    </fieldset>
    </form>
    </div>`;
 } else {
   //get results
   getResults();
   //restart quiz
   restartQuiz();
 }
}

//sends html to placeholder .generateQuiz
function sendQuestions(){
  $('.generateQuiz').html(getQuestions());
}

//promts user selection is correct, iterates score, sends html .score
function questionCorrect(){
  let correctAnswer = `${STORE[questionNumber].correct}`;
  $('.generateQuiz').html(`
  <div class="usrFeedback">
    <p><b>Good Job!</b><br><span>"${correctAnswer}" Is the Correct Choice!</span></p>
    <button type=button class="btn next">Next</button>
    </div>`);

  score++;
  $('.score').text(score);
  
}

//promts user selection is incorrect, shows correct choice
function questionWrong(){
  let curQuestion = `${STORE[questionNumber].question}`;
  let correctAnswer = `${STORE[questionNumber].correct}`;
  $('.generateQuiz').html(`<div class="usrFeedback">
  <p><b>Incorrect!</b><br><br><span>${curQuestion}</span><br><br> Answer: <span>${correctAnswer}</span></p>
  <button type=button class="btn next">Next</button></div>`);

}

//promts user end results of quiz, score
function getResults(){
  if(score == 10){
    $('.generateQuiz').html(`<div class="results"><h3>You're a movie star!</h3><br><p>A Perfect ${score} out of 10!</p><br><button class="btn restart">Restart Quiz</button></div>`);
    
  } else
  if(score >= 7 && score <= 9){
    $('.generateQuiz').html(`<div class="results"><h3>You Must Watch A Lot of Movies! Great Job</h3><br><p>A reliable score of: ${score} out of 10!</p><br><button class="btn restart">Restart Quiz</button></div>`);

  } else
  if(score <= 6 && score >=4){
    $('.generateQuiz').html(`<div class="results"><h3>Looks Like you need to go to the theater more often!</h3><br><p>Just bearly getting bye: ${score} out of 10!</p><br><button class="btn restart">Restart Quiz</button></div>`);

  } else {
    $('.generateQuiz').html(`<div class="results"><h3>I guess watching movies isn't everyones favorite passtime!</h3><br><p>Not good, but not bad, your movie score is: ${score} out of 10!</p><br><button class="btn restart">Restart Quiz</button></div>`);
    
  }

}

//iterates questionNumber, returns html to .questionNum to update html question number
function iterateQuestion() {
  questionNumber++;
  if(questionNumber < STORE.length){
     $('.questionNum').text(questionNumber+1);
  }
}

//next button to iterate question, send question and store selected answer
function getNextQuestion() {
  $('main').on('click', '.btn.next', function (event) {
    iterateQuestion();
    sendQuestions();
    usrSelect();

  });
  $('.results').empty();
}

//stores and compares user selected answer to correct answer, and routes correct/incorrect accordingly
function usrSelect(){
  
  $('.generateQuiz').on('click', '.btn.submit', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let comp = STORE[questionNumber].correct;
    if(answer === comp){
      questionCorrect();
      console.log(answer, comp);
    } else {
      console.log("made it here");
      questionWrong();
    }
    
  });
}

//restarts the quiz, go back to question 1, reset score and question number
function restartQuiz () {
  $('main').on('click', '.btn.restart', function (event) {
    //location.reload();
    score = 0;
    $('.score').text(score);

    questionNumber = 0;
    $('.questionNum').text(questionNumber+1);

    sendQuestions();
  });
}

//starts the quiz, hides .selectStart promt html, shows .generateQuiz
function startQuiz(){
  $('.selectStart')
  .click(function() {
      $('.selectStart').hide();
      $('.generateQuiz').fadeIn();
      $('.topLeft-Score').fadeIn();
      $('.topRight-Question').fadeIn();
      $('.questionNum').text(1);
      $('.score').text(0);
    });
}

function generateQuiz(){
  startQuiz();
  sendQuestions();
  usrSelect();
  getNextQuestion();
}

$(generateQuiz);