// //работа с модальным окном
// function modalWork(btnName, modalName, closeName) {
//   function closeModalWindow(wrapper) {
//       wrapper.style.display = 'none';
//   }
//   let modal = document.querySelector(modalName);

//   document.querySelectorAll(btnName).forEach(item => item.addEventListener("click", (e) => {
//       modal.style.display = 'block'
//   }))
//   document.querySelector(closeName).addEventListener('click', () => {
//       closeModalWindow(modal);
//   })
//   modal.addEventListener('click', (e) => {
//       if (e.target == e.currentTarget)
//           closeModalWindow(modal);
//   })
//   document.addEventListener('keydown', (e) => {
//       if (e.code == 'Escape') closeModalWindow(modal);
//   })
// }

// modalWork("#doc","#recomends","#close_recomends")

// Создаем массив объектов с вопросами и вариантами ответов
const questions = [
  {
    question: "Выберите все простые числа:",
    answers: ["2", "3", "4", "5", "6", "7", "8", "9"],
    correctAnswers: ["2", "3", "5", "7"]
  },
  {
    question: "Выберите все кратные 3 числа:",
    answers: ["2", "3", "4", "5", "6", "7", "8", "9"],
    correctAnswers: ["3", "6", "9"]
  },
  {
    question: "Выберите все квадраты чисел:",
    answers: ["1", "3", "4", "6", "7", "8", "9"],
    correctAnswers: ["1", "4", "9"]
  }
];

// Создаем переменные для отслеживания количества правильных ответов и текущего вопроса
let score = 0;
let currentQuestion = 0;

// Функция для отображения следующего вопроса
function showNextQuestion() {
  // Получаем элементы DOM для вопроса и ответов
  const questionElement = document.getElementById("title");
  const answersElement = document.getElementById("tasks");

  // Проверяем, есть ли еще вопросы
  if (currentQuestion < questions.length) {
    // Отображаем текущий вопрос
    questionElement.textContent = questions[currentQuestion].question;

    // Создаем HTML-разметку для вариантов ответов
    let answersHTML = "";
    for (let i = 0; i < questions[currentQuestion].answers.length; i++) {
      answersHTML += `<div ><label><input type="checkbox" name="answer" value="${questions[currentQuestion].answers[i]}"> ${questions[currentQuestion].answers[i]}</label></div>`;
    }

    // Вставляем HTML-разметку в элемент DOM
    answersElement.innerHTML = answersHTML;

    // Увеличиваем счетчик текущего вопроса
    document.getElementById("number_task").textContent = `${currentQuestion + 1}/${questions.length}`
    console.log(`${currentQuestion + 1}/${questions.length}`);
    currentQuestion++;
  } else {
    // Если вопросы закончились, отображаем результаты
    const percentage = (score / questions.length) * 100;
    questionElement.textContent = `Вы ответили правильно на ${score} из ${questions.length} вопросов (${percentage}%).`;
    answersElement.style.display = "none";
    document.querySelector(".moves").style.display = "none";
  }
}

// Функция для проверки ответа
function checkAnswer() {
  // Получаем элементы DOM для ответов
  const answerElements = document.querySelectorAll('input[name="answer"]:checked');

  // Создаем массив из ответов пользователя
  const userAnswers = [];
  for (let i = 0; i < answerElements.length; i++) {
    userAnswers.push(answerElements[i].value);
  }

  // Получаем правильные ответы на текущий вопрос
  const correctAnswers = questions[currentQuestion - 1].correctAnswers;

  // Проверяем, правильны ли ответы
  if (userAnswers.length === correctAnswers.length && userAnswers.every(answer => correctAnswers.includes(answer))) {
    // Если ответы правильные, увеличиваем счетчик правильных ответов

    score++;
    console.log(score);
  }

  // Отображаем следующий вопрос
  showNextQuestion();
}

// Назначаем обработчик события для кнопки "Ответить"
const answerButton = document.getElementById("next");
answerButton.addEventListener("click", checkAnswer);

// Отображаем первый вопрос
showNextQuestion();