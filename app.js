const quizFormElement = document.querySelector(".quiz-form");
const startQuizButton = document.querySelector("#startedQuiz");
const popupEndQuiz = document.querySelector(".popup-end-quiz");
const closeScoreQuizButton = document.querySelector(".btn-close-popup-score");
const checkAnswersButton = document.querySelector(".btn-check-answers");
const titlePopupScore = document.querySelector(".title-popup-score");
const sendAnswersButton = document.querySelector("#btnEndQuiz");
const refreshButton = document.querySelector("#refreshButton");
const titleButton = document.querySelector("#titleButton");

const correctAnswers = ["A", "A", "A", "B", "A"];
const answerInputs = [
  "inputQuestion1",
  "inputQuestion2",
  "inputQuestion3",
  "inputQuestion4",
  "inputQuestion5",
];

const showQuiz = () => {
  quizFormElement.style.display = "block";
  titleButton.style.display = "none";
};

const handleSubmitForm = (event) => {
  event.preventDefault();

  const [score, scorePercentage] = calculateResult(event);

  handleQuizPerformanceFeedback(scorePercentage, score, answerInputs);

  transformTitleButton(scorePercentage, score);
};

const isAnswerCorrect = (answer, correctAnswers) => answer === correctAnswers;

const calculateResult = (event) => {
  let score = 0;

  answerInputs.forEach((answerInput, index) => {
    const answer = event.target[answerInput].value;

    if (isAnswerCorrect(answer, correctAnswers[index])) {
      score++;
    }
  });
  let scorePercentage = (score / answerInputs.length) * 100;
  return [score, scorePercentage];
};

const transformTitleButton = (scorePercentage, score) => {
  titleButton.style.display = "block";
  titleButton.textContent = `Você obteve ${scorePercentage}%, acertando ${score} de ${answerInputs.length} questões.`;
  titleButton.disabled = true;
  titleButton.style.cursor = "not-allowed";
};

const paragraph = document.createElement("p");

const handleQuizPerformanceFeedback = (scorePercentage, score) => {
  switch (scorePercentage) {
    case 100:
      paragraph.textContent = `Você alcançou um desempenho incrível com ${scorePercentage}% de acertos, 
      acertando ${score} de ${answerInputs.length} questões. Você é um verdadeiro campeão! Continue assim!`;
      break;
    case 80:
      paragraph.textContent = `Você alcançou um desempenho muito bom com ${scorePercentage}% de acertos, 
      acertando ${score} de ${answerInputs.length} questões. Continue assim!`;
      break;
    case 60:
      paragraph.textContent = `Você obteve um bom resultado com ${scorePercentage}% de acertos, 
      acertando ${score} de ${answerInputs.length} questões. Mantenha o bom trabalho e você alcançará resultados ainda melhores em breve!`;
      break;
    case 40:
      paragraph.textContent = `Parabéns por se esforçar! Você obteve ${scorePercentage}% de acertos, 
      acertando ${score} de ${answerInputs.length} questões. Não se preocupe, continue praticando e você verá seu desempenho melhorar a cada dia.`;
      break;
    default:
      paragraph.textContent = `Ops! Você não obteve um resultado satisfatório.Não se preocupe, c
      ontinue praticando e você verá seu desempenho melhorar a cada dia.`;
  }

  paragraph.style.textAlign = "center";
  titlePopupScore.insertAdjacentElement("afterend", paragraph);
};

const handleVisibleElement = (element) => element.classList.toggle("hidden");

const markCorrectAnswers = () => {
  handleVisibleElement(popupEndQuiz);
  handleVisibleElement(refreshButton);
  handleVisibleElement(sendAnswersButton);
  window.scrollTo(0, 0);

  answerInputs.forEach((answerInput, index) => {
    let selectorInputChecked = `input[name='${answerInput}']:checked`;
    const answer = document.querySelector(selectorInputChecked);
    const isAnswerCorrect = answer.value === correctAnswers[index];
    const label = answer.closest("label");

    if (isAnswerCorrect) {
      markAnswerAsCorrect(label);
      return;
    }
    markAnswerAsIncorrect(label);

    highlightCorrectAnswer(answerInput, correctAnswers, index);
  });
};
const markAnswerAsCorrect = (label) => {
  label.classList.add("success");
  label.textContent += `✔`;
};

const markAnswerAsIncorrect = (label) => {
  label.classList.add("failed");
  label.textContent += `❌`;
};

const highlightCorrectAnswer = (answerInput, correctAnswers, index) => {
  const selectorIdentifyCorrectOption = `input[name='${answerInput}'][value='${correctAnswers[index]}']`;
  const correctAnswerElement = document.querySelector(
    selectorIdentifyCorrectOption
  );
  if (correctAnswerElement) {
    const correctLabel = correctAnswerElement.closest("label");
    correctLabel.classList.add("feedback");
  }
};

startQuizButton.addEventListener("click", showQuiz);
quizFormElement.addEventListener("submit", handleSubmitForm);
sendAnswersButton.addEventListener("click", () =>
  handleVisibleElement(popupEndQuiz)
);
checkAnswersButton.addEventListener("click", markCorrectAnswers);
closeScoreQuizButton.addEventListener("click", () => window.location.reload());
refreshButton.addEventListener("click", () => window.location.reload());
