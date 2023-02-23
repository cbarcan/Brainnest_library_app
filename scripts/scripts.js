let myLibrary = [];
const booksWrapper = document.getElementById("books-list-wrapper");
const books = document.querySelectorAll(".book-wrapper");

let counterRead = 0;
const readCount = document.getElementById("counter-read");
const unreadCount = document.getElementById("counter-unread");
const totalCount = document.getElementById("counter-total");

const updateLocalStorage = (array) =>{ 
  localStorage.setItem("myLibrary", JSON.stringify(array));
  return array;
}

const retrieveBooks = () =>  {
  myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  return myLibrary;
};


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
    console.log(this.readStatus);
    if (this.readStatus === true) {
      readCounter();
    }
    unreadCounter();
  }

  removeBookFromLibrary() {
    const index = myLibrary.indexOf(myLibrary.find(book => book.title === this.title));
    myLibrary.splice(index, 1);
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  }

  removeBookFromHTML() {
    const title = Array.from(document.querySelectorAll('.title')).find(el => el.textContent === this.title);
    const book = title.parentElement;
    book.classList.add("removed");
    book.addEventListener("animationend", () => {
      booksWrapper.removeChild(book);
    });
    if (this.readStatus === true) {
      counterRead--;
      readCount.innerText = counterRead;
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

//--------------------- Add Book Section (H) ---------------------
function addBook(event) {
  if (event !== undefined) {
      event.preventDefault();
  }
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = parseInt(document.getElementById("pages").value);
  const read = document.getElementById("read").checked;
  if (pages < 0) {
    alert("Please enter a valid number of pages.");
    return;
  }
  const book = new Book(title, author, pages, read);
  book.addBookToLibrary();
  book.addBookToHTML();
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  // Reset the form
  document.getElementById("myForm").reset();
}

//--------------------- Counter Section ----------------------
const readCounter = () => {
  counterRead++;
  readCount.innerHTML = counterRead;
  console.log(readCount);
}

const unreadCounter = () => {
  let counterUnread = myLibrary.length - counterRead;
  unreadCount.innerText = counterUnread;
}

const deleteAll = () => {
  myLibrary = [];
  counterRead = 0;
  let unread = 0;
  readCount.innerText = counterRead;
  unreadCount.innerText = unread;
  totalCount.innerText = myLibrary.length;
  updateLocalStorage(myLibrary);
  window.location.reload();
}

const sortByTitle = (array) => {
  array = retrieveBooks();
  array.sort((a, b) => {
    let titleA =  a.title.toLowerCase();
    let titleB = b.title.toLowerCase();

    if (titleA < titleB) {
      return -1
    } if (titleA > titleB) {
      return 1;
    }
    return 0;
  })
  updateLocalStorage(array);
  window.location.reload();
  return array;
}

const sortByAuthor = (array) => {
  array = retrieveBooks();
  array.sort((a, b) => {
  let authorA =  a.author.toLowerCase();
    let authorB = b.author.toLowerCase();

    if (authorA < authorB) {
      return -1
    } if (authorA > authorB) {
      return 1;
    }
    return 0;
  })
  updateLocalStorage(array);
  window.location.reload();
  return array;
}
//--------------------- List of Books Section ----------------
const showLibrary = () => {
  if (localStorage.getItem("myLibrary") !== null) {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  };
  myLibrary.forEach(book => {
    const newBook = new Book(book.title, book.author, book.pages, book.readStatus)
    newBook.addBookToHTML();
  });
}

//--------------------- Change Read Status --------------------
function toggleReadStatus(index) {
  myLibrary = getLocalStorage();
  myLibrary[index].read = !myLibrary[index].read;

  // Need a function that updates the local storage to go here.
}
//--------------------- Edit Book Section --------------------
function openEditForm(index) {
  let book = myLibrary[index];
  document.getElementById("edit-index").value = index;
  document.getElementById("edit-title").value = book.title;
  document.getElementById("edit-author").value = book.author;
  document.getElementById("edit-pages").value = book.pages;
  document.getElementById("edit-read").checked = book.read;
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
  let read = document.getElementById("edit-read").checked;
  myLibrary[index].title = title;
  myLibrary[index].author = author;
  myLibrary[index].pages = pages;
  myLibrary[index].read = read;
  // Need a function that updates the local storage to go here.
  // Need a function that displays the books to go here.
  closeEditForm();
}

showLibrary();
