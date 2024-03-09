const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  displayBooks();
}

function displayBooks() {
  const bookContainer = document.getElementById("bookContainer");
  bookContainer.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("bookCard");
    bookCard.innerHTML = `
      <p>Title: ${book.title}</p>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <button class="read-status" data-index="${index}" onclick="toggleReadStatus(${index})">${book.isRead ? 'Read' : 'Not Read'}</button>
      <button class="removeBtn" data-index="${index}" onclick="removeBook(${index})">Remove</button>
    `;
    bookContainer.appendChild(bookCard);
  });
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

function toggleReadStatus(index) {
  myLibrary[index].isRead = !myLibrary[index].isRead;
  displayBooks();
}

// Event listener for the "New Book" button
document.getElementById("newBookBtn").addEventListener("click", () => {
  document.getElementById("formPopup").style.display = "block";
});

// Event listener for the form submission
document.getElementById("newBookForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("read").checked;

  if (title && author && pages) {
    const newBook = new Book(title, author, pages, isRead);
    addBookToLibrary(newBook);

    // Reset form fields
    document.getElementById("newBookForm").reset();

    // Hide the form
    document.getElementById("formPopup").style.display = "none";
  } else {
    alert("Please fill in all required fields.");
  }
});

// Initial display of books
displayBooks();
