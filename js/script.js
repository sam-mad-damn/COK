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

// вызываем функцию для работы с модальным окном нужное количество раз(по кол-ву модальных окон на странице)
modalWork("#head_info","#modal_wrapper","#close")
modalWork("#head_word","#words","#close_words")
modalWork("#doc","#recomends","#close_recomends")

