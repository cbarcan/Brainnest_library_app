let myLibrary = [];
const booksWrapper = document.getElementById("books-list-wrapper");
const books = document.querySelectorAll(".book-wrapper");

let width = window.innerWidth;

let counterRead = 0;
const readCount = document.getElementById("counter-read");
const unreadCount = document.getElementById("counter-unread");
const totalCount = document.getElementById("counter-total");
const readCountMobile = document.getElementById("counter-read-mobile");
const unreadCountMobile = document.getElementById("counter-unread-mobile");
const totalCountMobile = document.getElementById("counter-total-mobile");

const modal = document.getElementById("modal");
const toggleButton = document.getElementById("toggleForm");

const updateLocalStorage = () =>{
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

const retrieveBooks = () =>  {
  myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
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
    const edit = document.createElement("p");
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
    edit.classList.add("edit")
    edit.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;
    removal.classList.add("removal");
    removal.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
    const iReadStatus = readStatus.firstChild;
    iReadStatus.onclick = () => this.statusChange();
    const iEdit = edit.firstChild;
    iEdit.onclick = () => this.openEditForm();
    const iRemove = removal.firstChild;
    iRemove.onclick = () => {
      this.removeBookFromLibrary();
      this.removeBookFromHTML();
    };
    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    if (width < 601) {
      console.log("test");
      const icons = document.createElement("div");
      icons.classList.add("icons");
      icons.appendChild(readStatus);
      icons.appendChild(edit);
      icons.appendChild(removal);
      book.appendChild(icons);
    } else {
      book.appendChild(readStatus);
      book.appendChild(edit);
      book.appendChild(removal);
    }
    booksWrapper.appendChild(book);
    totalCount.innerText = myLibrary.length;
    totalCountMobile.innerText = myLibrary.length;
    if (this.readStatus === true) {
      readCounter();
    }
    unreadCounter();
  }

  removeBookFromLibrary() {
    const index = myLibrary.indexOf(myLibrary.find(book => book.title === this.title));
    myLibrary.splice(index, 1);
    updateLocalStorage();
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
      readCountMobile.innerHTML = counterRead;
    }
    unreadCounter();
    totalCount.innerText = myLibrary.length;
  }

  statusChange() {
    this.readStatus = !this.readStatus;
    const title = Array.from(document.querySelectorAll('.title')).find(el => el.textContent === this.title);
    const book = title.parentElement;
    if (this.readStatus === true) {
      book.childNodes[3].innerHTML = `<i class="fa-solid fa-check"></i>`;
    } else {
      book.childNodes[3].innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    }
    book.childNodes[3].firstChild.onclick = () => this.statusChange();
    const index = myLibrary.indexOf(myLibrary.find(book => book.title === this.title));
    myLibrary[index].readStatus = this.readStatus;
    updateLocalStorage();
    if (this.readStatus !== true) {
      counterRead--;
      readCount.innerText = counterRead;
      readCountMobile.innerHTML = counterRead;
    } else {
      readCounter();
    }
    unreadCounter();
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
  updateLocalStorage();
  // Reset the form
  document.getElementById("myForm").reset();
}

function addBookModal(event) {
  if (event !== undefined) {
      event.preventDefault();
  }
  const title = document.getElementById("modal-title").value;
  const author = document.getElementById("modal-author").value;
  const pages = parseInt(document.getElementById("modal-pages").value);
  const read = document.getElementById("modal-read").checked;
  if (pages < 0) {
    alert("Please enter a valid number of pages.");
    return;
  }
  const book = new Book(title, author, pages, read);
  book.addBookToLibrary();
  book.addBookToHTML();
  updateLocalStorage();
  // Reset the form
  document.getElementById("modal-myForm").reset();
  modal.style.display = "none";
}



function toggleForm() {
  // if (window.innerWidth < 480) {
  //   // hide the button and show the form
  //   toggleButton.style.display = "block";
  //   form.style.display = "none";
  //   // document.body.style.overflow = "hidden"; // disable scrolling
  // }
  // hide the button and show the form
  modal.style.display = "flex";
  // document.body.style.overflow = "hidden"; // disable scrolling
}

//--------------------- Counter Section ----------------------
const readCounter = () => {
  counterRead++;
  readCount.innerHTML = counterRead;
  readCountMobile.innerHTML = counterRead;
}

const unreadCounter = () => {
  let counterUnread = myLibrary.length - counterRead;
  unreadCount.innerText = counterUnread;
  unreadCountMobile.innerText = counterUnread;
}

const deleteAll = () => {
  myLibrary = [];
  counterRead = 0;
  let unread = 0;
  readCount.innerText = counterRead;
  readCountMobile.innerText = counterRead;
  unreadCount.innerText = unread;
  unreadCountMobile.innerText = unread;
  totalCount.innerText = myLibrary.length;
  totalCountMobile.innerText = myLibrary.length;
  updateLocalStorage();
  showLibrary();
}

const sortByTitle = () => {
  retrieveBooks();
  myLibrary.sort((a, b) => {
    let titleA =  a.title.toLowerCase();
    let titleB = b.title.toLowerCase();

    if (titleA < titleB) {
      return -1
    } if (titleA > titleB) {
      return 1;
    }
    return 0;
  })
  updateLocalStorage();
  showLibrary();
}

const sortByAuthor = () => {
  retrieveBooks();
  myLibrary.sort((a, b) => {
  let authorA =  a.author.toLowerCase();
    let authorB = b.author.toLowerCase();

    if (authorA < authorB) {
      return -1
    } if (authorA > authorB) {
      return 1;
    }
    return 0;
  })
  updateLocalStorage();
  showLibrary();
}
//--------------------- List of Books Section ----------------
const showLibrary = () => {
  booksWrapper.innerHTML = "";
  counterRead = 0;
  if (localStorage.getItem("myLibrary") !== null) {
    retrieveBooks();
  };
  myLibrary.forEach(book => {
    const newBook = new Book(book.title, book.author, book.pages, book.readStatus)
    newBook.addBookToHTML();
  });
}

//--------------------- Change Read Status --------------------
function toggleReadStatus(index) {
  myLibrary = getLocalStorage();
  myLibrary[index].readStatus = !myLibrary[index].readStatus;

  updateLocalStorage();
}
//--------------------- Edit Book Section --------------------
document.getElementById("close-edit-form-button").addEventListener("click", closeEditForm);
// document.getElementById("edit-book-form").addEventListener("submit", editBookFormSubmit);

function openEditForm(index) {
  let book = myLibrary[index];
  document.getElementById("edit-index").value = index;
  document.getElementById("edit-title").value = book.title;
  document.getElementById("edit-author").value = book.author;
  document.getElementById("edit-pages").value = book.pages;
  document.getElementById("edit-read").checked = book.readStatus;
  document.getElementById("edit-book-wrapper").style.display = "block";
}

function closeEditForm() {
  document.getElementById("edit-book-wrapper").style.display = "none";
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
  updateLocalStorage();
  retrieveBooks();
  closeEditForm();
}

window.onresize = () => {
  width = window.innerWidth;
  showLibrary();
}

showLibrary();
