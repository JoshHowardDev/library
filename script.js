const bookShelf = document.querySelector('.shelf');
const newBookTitleInput = document.querySelector('#newBookTitle')
const newBookAuthorInput = document.querySelector('#newBookAuthor')
const newBookPagesInput = document.querySelector('#newBookPages')
const newBookReadInput = document.querySelector('#newBookRead')
const formPopup = document.querySelector('.formPopup')
const buttonsDiv = document.querySelector('.buttonsDiv')

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

function changeReadStatus() {
    if (confirm('Are you sure you want to change the read status for this book?')) {
        myLibrary[this.attributes['data-libraryindex'].value].read = !myLibrary[this.attributes['data-libraryindex'].value].read
        populateShelf();
    }
}

function removeBook() {
    if (confirm('Are you sure you want to remove this book from your library?')) {
        myLibrary.splice(this.attributes['data-libraryindex'].value, 1)
        populateShelf();
    }
}

function openAddABookForm() {
    bookShelf.style.display = 'none';
    buttonsDiv.style.display = 'none';
    formPopup.style.display = 'unset';
}

function addBookSubmit() {
    addBookToLibrary(newBookTitleInput.value, newBookAuthorInput.value, newBookPagesInput.value, newBookReadInput.checked);
    closeAddABookForm();
    populateShelf();
}

function closeAddABookForm() {
    formPopup.style.display = 'none';
    bookShelf.style.display = 'flex';
    buttonsDiv.style.display = 'flex';
    newBookTitleInput.value = '';
    newBookAuthorInput.value = '';
    newBookPagesInput.value = '';
    newBookReadInput.checked = false;
}

function populateShelf() {

    //Clear shelf if existing books are present
    bookShelf.innerHTML = '';

    //Create and add book cards to shelf
    myLibrary.forEach((book, index) => {

        //Create book card
        let bookCard = document.createElement('div');
        bookCard.classList.add('book');
        bookCard.setAttribute('data-libraryindex', index);

        //Add a button to change read status
        let changeReadBtn = document.createElement('button');
        changeReadBtn.setAttribute('type', 'button');
        changeReadBtn.classList.add('changeReadStatusButton');
        changeReadBtn.setAttribute('data-libraryindex', index);
        changeReadBtn.innerHTML = 'Change Read Status'
        bookCard.appendChild(changeReadBtn);

        //Create full details div and add to book card.
        let fullDetails = `Title: ${book.title}<br><br>
                        Author: ${book.author}<br><br>
                        Pages: ${book.pages}<br><br>
                        Read: ${(book.read) ? 'Yes' : 'No'}`;
        let fullDetailsDiv = document.createElement('div');
        fullDetailsDiv.classList.add('fullBookDetails');
        fullDetailsDiv.innerHTML = fullDetails;
        bookCard.appendChild(fullDetailsDiv)

        //Create title div and add to book card.
        let bookTitleDiv = document.createElement('div');
        bookTitleDiv.classList.add('bookTitle');
        bookTitleDiv.innerHTML = book.title;
        bookCard.appendChild(bookTitleDiv)        

        //Add a button to remove the book
        let removeBtn = document.createElement('button');
        removeBtn.setAttribute('type', 'button');
        removeBtn.classList.add('removeBookButton');
        removeBtn.setAttribute('data-libraryindex', index);
        removeBtn.innerHTML = 'Remove Book'
        bookCard.appendChild(removeBtn);        

        //Add book card to shelf
        bookShelf.appendChild(bookCard)
    });

    //Add event listeners for button clicks
    const changeReadStatusButtons = document.querySelectorAll('.changeReadStatusButton');
    changeReadStatusButtons.forEach(button => {
        button.addEventListener('click', changeReadStatus)
    });

    const removeBookButtons = document.querySelectorAll('.removeBookButton');
    removeBookButtons.forEach(button => {
        button.addEventListener('click', removeBook)
    });
}


initialLibrary();
populateShelf();