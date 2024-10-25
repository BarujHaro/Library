const myLibrary = [];
const libraryContainer = document.querySelector('.libraryCont');

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = function(){
        return this.title+" by "+this.author+", "+this.pages+", "+this.isRead;
    };
}

const book1 = new Book('The Lord of the Rings', 'J.R.R. Tolkien', 1178, 'Read');
const book2 = new Book('The Hitchhiker\'s Guide to the Galaxy', 'Douglas Adams', 184, 'Read');

function addBook(){
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.querySelector('input[name="isRead"]:checked').value;
    const bookNew = new Book(title, author, pages, isRead); 
    addBookToLibrary(bookNew);
    closeForm();
}

function addBookToLibrary(book){
    myLibrary.push(book);
    renderLibrary();
}

addBookToLibrary(book1);
addBookToLibrary(book2);


function renderLibrary(){
    libraryContainer.innerHTML = ''; 
    myLibrary.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.textContent = book.info();
        bookElement.classList.add('books');
        libraryContainer.appendChild(bookElement);
        
        //Read/Unread
        const button2 = document.createElement('button');
        //button2.textContent = book.isRead ? 'Mark Unread' : 'Mark Read';
        if(book.isRead === "Read"){
            button2.textContent = "Mark Unread";
        }else{
            button2.textContent = "Mark Read";
        }
        button2.classList.add('btnIlb');
        button2.addEventListener('click', () => {
            markBook(book);
        });
        bookElement.appendChild(button2);
        libraryContainer.appendChild(bookElement);
        //Remove button
        const button1 = document.createElement('button');
        button1.textContent = 'Delete';
        button1.classList.add('btnIlb');
        button1.addEventListener('click', () => {
            deleteBook(book);
        });
        bookElement.appendChild(button1);
        libraryContainer.appendChild(bookElement);
    })
}

function deleteBook(book) {
    const index = myLibrary.indexOf(book); 
    myLibrary.splice(index, 1); 
    renderLibrary();
  }

function markBook(book){
    if(book.isRead === "Read"){
        book.isRead = "Not read";
    }else{
        book.isRead = "Read";
    }
}

setInterval(() => {
    renderLibrary();
}, 2000);

function popup(){
    document.getElementById("overlay").style.display = "block";
    document.getElementById("popupForm").style.display = "block";

}

function closeForm(){
    document.getElementById("overlay").style.display = "none";
    document.getElementById("popupForm").style.display = "none";
    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('pages').value = "";
    document.querySelectorAll('input[name="isRead"]').forEach(radio => {
        radio.checked = false;
    });
}


