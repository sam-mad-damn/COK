//работа с модальным окном
function modalWork(btnName, modalName, closeName) {
    function closeModalWindow(wrapper) {
        wrapper.style.display = 'none';
    }
    let modal = document.querySelector(modalName);

    document.querySelectorAll(btnName).forEach(item => item.addEventListener("click", (e) => {
        modal.style.display = 'block'
    }))

    document.querySelector(closeName).addEventListener('click', () => {
        closeModalWindow(modal);
    })
    modal.addEventListener('click', (e) => {
        if (e.target == e.currentTarget)
            closeModalWindow(modal);
    })
    document.addEventListener('keydown', (e) => {
        if (e.code == 'Escape') closeModalWindow(modal);
    })
}

modalWork("#doc", "#modal_wrapper", "#close")
// Создаем массив объектов с вопросами и вариантами ответов
const questions = [
    {
        question: "2 + 2 = ?",
        answers: ["3", "4", "5", "6"],
        correctAnswer: "4"
    },
    {
        question: "Какой сейчас год?",
        answers: ["не знаю", "2008", "2012", "2023"],
        correctAnswer: "2023"
    },
    {
        question: "10 / 2 = ?",
        answers: ["2", "3", "4", "5"],
        correctAnswer: "5"
    }
];

// Создаем переменные для отслеживания количества правильных ответов и текущего вопроса
let correctAnswers = 0;
let currentQuestion = 0;

// Функция для отображения следующего вопроса
function showNextQuestion() {
    console.log(currentQuestion)
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
            answersHTML += `<div class="task"><input
                class="custom-radio"
                type="radio"
                name="answer"
                id="r${i}"
                value="${questions[currentQuestion].answers[i]}"><label for="r${i}">${questions[currentQuestion].answers[i]}</label></div>`;
        }

        // Вставляем HTML-разметку в элемент DOM
        answersElement.innerHTML = answersHTML;

        // Увеличиваем счетчик текущего вопроса
        document.getElementById("number_task").textContent = `${currentQuestion + 1}/${questions.length}`

        currentQuestion++;
    } else {
        // Если вопросы закончились, отображаем результаты
        const percentage = (correctAnswers / questions.length) * 100;
        questionElement.textContent = `Вы ответили правильно на ${correctAnswers} из ${questions.length} вопросов (${percentage}%).`;
        answersElement.style.display = "none";
        document.querySelector(".moves").style.display = "none";
    }
}
function showPreviosQuestion(currentQuestion) {

    const questionElement = document.getElementById("title");
    const answersElement = document.getElementById("tasks");
    // console.log(questions[currentQuestion].question);
    if (currentQuestion >= 0) {
        // Отображаем текущий вопрос
        questionElement.textContent = questions[currentQuestion].question;

        // Создаем HTML-разметку для вариантов ответов
        let answersHTML = "";
        for (let i = 0; i < questions[currentQuestion].answers.length; i++) {
            answersHTML += `<div class="task"><input
            class="custom-radio"
            type="radio"
            name="answer"
            id="r${i}"
            value="${questions[currentQuestion].answers[i]}"><label for="r${i}">${questions[currentQuestion].answers[i]}</label></div>`;
        }

        // Вставляем HTML-разметку в элемент DOM
        answersElement.innerHTML = answersHTML;

        // уменьшаем счетчик текущего вопроса
        document.getElementById("number_task").textContent = `${currentQuestion + 1}/${questions.length}`
    }
}

// Функция для проверки ответа
function checkAnswer() {
    console.log(currentQuestion)
    // Получаем элементы DOM для ответа
    const answerElement = document.querySelector('input[name="answer"]:checked');

    // Проверяем, выбран ли ответ
    if (answerElement) {
        // Получаем ответ пользователя
        const userAnswer = answerElement.value;

        // Получаем правильный ответ на текущий вопрос
        // console.log(questions[currentQuestion - 1]);
        const correctAnswer = questions[currentQuestion - 1].correctAnswer;

        // Проверяем, правильный ли ответ
        if (userAnswer === correctAnswer) {
            // Если ответ правильный, увеличиваем счетчик правильных ответов
            correctAnswers++;
        }

        // Отображаем следующий вопрос
        showNextQuestion();
    }
}

function back() {
    console.log(currentQuestion)
    if (currentQuestion > 1) {
        currentQuestion -= 2
        console.log(currentQuestion)
        showPreviosQuestion(currentQuestion)
    }
}

// Назначаем обработчик события для кнопки "Далее"
const nextButton = document.getElementById("next");
nextButton.addEventListener("click", checkAnswer);

// Назначаем обработчик события для кнопки "Назад"
// const previosButton = document.getElementById("previos");
// previosButton.addEventListener("click", back);

// Отображаем первый вопрос
showNextQuestion();