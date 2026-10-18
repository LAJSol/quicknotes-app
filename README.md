# QuickNotes

QuickNotes is a simple note-taking web app built with plain HTML, CSS and JavaScript. You can write short notes, give each one a category, search through them and delete the ones you no longer need. Your notes are saved in your browser, so they are still there after you refresh the page.

## Features

- Add notes with a category: Personal, Work or Study
- Each note card shows its text, category label, date and a Delete button
- Validation: empty notes and notes over 200 characters show an error message
- Delete any note with its own Delete button
- Live search that matches notes by their text, ignoring upper and lower case
- A "No notes match your search." message when a search finds nothing
- A note count that reads correctly for zero, one and many notes
- Notes saved to `localStorage`, so they survive a page refresh
- Responsive layout: the form stacks vertically on screens 600px wide or narrower

## How to run it locally

1. Clone or download the repository:

   ```bash
   git clone https://github.com/LAJSol/quicknotes-app.git
   ```

2. Open the `quicknotes-app` folder in VS Code.
3. Install the **Live Server** extension if you do not have it yet.
4. Right-click `index.html` and choose **Open with Live Server**.

There is nothing to install or build. You can also open `index.html` directly in a browser.

## What I learned

- **The render pattern:** keep the data in one `notes` array, then change it, save it and call `render()` so the screen always matches the data.
- **Safe DOM building:** use `createElement` and `textContent` for text the user types, never `innerHTML`, so typed text can never run as code.
- **localStorage with JSON:** `localStorage` only stores strings, so I use `JSON.stringify` to save the array and `JSON.parse` to load it back.
- **Validation and clear messages:** checking input before saving it, and giving the user a clear message when something is wrong, makes the app much easier to use.
- **Committing in small steps:** one commit per task gives a clear history that I can go back through if something breaks.
