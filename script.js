/* 1. Element selectors */
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const list = document.querySelector("#notes-list");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const noteCount = document.querySelector("#note-count");
const clearBtn = document.querySelector("#clear-btn");

const CATEGORIES = ["personal", "work", "study"];

/* 2. Data array to hold the notes */
let notes = [];

/* 3. Helper function to capitalise the first letter of a word */
function capitalise(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/* 4. Function to create a note element */
function createNoteElement(note) {
  const category = CATEGORIES.includes(note.category)
    ? note.category
    : "personal";

  const li = document.createElement("li");
  li.classList.add("note", `category-${category}`);

  const body = document.createElement("div");
  body.classList.add("note-body");

  const text = document.createElement("p");
  text.classList.add("note-text");
  text.textContent = note.text; // safe for user text

  const meta = document.createElement("p");
  meta.classList.add("note-meta");

  const label = document.createElement("span");
  label.classList.add("category-label");
  label.textContent = capitalise(category);

  const date = document.createElement("span");
  date.textContent = note.createdAt;

  meta.appendChild(label);
  meta.appendChild(date);
  body.appendChild(text);
  body.appendChild(meta);

  const del = document.createElement("button");
  del.type = "button";
  del.textContent = "Delete";
  del.classList.add("delete-btn");

  li.appendChild(body);
  li.appendChild(del);
  return li;
}

function render() {
  list.replaceChildren(); // clear the old list
  notes.forEach((note) => list.appendChild(createNoteElement(note)));
}

/* 5. Add a note */
function addNote(text, category) {
  notes.push({
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(),
  });
  render();
}

/*6. Event listener for the form submission */
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (text === "") return; // Task 4 replaces this with a proper error message

  addNote(text, categorySelect.value);
  input.value = "";
  input.focus();
});

// ---------- 7. Draw once when the page first loads ----------
render();
