// работа с модальным окном
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

// работа с кнопками вкладок
function tabsBthWork(btnTag) {
    document.querySelectorAll("."+btnTag).forEach(button => {
        button.addEventListener("click", (e) => {
            // перебираем все вкладки
           document.querySelectorAll(".tab-body__item").forEach(tab => {
            // выключаем все включенные вкладки
            if(tab.classList.contains("active")){
                tab.classList.remove("active")
            }
            // включаем следующую вкладку
            if(button.dataset.target==tab.id){
                tab.classList.add("active")
            }
            })
        })
    })
}

tabsBthWork("next");
tabsBthWork("previos");
