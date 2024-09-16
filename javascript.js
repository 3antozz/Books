const myLibrary = [];
const container = document.querySelector(".container");


function Books (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    addBookToLibrary(this);
}

function addBookToLibrary (book) {
    return myLibrary.push(book);
}

function displayBook(array) {
    array.forEach(book => {
        let paragraph = document.createElement("p");
        paragraph.textContent = book.title + book.author + book.pages + book.read;
        container.appendChild(paragraph);
    });
}

const book1 = new Books("Yacine", "lol", 22, "shit");
const book2 = new Books("Alaa", "lol", 69, "shit");
const book3 = new Books("Rafik", "lol", 420, "shit");

displayBook(myLibrary);