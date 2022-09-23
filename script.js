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