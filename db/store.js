const util = require("util");
const fs = require("fs");

const uuidv1 = require("uuidv1");
// const { json } = require("express");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  read() {
    return readFileAsync("db/db.json", "utf8");
  }

  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }

  //create a function to get note
  getNotes() {
    return this.read().then((notes) => {
      return JSON.parse(notes);
    });
  }

  //create a function to add note
  addNote(note) {
    const newNote = { title: note.title, text: note.text, id: uuidv1() };
    console.log(newNote);
    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((unpdatedNote) => this.write(unpdatedNote))
      .then(() => newNote);
  }
  //create a function to remove note by id

  deleteNote(id) {
    return this.getNotes()
      .then(notes => notes.filter(note => note.id !== id))
      
      .then(updatedNotes => this.write(updatedNotes));
  }
}

module.exports = new Store();
