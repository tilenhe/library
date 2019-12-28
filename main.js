const libraryDiv = document.querySelector("#library");
const formDiv = document.querySelector(".card");
const addBookBtn = document.querySelector("#add-book");
const newBookBtn = document.querySelector("#new-book");
addBookBtn.addEventListener("click", addBookToLibrary);
newBookBtn.addEventListener("click", showForm);

const book1 = new Book("The Hobbit", "J.R.R Tolkien", 295, "No");
let myLibrary = [book1];
if (sessionStorage.getItem("library")) {
  // Restore the contents of the text field
  myLibrary = JSON.parse(sessionStorage.getItem("library"));
} else {
  myLibrary = [book1];
  sessionStorage.setItem("library", JSON.stringify(myLibrary));
}
function toggleReadStatus(e) {
  const j = e.target.parentNode.getAttribute("data-attribute");
  console.log(j);
  if (myLibrary[j].read == "Yes") {
    myLibrary[j].read = "No";
    //e.target.innerText = "No";
  } else {
    myLibrary[j].read = "Yes";
    // e.target.innerText = "Yes";
  }
  sessionStorage.setItem("library", JSON.stringify(myLibrary));
  console.log(myLibrary[j].read);
  render();
}

function removeBook(e) {
  e.preventDefault();
  console.log("delete");
  console.log(myLibrary);
  const j = e.target.parentNode.parentNode.getAttribute("data-attribute");
  console.log(j);
  e.target.parentNode.parentNode.style.display = "none";
  myLibrary.splice(j, 1);
  sessionStorage.setItem("library", JSON.stringify(myLibrary));
  console.log(myLibrary);
}

function showForm() {
  console.log("showform");
  if (document.querySelector("form.card").style.display == "none") {
    document.querySelector("form.card").style.display = "unset";
  } else {
    document.querySelector("form.card").style.display = "none";
  }
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(e) {
  e.preventDefault();
  const bookTitle = document.getElementById("title").value;
  const bookAuthor = document.getElementById("author").value;
  const bookPages = document.getElementById("pages").value;
  const bookRead = document.querySelector("input[name='read']:checked").value;
  if (bookTitle !== "" && bookAuthor !== "" && bookPages !== "") {
    const book2 = new Book(bookTitle, bookAuthor, bookPages, bookRead);
    myLibrary.push(book2);
    sessionStorage.setItem("library", JSON.stringify(myLibrary));
    render();
  } else {
    const p = document.createElement("p");
    formDiv.appendChild(p).innerText = "Please enter all required fields.";
    setTimeout(function() {
      formDiv.removeChild(p);
    }, 3000);
  }
}

function render() {
  libraryDiv.innerHTML = "";
  myLibrary.forEach(book => {
    const div = document.createElement("div");
    libraryDiv.appendChild(div);
    let i = myLibrary.indexOf(book);
    div.innerHTML = `<div data-attribute="${i}" class="card" ><h2><strong>${book.title}</strong></h2> <p>Author: ${book.author}</p> <p>Pages: ${book.pages}</p> 
    Read: <button class="btn btn-toggle" name="readToggle" value="${book.read}">${book.read}</button> <button class="btn remove-btn">Remove book</button></p></div>`;
  });
  const removeBookBtn = document.querySelectorAll(".remove-btn");
  removeBookBtn.forEach(button => {
    button.addEventListener("click", removeBook);
  });
  const toggleReadBtn = document.querySelectorAll(".btn-toggle");
  toggleReadBtn.forEach(button => {
    button.addEventListener("click", toggleReadStatus);
  });
}

console.log(myLibrary);
render();
