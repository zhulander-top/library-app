const myLibrary= [];
function Book(title, author, pages, haveRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
    this.id = crypto.randomUUID();
  } 
function addBook(title, author, pages, haveRead){
    const newBook = new Book(title,author, pages, haveRead)
    myLibrary.push(newBook);
    showLibrary();
}
function showLibrary() {
    const tableBody = document.getElementById("library-body");
    tableBody.innerHTML = ""; 
  
    myLibrary.forEach((book) => {
      const row = document.createElement("tr");
  
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>
            <button class="toggleReadBtn" data-id="${book.id}">
                ${book.haveRead ? "✅ Read" : "📖 Not Read"}
            </button>
        </td>
        <td><button class="deleteBtn" data-id="${book.id}">Delete</button></td>
      `;
  
      tableBody.appendChild(row);
    });
  

    document.querySelectorAll(".deleteBtn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const bookId = btn.getAttribute("data-id");
        deleteBook(bookId);
      });
    });
    document.querySelectorAll(".toggleReadBtn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const bookId = btn.getAttribute("data-id");
          toggleHaveRead(bookId);
        });
    });      
  }
  
function deleteBook(id) {
    const index = myLibrary.findIndex((book) => book.id === id);
    if (index !== -1) {
      myLibrary.splice(index, 1);
      showLibrary();              
    }
  }
function toggleHaveRead(id) {
    const book = myLibrary.find((b) => b.id === id);
    if (book) {
      book.haveRead = !book.haveRead;
      showLibrary();
    }
  }
  
document.addEventListener("DOMContentLoaded", () => {
    const newBookBtn = document.getElementById("newBookBtn");
    const bookForm = document.getElementById("bookForm");
  
    newBookBtn.addEventListener("click", () => {
        const isHidden = getComputedStyle(bookForm).display === "none";
        bookForm.style.display = isHidden ? "block" : "none";
      });
  
    bookForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("title").value;
      const author = document.getElementById("author").value;
      const pages = document.getElementById("pages").value;
      const haveRead = document.getElementById("haveRead").value;
  
      addBook(title, author, pages, haveRead);
      bookForm.reset();
      bookForm.style.display = "none";
    });
});