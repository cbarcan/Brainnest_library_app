let myLibrary = [];
const booksWrapper = document.getElementById("books-list-wrapper");
const books = document.querySelectorAll(".book-wrapper");
let read = 0

const readCount = document.getElementById("read");
const unreadCount = document.getElementById("unread");
const totalCount = document.getElementById("total");


class Book {

  constructor(title, author, pages, readStatus = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }

  addBookToLibrary() {
    myLibrary.push(this);
  }

  addBookToHTML() {
    const book = document.createElement("div");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const readStatus = document.createElement("p");
    const removal = document.createElement("p");
    book.classList.add("book-wrapper");
    title.classList.add("title");
    title.innerText = this.title;
    author.classList.add("author");
    author.innerHTML = this.author;
    pages.classList.add("pages");
    pages.innerText = this.pages;
    readStatus.classList.add("status");
    if (this.readStatus === true) {
      readStatus.innerHTML = `<i class="fa-solid fa-check"></i>`;
    } else {
      readStatus.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    }
    removal.classList.add("removal");
    removal.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
    const iReadStatus = readStatus.firstChild;
    iReadStatus.onclick = () => this.statusChange();
    const iRemove = removal.firstChild;
    iRemove.onclick = () => {
      this.removeBookFromLibrary();
      this.removeBookFromHTML();
    };
    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(readStatus);
    book.appendChild(removal);
    booksWrapper.appendChild(book);
    totalCount.innerText = myLibrary.length;
    if (this.readStatus === true) {
      readCounter();
    }
    unreadCounter();
  }

  removeBookFromLibrary() {
    const index = myLibrary.indexOf(myLibrary.find(book => book.title === this.title));
    myLibrary.splice(index, 1);
  }

  removeBookFromHTML() {
    const title = Array.from(document.querySelectorAll('.title')).find(el => el.textContent === this.title);
    const book = title.parentElement;
    book.classList.add("removed");
    book.addEventListener("animationend", () => {
      booksWrapper.removeChild(book);
    });
    if (this.readStatus === true) {
      read--;
      readCount.innerText = read;
    }
    unreadCounter();
    totalCount.innerText = myLibrary.length;
  }

  statusChange() {
    if (this.readStatus === true) {
      this.readStatus = false;
    } else {
      this.readStatus = true;
    }
  }
}

//--------------------- Add Book Section ---------------------

const readCounter = () => {
  read++
  readCount.innerText = read;
}

const unreadCounter = () => {
  let unread = myLibrary.length - read;
  unreadCount.innerText = unread;
}

const deleteAll = () => {
  myLibrary = [];
  read = 0;
  let unread = 0;
  readCount.innerText = read;
  unreadCount.innerText = unread;
  totalCount.innerText = myLibrary.length;
  return myLibrary;
}

//--------------------- Counter Section ----------------------

//--------------------- List of Books Section ----------------
const bookq = new Book("asda", "asda", 12312, true);
// console.log(bookq);

bookq.addBookToLibrary();
bookq.addBookToHTML();

//added some random books to myLibrary
for (let i = 1; i <= 20; i++) {
  const book = new Book(`book${i}`, `author${i}`, i);
  book.addBookToLibrary();
  book.addBookToHTML();
}

console.log(myLibrary);
// console.log(book1);

console.log(myLibrary);

//--------------------- Edit Book Section --------------------



