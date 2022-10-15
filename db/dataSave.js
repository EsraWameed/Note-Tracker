const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid'); 
const viewNote = util.promisify(fs.readFile);
const noteCompose = util.promisify(fs.writeFile);

class noteSave {
    write(newNote){
        return noteCompose('db/db.json', JSON.stringify(newNote));
    }

    read(){
        return viewNote('db/db.json', 'utf8'); 
    }

    fetchNote(){
        return this.read().then(newNotes=>{
            let noteScan;
            try{
                noteScan = [].concat(JSON.parse(newNotes));
            } catch (error){
                noteScan = [];
            }

            return noteScan;
        });
    }

    noteAdd(newNote){
        const { title, text} = note;
        if (!title || !text){
            throw new Error ("Ensure to add a title or text please")
        }

        const addNewNote = {title, text, id: uuidv4()};

        return this.fetchNote().then(newNotes => [...newNotes,addNewNote])
        .then(noteUpdate=> this.write(noteUpdate))
        .then(()=> addNewNote);
    }
}

module.exports = new noteSave();