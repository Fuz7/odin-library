let navbar = document.getElementById('nav')
let sidebar = document.getElementById('info')
let mainContainer = document.getElementById('mainContainer')
let cardContainer = document.getElementById('cardContainer')

let form = document.getElementById('form')
let submitButton = document.getElementById('menuAdd')

let titleInput = document.getElementById('addTitle')
let authorInput = document.getElementById('addAuthor')
let totalPage = document.getElementById('totalPage')
let currentPage = document.getElementById('addCurrent')

let completedLog = document.getElementById('completedLog')
let menuContainer = document.getElementById('addContainer')
let menuButton = document.getElementById('addButton')
let cancelButton = document.getElementById('menuDelete')

let card = document.getElementsByClassName('card')
card = Array.from(card)
let bookIndex = Number((card[card.length - 1]).getAttribute('data-book')) +  1

// Menu authentication // -->

totalPage.addEventListener('input', function(){
    toggleLog()
})



currentPage.addEventListener('input', function(){
    toggleLog()
})

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
        bookIndex++
        closeMenu()

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

    // for the cards layout
    let deleteButton = document.createElement('button')
    deleteButton.setAttribute('class', 'deleteCard')
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
    minusButton.innerHTML = "-"
    let plusButton = document.createElement('button')
    plusButton.setAttribute('class', 'plusButton')
    plusButton.innerHTML = "+"
    let readButton = document.createElement('button')
    readButton.setAttribute('class', 'readButton')
    readButton.innerHTML = "Mark as Read"
    div.append(minusButton)
    div.append(plusButton)
    div.append(readButton)
    
    
    let pageContent = document.createElement('div')
    pageContent.setAttribute('class', 'pageContent')
    
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
    editButton.innerHTML = "Edit"
    div.append(editButton)


    cardContainer.append(div)


}

// Creating Book // <--