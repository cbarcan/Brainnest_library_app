let myLibrary = [];
const books = document.getElementById("books");
let read = 0

const readCount = document.getElementById("read");
const unreadCount = document.getElementById("unread");
const totalCount = document.getElementById("total");


class Book {

  constructor (title, author, pages, readStatus = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }

  addBook() {
    myLibrary.push(this);
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
    const iRemove = removal.firstChild;
    iRemove.onclick = () => this.removeBook();
    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(readStatus);
    book.appendChild(removal);
    books.appendChild(book);
    totalCount.innerText = myLibrary.length;
    if (this.readStatus === true) {
      readCounter();
    }
    unreadCounter();
  }

  removeBook() {
    const title = Array.from(document.querySelectorAll('.title')).find(el => el.textContent === this.title);
    const book = title.parentElement;
    book.classList.add("removed");
    book.addEventListener("animationend",() => {
      const index = myLibrary.indexOf(myLibrary.find(book => book.title === this.title));
      if (myLibrary[index].readStatus === true) {
        read--;
        readCount.innerText = read;
      }
      myLibrary.splice(index, 1);
      books.removeChild(book);
      unreadCounter();
      totalCount.innerText = myLibrary.length;
    });
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

bookq.addBook();

//added some random books to myLibrary
for (let i = 1; i <= 20; i++) {
  const book = new Book(`book${i}`, `author${i}`, i);
  book.addBook();
}

// console.log(myLibrary);
// console.log(book1);



//--------------------- Edit Book Section --------------------

function openEditForm(index) {
  let book = myLibrary[index];
  document.getElementById("edit-index").value = index;
  document.getElementById("edit-title").value = book.title;
  document.getElementById("edit-author").value = book.author;
  document.getElementById("edit-pages").value = book.pages;
  document.getElementById("edit-read").checked = book.readStatus;
  document.getElementById("edit-book-form").style.display = "block";
}

function closeEditForm() {
  document.getElementById("edit-book-form").style.display = "none";
}

function editBookFormSubmit(event) {
  event.preventDefault();
  let index = document.getElementById("edit-index").value;
  let title = document.getElementById("edit-title").value;
  let author = document.getElementById("edit-author").value;
  let pages = document.getElementById("edit-pages").value;
  let readStatus = document.getElementById("edit-read").checked;
  myLibrary[index].title = title;
  myLibrary[index].author = author;
  myLibrary[index].pages = pages;
  myLibrary[index].readStatus = readStatus;
  // Need a function that updates the local storage to go here.
  // Need a function that displays the books to go here.
  closeEditForm();
}