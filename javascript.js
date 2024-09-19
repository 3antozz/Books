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
        const readHeader = cardNode.querySelector(".text > h3:last-of-type"); 
        book.toggleReadStatus(readHeader);
    }
})

function Books (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Books.prototype.toggleReadStatus = function (header) {

    if (this.read === "Read") {
        this.read = "Not Read";
        header.textContent = this.read;
        header.classList.remove("read");
        header.classList.add("unread");
    }
    else {
        this.read = "Read";
        header.textContent = this.read;
        header.classList.remove("unread");
        header.classList.add("read");
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
    bookTitle.textContent = book.title;
    let bookAuthor = document.createElement("h3");
    bookAuthor.textContent = book.author;
    let bookPages = document.createElement("h3");
    bookPages.textContent = book.pages;
    let bookRead = document.createElement("h3");
    bookRead.textContent = book.read;
    if (book.read === "Read") {
        bookRead.classList.add("read");
    }
    else {
        bookRead.classList.add("unread");
    }
    let buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("card-buttons");
    let readToggle = document.createElement("button");
    readToggle.setAttribute("type", "button");
    readToggle.classList.add("toggle-read");
    readToggle.textContent = "Toggle Read";
    let removeButton = document.createElement("button");
    removeButton.setAttribute("type", "button");
    removeButton.classList.add("remove-book");
    removeButton.textContent = "Remove";
    mainContainer.appendChild(cardDiv);
    cardDiv.appendChild(textDiv);
    textDiv.append(bookTitle, bookAuthor, bookPages, bookRead);
    buttonsDiv.append(readToggle, removeButton);
    cardDiv.appendChild(buttonsDiv);
}




