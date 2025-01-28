const INCOMPLETE_BOOKSHELFLIST = "incompleteBookshelfList";
const COMPLETE_BOOK_SHELFLIST = "completeBookshelfList";
const BOOK_ITEMID = "itemId";

function addBook() {
  const incompleteBookshelfList = document.getElementById(INCOMPLETE_BOOKSHELFLIST);
  const completeBookshelfList = document.getElementById(COMPLETE_BOOK_SHELFLIST);

  const inputBookTitle = document.getElementById("inputBookTitle").value;
  const inputBookAuthor = document.getElementById("inputBookAuthor").value;
  const inputBookYear = document.getElementById("inputBookYear").value;
  const inputBookIsComplete = document.getElementById("inputBookIsComplete").checked;

  const book = makeBook(inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete);
  const bookObject = composebookObject(inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete);

  book[BOOK_ITEMID] = bookObject.id;
  books.push(bookObject);

  if (inputBookIsComplete == false) {
    incompleteBookshelfList.append(book);
  } else {
    completeBookshelfList.append(book);
  }
  updateDataToStorage();
}

function makeBook(inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete) {
  const bookTitle = document.createElement("h3");
  bookTitle.innerText = inputBookTitle;
  bookTitle.classList.add("move");

  const bookAuthor = document.createElement("p");
  bookAuthor.innerText = inputBookAuthor;

  const bookYears = document.createElement("p");
  bookYears.classList.add("year");
  bookYears.innerText = inputBookYear;

  const bookIsComplete = createCompleteButton();

  const bookRemove = createRemoveButton();
  bookRemove.innerText = "Hapus";

  const bookAction = document.createElement("div");
  bookAction.classList.add("action");

  if (inputBookIsComplete == true) {
    bookIsComplete.innerText = "Belum Selesai";
  } else {
    bookIsComplete.innerText = "Sudah Selesai";
  }

  bookAction.append(bookIsComplete, bookRemove);
  const bookItem = document.createElement("article");
  bookItem.classList.add("book_item");
  bookItem.append(bookTitle, bookAuthor, bookYears, bookAction);

  return bookItem;
}

function createButton(buttonTypeClass, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
}

function createCompleteButton() {
  return createButton("green", function (event) {
    const parent = event.target.parentElement;
    addBookToCompleted(parent.parentElement);
  });
}

function removeBook(bookElement) {
  const bookPosition = findbookIndex(bookElement[BOOK_ITEMID]);
  if (window.confirm("Are you sure you want to remove this book from bookshelf?")) {
    books.splice(bookPosition, 1);
    bookElement.remove();
  }
  updateDataToStorage();
}

function createRemoveButton() {
  return createButton("red", function (event) {
    const parent = event.target.parentElement;
    removeBook(parent.parentElement);
  });
}

function addBookToCompleted(bookElement) {
  const bookTitled = bookElement.querySelector(".book_item > h3").innerText;
  const bookAuhtored = bookElement.querySelector(".book_item > p").innerText;
  const bookYeared = bookElement.querySelector(".year").innerText;
  const bookIsComplete = bookElement.querySelector(".green").innerText;

  if (bookIsComplete == "Sudah Selesai") {
    const newBook = makeBook(bookTitled, bookAuhtored, bookYeared, true);

    const book = findbook(bookElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;

    const completeBookshelfList = document.getElementById(COMPLETE_BOOK_SHELFLIST);
    completeBookshelfList.append(newBook);
  } else {
    const newBook = makeBook(bookTitled, bookAuhtored, bookYeared, false);

    const book = findbook(bookElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;

    const incompleteBookshelfList = document.getElementById(INCOMPLETE_BOOKSHELFLIST);
    incompleteBookshelfList.append(newBook);
  }
  bookElement.remove();

  updateDataToStorage();
}

function refreshDataFrombooks() {
  const listUncompleted = document.getElementById(INCOMPLETE_BOOKSHELFLIST);
  const listCompleted = document.getElementById(COMPLETE_BOOK_SHELFLIST);

  for (book of books) {
    const newbook = makeBook(book.title, book.author, book.year, book.isCompleted);
    newbook[BOOK_ITEMID] = book.id;

    if (book.isCompleted == false) {
      listUncompleted.append(newbook);
    } else {
      listCompleted.append(newbook);
    }
  }
}
function searchBook() {
  const inputSearch = document.getElementById("searchBookTitle").value;
  const moveBook = document.querySelectorAll(".move");

  for (move of moveBook) {
    if (inputSearch !== move.innerText) {
      console.log(move.innerText);
      move.parentElement.remove();
    }
  }
}
