let navbar = document.getElementById('nav')
let sidebar = document.getElementById('info')
let mainContainer = document.getElementById('mainContainer')

let form = document.getElementById('form')
let submitButton = document.getElementById('menuAdd')
let totalPage = document.getElementById('totalPage')
let completedPage = document.getElementById('addCompleted')
let completedLog = document.getElementById('completedLog')
let menuContainer = document.getElementById('addContainer')
let menuButton = document.getElementById('addButton')
let cancelButton = document.getElementById('menuDelete')


// Menu authentication // -->

totalPage.addEventListener('input', function(){
    toggleLog()
})



completedPage.addEventListener('input', function(){
    toggleLog()
})

function toggleLog(){
    if (totalPage.valueAsNumber > completedPage.valueAsNumber){
        completedLog.classList.add('invalid')
    } else if(totalPage.valueAsNumber <= completedPage.valueAsNumber){
        completedLog.classList.remove('invalid')
        completedPage.setCustomValidity('')
    }
}

submitButton.addEventListener('click', function(e) {
    e.preventDefault()
    if(form.checkValidity() && (!completedLog.classList.contains('invalid')) ){
        form.submit()
    } else if(completedLog.classList.contains('invalid')){
        completedPage.setCustomValidity('Completed page is higher than total page')
        form.reportValidity()
    } else{
        form.reportValidity()
    }
})

// Menu authenthication // <--


// Menu Opening & Closing // -->

function closeMenu(){
    menuContainer.classList.remove('active')
}

function openMenu(){
    menuContainer.classList.add('active')
}

menuButton.addEventListener('click', () => openMenu())

cancelButton.addEventListener('click', () => closeMenu())

// Menu Opening & Closing // <--