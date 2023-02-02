const quizFormElement = document.querySelector(".quiz-form");
const startQuizButton = document.querySelector("#startedQuiz");
const popupEndQuiz = document.querySelector(".popup-end-quiz");
const closeScoreQuizButton = document.querySelector(".btn-close-popup-score");
const titlePopupScore = document.querySelector(".title-popup-score");
const sendAnswersButton = document.querySelector("#btnEndQuiz");

const correctAnswers = ["A", "A", "A", "B", "A"];
const answerInputs = [
  "inputQuestion1",
  "inputQuestion2",
  "inputQuestion3",
  "inputQuestion4",
  "inputQuestion5",
];

const showQuiz = () => (quizFormElement.style.display = "block");

const showResults = () => (popupEndQuiz.style.display = "flex");

const handleSubmitForm = (event) => {
  event.preventDefault();

  const [score, scorePercentage] = calculateResult(event);

  handleFeedbackPerformanceQuiz(scorePercentage, score, answerInputs);
};

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

const handleFeedbackPerformanceQuiz = (scorePercentage, score) => {
  const excelentResult = `Você alcançou um desempenho incrível com ${scorePercentage}% de acertos, acertando ${score} de ${answerInputs.length} questões. Você é um verdadeiro campeão! Continue assim!`;
  const greatResult = `Você alcançou um desempenho muito bom com ${scorePercentage}% de acertos, acertando ${score} de ${answerInputs.length} questões. Continue assim!`;
  const goodResult = `Você obteve um bom resultado com ${scorePercentage}% de acertos, acertando ${score} de ${answerInputs.length} questões. Mantenha o bom trabalho e você alcançará resultados ainda melhores em breve!`;
  const poorResult = `Parabéns por se esforçar! Você obteve ${scorePercentage}% de acertos, acertando ${score} de ${answerInputs.length} questões. Não se preocupe, continue praticando e você verá seu desempenho melhorar a cada dia.`;
  const noShowResult = `Ops! Você não obteve um resultado satisfatório.Não se preocupe, continue praticando e você verá seu desempenho melhorar a cada dia.`;

  const paragraph = document.createElement("p");

  switch (scorePercentage) {
    case 100:
      paragraph.textContent = excelentResult;
      break;
    case 80:
      paragraph.textContent = greatResult;
      break;
    case 60:
      paragraph.textContent = goodResult;
      break;
    case 40:
      paragraph.textContent = poorResult;
      break;
    default:
      paragraph.textContent = noShowResult;
  }

  paragraph.style.textAlign = "center";
  titlePopupScore.insertAdjacentElement("afterend", paragraph);
};

const isAnswerCorrect = (answer, correctAnswers) => answer === correctAnswers;

startQuizButton.addEventListener("click", showQuiz);
quizFormElement.addEventListener("submit", handleSubmitForm);
sendAnswersButton.addEventListener("click", showResults);
closeScoreQuizButton.addEventListener("click", () => window.location.reload());
