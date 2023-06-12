//функция для работы с модальным окном
function modalWork(btnName, modalName, closeName) {
    // функция для закрытия модального окна
    function closeModalWindow(wrapper) {
        wrapper.style.display = 'none';
    }
    // ищем модальное окно на странице
    let modal = document.querySelector(modalName);

    // присваеваем всем указанным кнопкам событие - показ модальное окна
    document.querySelectorAll(btnName).forEach(item => item.addEventListener("click", (e) => {
        modal.style.display = 'block'
    }))
    // присваеваем всем указанным кнопкам событие - скрытие модальное окна
    document.querySelector(closeName).addEventListener('click', () => {
        closeModalWindow(modal);
    })
    // присваеваем "вуали"(затемнению) модального окна событие - скрытие модального окна
    modal.addEventListener('click', (e) => {
        if (e.target == e.currentTarget)
            closeModalWindow(modal);
    })
    // скрытие модального окна при нажатии на клавишу Esc
    document.addEventListener('keydown', (e) => {
        if (e.code == 'Escape') closeModalWindow(modal);
    })
}

// вызываем функцию для работы с модальным окном
modalWork("#doc", "#modal_wrapper", "#close")

// Создаем массив объектов с вопросами и правильным ответом
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


// создаем контейнеры
document.querySelector(".tasks").insertAdjacentHTML("beforeend", `<div class="allTasks"></div>`)
document.querySelector(".allTasks").insertAdjacentHTML("beforeend", `<div class="questions"></div>`)
document.querySelector(".allTasks").insertAdjacentHTML("beforeend", `<div class="answers"></div>`)

// создаем вопросы 
allQuestions.forEach(que => {
    for (let i = 0; i < questions.length; i++) {
        // ищем индекс вопроса и записываем его в атрибут data-target вопроса
        if (questions[i].question == que) {
            document.querySelector(".questions").insertAdjacentHTML("beforeend", `<div class="question"><label>${que}</label><div class="place" data-target='${i}' ></div></div>`)
        }
    }
});

// создаем ответы
allAnswers.forEach(ans => {
    for (let i = 0; i < questions.length; i++) {
        // ищем индекс ответа и записываем его в атрибут data-target ответа
        if (questions[i].answer == ans) {
            document.querySelector(".answers").insertAdjacentHTML("beforeend", `<div class="home" ><div class="answer" draggable='true' data-target='${i}'><label>${ans}</label></div></div>`)
        }
    }
});

let dragItems = document.querySelectorAll(".answer");//ответы, которые перетаскиваем
let mainBoxes = document.querySelectorAll(".place")//области воспросов
let homes = document.querySelectorAll(".home")//области где изначально находились ответы
let currentBoxes = [];
let item;

// присваиваем ответам нужные для перетаскивания события
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
homes.forEach(home => {
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
}

//уход с области перетаскивания
function dragleave(e) {
    e.preventDefault();
}

//сброс в область вопроса
function dragdrop(e) {
    // если в области еще ничего нет
    if (e.currentTarget.children.length == 0) {
        // то добавляем перетаскиваемый объект туда
        e.currentTarget.prepend(item);
        // увеличиваем счетчик отвеченных вопросов
        currentQuestion++
    }

    // если ответ правильный то увеличиваем счетчик правильных ответом
    if (done(e.currentTarget.firstChild.dataset.target) == e.currentTarget) {
        correctAnswers++
    };
}

// функция позволяющая скинуть перетаскиваемый объект во все области, если они пустые
function draghomedrop(e) {
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