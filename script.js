document.addEventListener("DOMContentLoaded", function () {
  const submitBook = document.getElementById("inputBook");

  submitBook.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });

  const searchBooks = document.getElementById("searchBook");

  searchBooks.addEventListener("submit", function (event) {
    event.preventDefault();
    searchBook();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener("ondatasaved", () => {
  console.log("Data Berhasil Disimpan");
});

document.addEventListener("ondataloaded", () => {
  refreshDataFrombooks();
});

function changeText() {
  const checkbox = document.getElementById("inputBookIsComplete");
  const textSubmit = document.getElementById("textSubmit");

  if (checkbox.checked == true) {
    textSubmit.innerText = "Sudah Selesai Dibaca";
  } else {
    textSubmit.innerText = "Belum Selesai Dibaca";
  }
}

// scroll reveal animation
const sr = ScrollReveal({
  distance: "60px",
  duration: 3000,
  delay: 300,
  // reset: true,
});
sr.reveal(`.head_bar__title`);
sr.reveal(`.input_section, .search_section`, { delay: 500, origin: "bottom" });
sr.reveal(`.book_shelf`, { delay: 600, origin: "left" });
