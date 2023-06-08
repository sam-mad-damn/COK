// Создаем массив объектов с вопросами, вариантами ответов и правильным ответом
const questions = [
    {
        question: "Сколько дней в неделе?",
        answer: "7"
    },
    {
        question: "5 * 5 = ?",
        answer: "25"
    },
    {
        question: "Сколько часов в сутках?",
        answer: "24"
    }
];

// Создаем переменную для хранения количества правильных ответов
let correctAnswers = 0;
let currentQuestion = 0;

// Увеличиваем счетчик текущего вопроса
document.getElementById("number_task").textContent = `1`;

// создаем массив с вопросами
const allQuestions = []
questions.forEach(que => {
    allQuestions.push(que.question)
})
// перемешиваем его в рандомном порядке
allQuestions.sort(() => Math.random() - 0.5)

// создаем массив с ответами
const allAnswers = []
questions.forEach(que => {
    allAnswers.push(que.answer)
})
// перемешиваем его в рандомном порядке
allAnswers.sort(() => Math.random() - 0.5)

// // Проверяем ответ пользователя
// if (userAnswer === questions[i].answer) {
//     correctAnswers++;
// }

// создаем контейнеры
document.querySelector(".tasks").insertAdjacentHTML("beforeend", `<div class="allTasks"></div>`)
document.querySelector(".allTasks").insertAdjacentHTML("beforeend", `<div class="questions"></div>`)
document.querySelector(".allTasks").insertAdjacentHTML("beforeend", `<div class="answers"></div>`)

// создаем вопросы 
allQuestions.forEach(que => {
    for (let i = 0; i < questions.length; i++) {
        // ищем индекс вопроса и записываем его в data-target
        if (questions[i].question == que) {
            document.querySelector(".questions").insertAdjacentHTML("beforeend", `<div class="question"><label>${que}</label><div class="place" data-target='${i}' ></div></div>`)
        }
    }
});

// создаем ответы
allAnswers.forEach(ans => {
    for (let i = 0; i < questions.length; i++) {
        // ищем индекс ответа и записываем его в data-target
        if (questions[i].answer == ans) {
            document.querySelector(".answers").insertAdjacentHTML("beforeend", `<div class="home" ><div class="answer" draggable='true' data-target='${i}'><label>${ans}</label></div></div>`)
        }
    }
});

let dragItems = document.querySelectorAll(".answer");//ответы, которые перетаскиваем
let mainBoxes = document.querySelectorAll(".place")//области воспросов
let homes=document.querySelectorAll(".home")//области где изначально находились ответы
let currentBoxes = [];
let item;

dragItems.forEach((dragItem) => {
    dragItem.addEventListener("dragstart", dragstart);
});
mainBoxes.forEach(box => {
    currentBoxes.push(box)
    box.addEventListener("dragover", dragover);
    box.addEventListener("dragleave", dragleave);
    box.addEventListener("dragenter", dragenter);
    box.addEventListener("drop", dragdrop);
});
homes.forEach(home=>{
    home.addEventListener("dragover", dragover);
    home.addEventListener("dragleave", dragleave);
    home.addEventListener("dragenter", dragenter);
    home.addEventListener("drop", draghomedrop);
})
//начало перетаскивания
function dragstart(e) {
    item = e.target;
}

//разрешение на перетаскивание
function dragover(e) {
    e.preventDefault();
}

//попадание на область перетаскивания
function dragenter(e) {
    e.preventDefault();
    e.target.classList.add("drag-enter");

}

//уход с области перетаскивания
function dragleave(e) {
    e.preventDefault();
    e.target.classList.remove("drag-enter");
}

//сброс в область вопроса
function dragdrop(e) {
    e.currentTarget.classList.remove("drag-enter");
    if (e.currentTarget.children.length == 0) {
        e.currentTarget.prepend(item);
        currentQuestion++
    }

    if (done(e.currentTarget.firstChild.dataset.target) == e.currentTarget) {
        correctAnswers++
    };
}
function draghomedrop(e) {
    e.currentTarget.classList.remove("drag-enter");
    if (e.currentTarget.children.length == 0) {
        e.currentTarget.prepend(item);
    }
}

//функция для проверки правильности паззла
function done(childTarget) {
    return currentBoxes.find((item) => item.dataset.target == childTarget);
}

// Вычисляем процент правильных ответов и отображаем результат
function check() {
    if (currentQuestion == questions.length) {
        const result = (correctAnswers / questions.length) * 100;
        document.getElementById("title").textContent = `Вы ответили правильно на ${correctAnswers} из ${questions.length} вопросов (${result}%).`;
        document.querySelector(".tasks").innerHTML = ""
        document.querySelector(".moves").innerHTML = ""
    }

}

const answerButton = document.getElementById("next");
answerButton.addEventListener("click", check);