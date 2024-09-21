const myLibrary = [];
const mainContainer = document.querySelector(".main");
const addBookButton = document.querySelector(".add-book");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const closeDialog = document.querySelector(".close-dialog");
const submitDialog = document.querySelector(".submit-dialog");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");



addBookButton.addEventListener("click", () => {
    clearInputs();
    dialog.classList.add("dialog-flex");
    dialog.showModal();
});

closeDialog.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.classList.remove("dialog-flex");
    dialog.close();
});

submitDialog.addEventListener("click", () => {
    if (form.checkValidity()) {
        getBookInfo();
        dialog.classList.remove("dialog-flex");
        dialog.close();
    }
    else {
        form.reportValidity();
    }
});

mainContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-book"))  {
        let cardNode = event.target.parentNode.parentNode;
        let bookIndex = cardNode.getAttribute("data-index");
        deleteBook(cardNode, bookIndex);
    }

    if (event.target.classList.contains("toggle-read")) {
        let cardNode = event.target.parentNode.parentNode;
        let bookIndex = cardNode.getAttribute("data-index");
        let book = myLibrary[bookIndex];
        const readButton = cardNode.querySelector(".toggle-read"); 
        book.toggleReadStatus(readButton, cardNode);
    }
})

dialog.addEventListener("mousedown", (event) => {
    if (event.target === dialog) {
        dialog.classList.remove("dialog-flex");
        dialog.close();
    }
});

function Books (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Books.prototype.toggleReadStatus = function (button, card) {

    if (this.read === "Read") {
        this.read = "Not Read";
        button.textContent = this.read;
        button.classList.remove("read");
        button.classList.add("unread");
        card.style.borderLeft = "1rem solid #7c2d12";
    }
    else {
        this.read = "Read";
        button.textContent = this.read;
        button.classList.remove("unread");
        button.classList.add("read");
        card.style.borderLeft = "1rem solid rgb(36 149 42)";
    }
}


function getBookInfo () {
    let bookTitle = titleInput.value;
    let bookAuthor = authorInput.value;
    let bookPages = pagesInput.value;
    let readCheckbox = readInput.checked;
    if (readCheckbox) {
        readStatus = "Read";
    }
    else {
        readStatus = "Not Read";
    }
    createBook(bookTitle, bookAuthor, bookPages, readStatus);
}

function createBook (title, author, pages, read) {
    let book = new Books(title, author, pages, read);
    addBookToLibrary(book);
}

function clearInputs () {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readInput.checked = false;
}



function addBookToLibrary (book) {
    myLibrary.push(book);
    return loopArray(myLibrary);
}

function deleteBook (bookCard, datasetIndex) {
    myLibrary.splice(datasetIndex, 1);
    mainContainer.removeChild(bookCard);

}

function loopArray (array) {
    let allCards = document.querySelectorAll(".card");
    allCards.forEach(card => {
        card.remove();
    });
    array.forEach((book, index) => {
        displayBook(book, index);
    });
}


function displayBook(book, index) {
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.dataset.index = index;
    let textDiv = document.createElement("div");
    textDiv.classList.add("text");
    let bookTitle = document.createElement("h2");
    bookTitle.textContent = '"'+book.title+'"';
    bookTitle.classList.add("card-title");
    let bookAuthor = document.createElement("h3");
    bookAuthor.textContent = book.author;
    bookAuthor.classList.add("card-author");
    let bookPages = document.createElement("h3");
    bookPages.textContent = book.pages + " pages";
    let buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("card-buttons");
    let readToggle = document.createElement("button");
    readToggle.setAttribute("type", "button");
    readToggle.classList.add("toggle-read");
    readToggle.textContent = book.read;
    if (book.read === "Read") {
        readToggle.classList.add("read");
        cardDiv.style.borderLeft = "1rem solid rgb(36 149 42)";
    }
    else {
        readToggle.classList.add("unread");
        cardDiv.style.borderLeft = "1rem solid #7c2d12";
    }
    let removeButton = document.createElement("button");
    removeButton.setAttribute("type", "button");
    removeButton.classList.add("remove-book");
    removeButton.textContent = "Remove";
    mainContainer.appendChild(cardDiv);
    cardDiv.appendChild(textDiv);
    textDiv.append(bookTitle, bookAuthor, bookPages);
    buttonsDiv.append(readToggle, removeButton);
    cardDiv.appendChild(buttonsDiv);
}





