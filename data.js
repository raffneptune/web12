const STORAGE_KEY = "BOOK_APPS";

let books = [];

function isStorageExist() {
  if (typeof (Storage === undefined)) {
    alert("Browser anda tidak mendukung Local Storage");
    return true;
  }
  return false;
}

function saveData() {
  const parsed = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);

  let data = JSON.parse(serializedData);

  if (data !== null) books = data;

  document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
  if (isStorageExist()) {
    saveData();
  }
}

function composebookObject(title, author, year, isCompleted) {
  return {
    id: +new Date(),
    title,
    author,
    year,
    isCompleted,
  };
}

function findbook(bookId) {
  for (book of books) {
    if (book.id === bookId) return book;
  }
  return null;
}

function findbookIndex(bookId) {
  let index = 0;
  for (book of books) {
    if (book.id === bookId) return index;

    index++;
  }
  return -1;
}
