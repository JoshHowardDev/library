bookShelf = document.querySelector('.shelf')

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = () => {
        let readStr = ''
        read ? readStr = 'has been read' : 'not read yet'
        return(`${this.title} by ${this.author}, ${this.pages} pages, ${readStr}.`)
    };
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

function initialLibrary() {
    addBookToLibrary('The Great Gatsby', 'F Scott Fitzgerald', 218, true);
    addBookToLibrary('A Game of Thrones', 'George RR Martin', 694, true);
    addBookToLibrary('The Phantom Tollbooth', 'Norton Juster', 255, true);
}

function populateShelf() {
    myLibrary.forEach(book => {
        let bookCard = document.createElement('div');
        bookCard.classList.add('book')
        bookCard.innerHTML = `<div class="bookTitle">${book.title}</div>`
        bookShelf.appendChild(bookCard)
    });
}


initialLibrary();
populateShelf();
