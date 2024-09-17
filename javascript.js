const myLibrary = [];
const mainContainer = document.querySelector(".main");
const addBookButton = document.querySelector(".add-book");

addBookButton.addEventListener("click", addBookPrompt);



function Books (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookPrompt () {
    let bookTitle = prompt("Book title?");
    let bookAuth = prompt("Book author?");
    let bookPages = prompt("Book pages?");
    let bookRead = prompt("Book read or not?");
    let book = new Books(bookTitle, bookAuth, bookPages, bookRead);
    addBookToLibrary(book);
}




function addBookToLibrary (book) {
    myLibrary.push(book);
    return displayBook(book);
}

function deleteBook (bookCard) {
    mainContainer.removeChild(bookCard);
}


function displayBook(book) {
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
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
    let buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");
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

    removeButton.addEventListener("click", () => deleteBook(cardDiv));
}

