let myLibrary = [];
const books = document.getElementById("books");

class Book {

  constructor (title, author, pages, readStatus = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
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
    removal.onclick = () => this.removeBookFromHTML();
    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(readStatus);
    book.appendChild(removal);
    books.appendChild(book);
  }

  removeBookFromHTML() {
    const title = Array.from(document.querySelectorAll('.title')).find(el => el.textContent === this.title);
    const book = title.parentElement;
    book.classList.add("removed");
    book.addEventListener("animationend",() => books.removeChild(book));
  }
}

Book.prototype.addBookToLibrary = () => {
  myLibrary.push(this);
}

//--------------------- Add Book Section ---------------------

//--------------------- Counter Section ----------------------

//--------------------- List of Books Section ----------------


const bookq = new Book("asda", "asda", 12312, true);
// console.log(bookq);

bookq.addBookToHTML();

//added some random books to myLibrary
for (let i = 1; i <= 20; i++) {
  this[`book${i}`] = new Book(`book${i}`, `author${i}`, i);
  this[`book${i}`].addBookToLibrary();
}

book1.addBookToHTML();
// bookq.removeBookFromHTML();
// // console.log(book1);

// console.log(myLibrary);
// console.log(book1);
//--------------------- Edit Book Section --------------------

