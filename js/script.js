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

modalWork("#head_info","#modal_wrapper","#close")
modalWork("#head_word","#words","#close_words")
modalWork("#doc","#recomends","#close_recomends")
