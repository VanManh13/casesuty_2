const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");
addBtn.addEventListener("click", function () {
  addNote();
});
const saveNotes = () => {
  const notes = document.querySelectorAll(".note textarea");
  console.log(notes);
  const data = [];
  notes.forEach((note) => {
    data.push(note.value);
  });

  if (data.length === 0) {
    localStorage.removeItem("notes");
  } else {
    localStorage.setItem("notes", JSON.stringify(data));
  }
};
//add note
const addNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
    <div class="tool">
         <i class="save fas fa-save"></i>
         <i class="trash fas fa-trash" ></i> 
    </div>
    <textarea>${text}</textarea>
    `;
  // remove note
  note.querySelector(".trash").addEventListener("click", function () {
    let result = confirm("Dellete this note ?");
    if (result) {
      note.remove();
      saveNotes();
    } else {
      return;
    }
  });
  note.querySelector(".save").addEventListener("click", function () {
    saveNotes();
  });
  note.querySelector("textarea").addEventListener("focusout", function () {
    saveNotes();
  });
  main.appendChild(note);
  saveNotes();
};

(function () {
  const lsNotes = JSON.parse(localStorage.getItem("notes"));
  if (lsNotes === null) {
    addNote();
  } else {
    lsNotes.forEach((lsNote) => {
      addNote(lsNote);
    });
  }
})();
