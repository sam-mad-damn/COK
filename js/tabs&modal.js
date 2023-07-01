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

// работа с кнопками вкладок
function tabsBthWork(btnTag) {
    document.querySelectorAll("." + btnTag).forEach(button => {
        button.addEventListener("click", (e) => {
            // перебираем все вкладки
            document.querySelectorAll(".tab-body__item").forEach(tab => {
                // выключаем все включенные вкладки
                if (tab.classList.contains("active")) {
                    tab.classList.remove("active")
                }
                // включаем нужную вкладку
                if (button.dataset.target == tab.id) {
                    tab.classList.add("active")
                }
            })
            // переносим скролл всех вкладок на верх страницы
            window.scrollTo(0, 0)
            document.querySelectorAll(".main").forEach(item => {
                item.scrollTo(0, 0)
            })
        })
    })
}
// вызываем функцию для переключения вкладок для кнопок "далее" и "назад"
tabsBthWork("next");
tabsBthWork("previos");
tabsBthWork("icon_navigation");

