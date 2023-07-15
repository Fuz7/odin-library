let navbar = document.getElementById('nav')
let sidebar = document.getElementById('info')
let mainContainer = document.getElementById('mainContainer')
let cardContainer = document.getElementById('cardContainer')

let form = document.getElementById('form')
let editForm = document.getElementById('editForm')
let submitButton = document.getElementById('menuAdd')

let titleInput = document.getElementById('addTitle')
let authorInput = document.getElementById('addAuthor')
let totalPage = document.getElementById('totalPage')
let currentPage = document.getElementById('addCurrent')

let editCompletedLog = document.getElementById('editCompletedLog')
let editTitleInput = document.getElementById('editTitle') 
let editAuthorInput = document.getElementById('editAuthor')
let editTotalPage = document.getElementById('editPage') 
let editCurrentPage = document.getElementById('editCurrent')

let completedLog = document.getElementById('completedLog')
let menuContainer = document.getElementById('addContainer')
let menuButton = document.getElementById('addButton')
let cancelButton = document.getElementById('menuCancel')
let editCancelButton = document.getElementById('editMenuCancel')

let minusButtons = document.getElementsByClassName('minusButton')
let plusButtons = document.getElementsByClassName('plusButton')
let readButtons = document.getElementsByClassName('readButton')
let deleteButtons = document.getElementsByClassName('deleteCard')
let editButtons = document.getElementsByClassName('editButton')

let confirmDeleteButton = document.getElementById('deleteButton')
let deleteContainer = document.getElementById('deleteContainer')
let editContainer = document.getElementById('editContainer')

minusButtons = Array.from(minusButtons)
plusButtons = Array.from(plusButtons)
readButtons = Array.from(readButtons)
deleteButtons = Array.from(deleteButtons)
editButtons = Array.from(editButtons)

let book1 = new Book("Atomic Habits","James Clear",242,10, 1)
addToLibrary(book1)
let book2 = new Book("Can't Hurt Me","David Goggins",230, 132, 2)
addToLibrary(book2)

let card = document.getElementsByClassName('card')
card = Array.from(card)
let bookIndex = Number((card[card.length - 1]).getAttribute('data-book')) +  1
let cardId;
let currentBookIndex;

let myLibraryStorage = [];
myLibraryStorage.push(book1)
myLibraryStorage.push(book2)



// Menu authentication // -->

totalPage.addEventListener('input', function(){
    toggleLog()
})


currentPage.addEventListener('input', function(){
    toggleLog()
})

editTotalPage.addEventListener('input', function(){
    editToggleLog()
})

editCurrentPage.addEventListener('input',function(){
    editToggleLog()
})

function editToggleLog(){
    if (editTotalPage.valueAsNumber < editCurrentPage.valueAsNumber){
        editCompletedLog.classList.add('invalid')
    } else if(editTotalPage.valueAsNumber >= editCurrentPage.valueAsNumber){
        editCompletedLog.classList.remove('invalid')
        editCurrentPage.setCustomValidity('')
    }
}

function toggleLog(){
    if (totalPage.valueAsNumber < currentPage.valueAsNumber){
        completedLog.classList.add('invalid')
    } else if(totalPage.valueAsNumber >= currentPage.valueAsNumber){
        completedLog.classList.remove('invalid')
        currentPage.setCustomValidity('')
    }
}

submitButton.addEventListener('click', function(e) {
    e.preventDefault()
    if(form.checkValidity() && (!completedLog.classList.contains('invalid')) ){

        let newBook = new Book(titleInput.value,authorInput.value,
            totalPage.valueAsNumber,currentPage.valueAsNumber,bookIndex)
        addToLibrary(newBook)
        myLibraryStorage.push(newBook)
        bookIndex++
        closeMenu()
        emptyAddInput()

    } else if(completedLog.classList.contains('invalid')){
        currentPage.setCustomValidity('Completed page is higher than total page')
        form.reportValidity()
    } else{
        form.reportValidity()
    }
})



function emptyAddInput(){
    titleInput.value = "";
    authorInput.value = "";
    totalPage.value = "";
    currentPage.value= ""
}

// Menu authenthication // <--


// Menu Opening & Closing // -->

function closeMenu(){
    menuContainer.classList.remove('active')
    emptyAddInput()
}

function openMenu(){
    menuContainer.classList.add('active')
}

menuButton.addEventListener('click', () => openMenu())

cancelButton.addEventListener('click', () => closeMenu())


// Menu Opening & Closing // <--

// Creating Book // -->


function Book(title, author, totalPage, currentPage, bookIndex){
    this.title = title;
    this.author = author;
    this.totalPage = totalPage;
    this.currentPage = currentPage;
    this.bookIndex = bookIndex;
}


function addToLibrary(newBook){
    let div = document.createElement('div') 
    div.setAttribute('class', 'card')
    div.setAttribute('data-book', newBook.bookIndex)
    div.setAttribute('id', 'card' + newBook.bookIndex)

    // for the cards layout
    let deleteButton = document.createElement('button')
    deleteButton.setAttribute('class', 'deleteCard')
    deleteButton.setAttribute('data-book', newBook.bookIndex)
    deleteButton.innerHTML = 'Delete'
    div.append(deleteButton)


    let cardContent = document.createElement('div')
    cardContent.setAttribute('class', 'cardContent')

    let titleContent = document.createElement('div')
    titleContent.setAttribute('class', 'titleContent')
    titleContent.innerHTML = newBook.title
    let authorContent = document.createElement('div')
    authorContent.setAttribute('class', 'authorContent')
    authorContent.innerHTML = newBook.author
    cardContent.append(titleContent)
    cardContent.append(authorContent)

    div.append(cardContent)


    let minusButton = document.createElement('button')
    minusButton.setAttribute('class', 'minusButton')
    minusButton.setAttribute('data-book', newBook.bookIndex)
    minusButton.innerHTML = "-"
    let plusButton = document.createElement('button')
    plusButton.setAttribute('class', 'plusButton')
    plusButton.setAttribute('data-book', newBook.bookIndex)
    plusButton.innerHTML = "+"
    let readButton = document.createElement('button')
    readButton.setAttribute('class', 'readButton')
    readButton.setAttribute('data-book', newBook.bookIndex)
    readButton.innerHTML = "Mark as Read"
    div.append(minusButton)
    div.append(plusButton)
    div.append(readButton)
    
    
    let pageContent = document.createElement('div')
    pageContent.setAttribute('class', 'pageContent')
    pageContent.setAttribute('data-book', newBook.bookIndex)
    
    let currentMarker = document.createElement('div')
    currentMarker.setAttribute('class', 'currentMarker' )
    currentMarker.innerHTML = newBook.currentPage
    let separator = document.createElement('div')
    separator.innerHTML = "|"
    let totalMarker = document.createElement('div')
    totalMarker.setAttribute('class', 'totalMarker')
    totalMarker.innerHTML = newBook.totalPage
    pageContent.append(currentMarker)
    pageContent.append(separator)
    pageContent.append(totalMarker) 

    div.append(pageContent)


    let editButton = document.createElement('button')
    editButton.setAttribute('class', 'editButton')
    editButton.setAttribute('data-book', newBook.bookIndex)
    editButton.innerHTML = "Edit"
    div.append(editButton)

    removeMinusButtonListeners();
    removePlusButtonListeners();
    removeMarkAsReadListeners()
    removeDeleteButtonListeners()
    removeEditButtonListeners()

    cardContainer.append(div)

    minusButtons = document.getElementsByClassName('minusButton')
    plusButtons = document.getElementsByClassName('plusButton')
    readButtons = document.getElementsByClassName('readButton')
    deleteButtons = document.getElementsByClassName('deleteCard')
    editButton = document.getElementsByClassName('editButton')
    minusButtons = Array.from(minusButtons)
    plusButtons = Array.from(plusButtons)
    readButtons = Array.from(readButtons)
    deleteButtons = Array.from(deleteButtons)
    editButtons = Array.from(editButton)

    minusButtons.forEach(item => {
        item.addEventListener('click', handleMinusButtonClick);
    })
    
    plusButtons.forEach(item =>{
        item.addEventListener('click', handlePlusButtonClick)    
    })

    readButtons.forEach(item =>{
        item.addEventListener('click', handleMarkAsReadButtonClick)
    })
    
    deleteButtons.forEach(item =>{
        item.addEventListener('click', handleDeleteButtonClick)
    })

    editButtons.forEach(item =>{
        item.addEventListener('click', handleEditButtonClick)
    })

    if (newBook.currentPage === newBook.totalPage){
        cardContent.classList.add('read')
    }

}


minusButtons.forEach(item => {
    item.addEventListener('click', handleMinusButtonClick);
})
    
plusButtons.forEach(item =>{
    item.addEventListener('click', handlePlusButtonClick)    
})

readButtons.forEach(item =>{
    item.addEventListener('click', handleMarkAsReadButtonClick)
})

deleteButtons.forEach(item =>{
    item.addEventListener('click', handleDeleteButtonClick)
})

editButtons.forEach(item =>{
    item.addEventListener('click', handleEditButtonClick)
})

// Creating Book // <--

// Edit Card Content // -->



function removeMinusButtonListeners() {
  minusButtons.forEach(item => {
    item.removeEventListener('click', handleMinusButtonClick);
  });
}

function handleMinusButtonClick() {
    cardContent = this.previousElementSibling;

    plusButton = this.nextElementSibling;
    readButton = plusButton.nextElementSibling;
    pageContent = readButton.nextElementSibling;
    currentMarker = pageContent.children[0];
    currentMarkerValue = parseInt(currentMarker.innerHTML);
    totalMarker = pageContent.children[0];
    totalMarkerValue = parseInt(totalMarker.innerHTML)

    if (currentMarkerValue > 0) {
        currentMarkerValue--;
        currentMarker.innerHTML = currentMarkerValue;
        updateBook(this.getAttribute('data-book'), "currentPage", currentMarkerValue);
    }

    toggleCard(currentMarkerValue, totalMarkerValue, cardContent)


}



function removePlusButtonListeners(){
    plusButtons.forEach(item => {
        item.removeEventListener('click', handlePlusButtonClick)
    })
}

function handlePlusButtonClick(){
    minusButton = this.previousElementSibling;
    cardContent = minusButton.previousElementSibling

    readButton = this.nextElementSibling
    pageContent = readButton.nextElementSibling
    currentMarker = pageContent.children[0]
    totalMarker = pageContent.children[2]
    currentMarkerValue = parseInt(currentMarker.innerHTML)
    totalMarkerValue = parseInt(totalMarker.innerHTML)
    
    if (currentMarkerValue < totalMarkerValue){
        currentMarkerValue++
        currentMarker.innerHTML = currentMarkerValue
        updateBook(this.getAttribute('data-book'), "currentPage", currentMarkerValue)
    }


    toggleCard(currentMarkerValue, totalMarkerValue, cardContent)

}

function updateBook(bookIndex, valueType, valueToChange){
    myLibraryStorage = myLibraryStorage.map(item => {
        if (item.bookIndex === parseInt(bookIndex)){
            item[valueType] = valueToChange
            return item
        }else{
            return item;
        }
    })
}


function toggleCard(currentMarkerValue,totalMarkerValue,cardContent){
    if (currentMarkerValue === totalMarkerValue){
        cardContent.classList.add('read')
    }else{
        cardContent.classList.remove('read')
    }
}

function removeMarkAsReadListeners(){
    readButtons.forEach(item => {
        item.removeEventListener('click', handleMarkAsReadButtonClick)
    });
}

function handleMarkAsReadButtonClick(){
    plusButton = this.previousElementSibling
    minusButton = plusButton.previousElementSibling;
    cardContent = minusButton.previousElementSibling;

    pageContent = this.nextElementSibling;
    currentMarker = pageContent.children[0]
    currentMarkerValue = parseInt(currentMarker.innerHTML)
    totalMarker = pageContent.children[2]
    totalMarkerValue = parseInt(totalMarker.innerHTML)

    currentMarkerValue = totalMarkerValue;
    currentMarker.innerHTML = totalMarkerValue;

    updateBook(this.getAttribute('data-book'), "currentPage", currentMarkerValue)

    cardContent.classList.add('read')
}

function removeDeleteButtonListeners(){
    deleteButtons.forEach(item =>{
        item.removeEventListener('click', handleDeleteButtonClick)
    })
}

function handleDeleteButtonClick(){
    let card = this.parentElement
    let cardContainer = card.parentElement;
    let mainContainer = cardContainer.parentElement;
    let addContainer = mainContainer.nextElementSibling;
    let deleteContainer = addContainer.nextElementSibling;

    deleteContainer.classList.add('active')

    cardId  = "card" + this.getAttribute('data-book')
}


cancelButton = document.getElementsByClassName('cancelButton')[0]
cancelButton.addEventListener('click', function(){

    let deleteConfirmation = this.parentElement;
    let deleteMenu = deleteConfirmation.parentElement;
    let deleteContainer  = deleteMenu.parentElement;

    deleteContainer.classList.remove('active')
})

confirmDeleteButton.addEventListener('click', function(){
    deleteCard(cardId)
})

function deleteCard(cardId){
    let card = document.getElementById(cardId)
    let cardNum = parseInt(cardId.slice(4))
    if (card !== null){
        for (let i = 0;i < myLibraryStorage.length;i++){
            if (myLibraryStorage[i].bookIndex === cardNum){
                myLibraryStorage.splice(i,1)
            }
        }

        card.remove()
        deleteContainer.classList.remove('active')
    }
}

function removeEditButtonListeners(){
    editButtons.forEach(item =>{
        item.removeEventListener('click', handleEditButtonClick)
    })
}

function handleEditButtonClick(){
    let myOutput = myLibraryStorage.find(item => item.bookIndex == this.getAttribute('data-book'))
    editTitleInput.value = myOutput.title
    editAuthorInput.value = myOutput.author
    editTotalPage.value = myOutput.totalPage
    editCurrentPage.value = myOutput.currentPage
    editContainer.classList.add('active')

    cardId = "card" + this.getAttribute("data-book")
    currentBookIndex = this.getAttribute('data-book')

}

function emptyEditInput(){
    editTitleInput.value = ""
    editAuthorInput.value = ""
    editTotalPage.value = ""
    editCurrentPage.value = ""
}

editCancelButton.addEventListener('click', function(){
    editContainer.classList.remove('active')
    emptyEditInput()
})

let editConfirmButton = document.getElementById('editMenuAdd')

editConfirmButton.addEventListener("click", ()=>{
    
    if(editForm.checkValidity() && (!editCompletedLog.classList.contains('invalid')) ){
        updateCardContent(cardId)
        updateBook(currentBookIndex, "title", editTitleInput.value)
        updateBook(currentBookIndex, "author", editAuthorInput.value)
        updateBook(currentBookIndex, "currentPage", parseInt(editCurrentPage.value))
        updateBook(currentBookIndex, "totalPage", parseInt(editTotalPage.value))
        editContainer.classList.remove('active')

        
        emptyEditInput()
        
    } else if(editCompletedLog.classList.contains('invalid')){
        editCurrentPage.setCustomValidity('Completed page is higher than total page')
        editForm.reportValidity()
    } else{
        editForm.reportValidity()
    }
    
})

function updateCardContent(cardId){
    let card = document.getElementById(cardId)
    let cardContent = card.children[1]
    let titleContent = cardContent.children[0]
    let authorContent = cardContent.children[1]
    titleContent.innerHTML = editTitleInput.value
    authorContent.innerHTML = editAuthorInput.value
    let pageContent = card.children[5]
    let currentMarker = pageContent.children[0]
    let totalMarker = pageContent.children[2]
    currentMarker.innerHTML = editCurrentPage.value
    totalMarker.innerHTML = editTotalPage.value
    if (editCurrentPage.valueAsNumber === editTotalPage.valueAsNumber){
        cardContent.classList.add('read')
    }else{
        cardContent.classList.remove('read')
    }
}   