let form = document.getElementById('form')
let submitButton = document.getElementById('menuAdd')
let totalPage = document.getElementById('totalPage')
let completedPage = document.getElementById('addCompleted')
let completedLog = document.getElementById('completedLog')


// Menu authentication // -->

totalPage.addEventListener('input', function(){
    if (totalPage.valueAsNumber < completedPage.valueAsNumber){
        completedLog.classList.add('invalid')
    } else if(totalPage.valueAsNumber >= completedPage.valueAsNumber){
        completedLog.classList.remove('invalid')
        completedPage.setCustomValidity('')
    }
})



completedPage.addEventListener('input', function(){
    if (totalPage.valueAsNumber > completedPage.valueAsNumber){
        completedLog.classList.add('invalid')
    } else if(totalPage.valueAsNumber <= completedPage.valueAsNumber){
        completedLog.classList.remove('invalid')
        completedPage.setCustomValidity('')
    }
})

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