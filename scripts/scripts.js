let myLibrary = [];
let read = 0

const readCount = document.getElementById("read");
const unreadCount = document.getElementById("unread");
const totalCount = document.getElementById("total");


class Book {

  constructor (title, author, pages, status = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

const addBookToLibrary = (book) => {
  myLibrary.push(book);
  totalCount.innerText = myLibrary.length;
}

//added some random books to myLibrary
for (let i = 1; i <= 20; i++) {
  this[`book${i}`] = new Book(`book${i}`, `author${i}`, i);
  addBookToLibrary(this[`book${i}`]);
}

console.log(myLibrary);
console.log(book1);

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

/* readCounter();
unreadCounter(); */

//--------------------- Counter Section ----------------------

//--------------------- List of Books Section ----------------

//--------------------- Edit Book Section --------------------

