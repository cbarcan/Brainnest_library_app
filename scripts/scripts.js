let myLibrary = [];

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
}

//added some random books to myLibrary
for (let i = 1; i <= 20; i++) {
  this[`book${i}`] = new Book(`book${i}`, `author${i}`, i);
  addBookToLibrary(this[`book${i}`]);
}

console.log(myLibrary);
console.log(book1);

//--------------------- Add Book Section ---------------------

//--------------------- Counter Section ----------------------

//--------------------- List of Books Section ----------------

//--------------------- Edit Book Section --------------------

