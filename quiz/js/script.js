let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();

document
  .querySelector('.score-area button')
  .addEventListener('click', resetEvent);

function showQuestion() {
  if (questions[currentQuestion]) {
    let q = questions[currentQuestion];

    let pct = Math.floor((currentQuestion / questions.length) * 100);

    document.querySelector('.progress-bar').style.width = `${pct}%`;

    document.querySelector('.score-area').style.display = 'none';
    document.querySelector('.question-area').style.display = 'block';
    document.querySelector('.question').innerHTML = q.question;

    let optionsHtml = '';

    for (let i in q.options) {
      optionsHtml += `<div class="option" data-op="${i}"><span>${
        parseInt(i) + 1
      }</span>${q.options[i]}</div>`;
    }

    document.querySelector('.options').innerHTML = optionsHtml;

    document.querySelectorAll('.options .option').forEach((item) => {
      item.addEventListener('click', optionClickEvent);
    });
  } else {
    finishQuiz();
  }
}

function optionClickEvent(e) {
  let clickedOption = parseInt(e.target.getAttribute('data-op'));

  if (questions[currentQuestion].answer === clickedOption) {
    correctAnswers++;
  }

  currentQuestion++;
  showQuestion();
}

function finishQuiz() {
  let points = Math.floor((correctAnswers / questions.length) * 100);

  if (points < 30) {
    document.querySelector('.score-text-1').innerHTML = `Você precisa estudar!`;
    document.querySelector('.score-percent').style.color = '#ff0000';
  } else if (points >= 30 && points < 70) {
    document.querySelector(
      '.score-text-1'
    ).innerHTML = `Você foi bem, mas pode melhorar!`;
    document.querySelector('.score-percent').style.color = '#ffff00';
  } else {
    document.querySelector('.score-text-1').innerHTML =
      'Parabéns! Você foi muito bem.';
    document.querySelector('.score-percent').style.color = '#0d630d';
  }

  document.querySelector('.score-percent').innerHTML = `Acertou ${points}%`;
  document.querySelector(
    '.score-text-2'
  ).innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}`;

  document.querySelector('.question-area').style.display = 'none';
  document.querySelector('.score-area').style.display = 'block';
  document.querySelector('.progress-bar').style.width = `100%`;
}

function resetEvent() {
  correctAnswers = 0;
  currentQuestion = 0;
  showQuestion();
}
