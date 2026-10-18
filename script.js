/* 1. Element selectors */
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const list = document.querySelector("#notes-list");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const count = document.querySelector("#note-count");
const clearAllBtn = document.querySelector("#clear-all-btn");

const STORAGE_KEY = "quicknotes";
const MAX_LENGTH = 200;
const CATEGORIES = ["personal", "work", "study"];

/* 2. Data array to hold the notes */
let notes = loadNotes();

function loadNotes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return []; // saved data was damaged: start fresh
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

/* 3. Helper function to capitalise the first letter of a word */
function capitalise(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function countMessage() {
  if (notes.length === 0) return "You have no notes yet.";
  if (notes.length === 1) return "You have 1 note.";
  return `You have ${notes.length} notes.`;
}

/* Notes that match every word typed in the search box (not case-sensitive) */
function getVisibleNotes() {
  const words = searchInput.value
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word !== "");

  return notes.filter((note) => {
    const text = note.text.toLowerCase();
    return words.every((word) => text.includes(word));
  });
}

/* Text validation to throw error message if invalid  text is provided */
function validate(text) {
  if (text === "") return "Please type a note first.";
  if (text.length > MAX_LENGTH) return "Notes must be 200 characters or fewer.";
  return "";
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
  del.addEventListener("click", () => deleteNote(note.id));

  li.appendChild(body);
  li.appendChild(del);
  return li;
}

function render() {
  const visibleNotes = getVisibleNotes();
  list.replaceChildren(); // clear the old list

  if (visibleNotes.length === 0 && searchInput.value.trim() !== "") {
    const empty = document.createElement("li");
    empty.classList.add("empty-message");
    empty.textContent = "No notes match your search.";
    list.appendChild(empty);
  }

  visibleNotes.forEach((note) => list.appendChild(createNoteElement(note)));
  count.textContent = countMessage();
  clearAllBtn.disabled = notes.length === 0; // nothing to clear
}

/* 5. Add or delete a note */
function addNote(text, category) {
  notes.push({
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(),
  });
  saveNotes();
  render();
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

/* Bonus: delete every note, but only after the user confirms */
function clearAllNotes() {
  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    render();
  }
}

/*6. Event listener for the form submission */
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  const problem = validate(text);

  if (problem) {
    errorMessage.textContent = problem;
    return;
  }

  errorMessage.textContent = ""; // clear any old error
  addNote(text, categorySelect.value);
  input.value = "";
  input.focus();
});

clearAllBtn.addEventListener("click", clearAllNotes);

/*7. Draw once when the page first loads */
render();
