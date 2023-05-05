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
modalWork("#doc","#modal_wrapper","#close")

// для каждой кнопки далее присваиваем событие
document.querySelectorAll(".next").forEach(next => {
    next.addEventListener("click", (e) => {
        // перебираем все вкладки
       document.querySelectorAll(".tab-body__item").forEach(tab => {
        // выключаем все включенные вкладки
        if(tab.classList.contains("active")){
            tab.classList.remove("active")
        }
        // включаем следующую вкладку
        if(next.dataset.target==tab.id){
            tab.classList.add("active")
        }
        })
    })
})
// для каждой кнопки назад присваиваем событие
document.querySelectorAll(".previos").forEach(previos => {
    previos.addEventListener("click", (e) => {
        // перебираем все вкладки
       document.querySelectorAll(".tab-body__item").forEach(tab => {
        // выключаем все включенные вкладки
        if(tab.classList.contains("active")){
            tab.classList.remove("active")
        }
        // включаем предыдущую вкладку
        if(previos.dataset.target==tab.id){
            tab.classList.add("active")
        }
        })
    })
})