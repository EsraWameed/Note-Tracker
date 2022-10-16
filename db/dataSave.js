const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid'); 
const viewNote = util.promisify(fs.readFile);
const noteCompose = util.promisify(fs.writeFile);
//create class noteSave with methods write(), read(), fetchNote(), noteAdd(), and noteDelete()
class noteSave {
    //convert to json strong
    write(newNote){
        return noteCompose('db/db.json', JSON.stringify(newNote));
    }

    read(){
        return viewNote('db/db.json', 'utf8'); 
    }
    //concat note to array and turn it into javaScript object
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
        const { title, text} = newNote;
        if (!title || !text){
            throw new Error ("Ensure to add a title or text please")
        }
        // adding an id to target each unique note
        const addNewNote = {title, text, id: uuidv4()};

        return this.fetchNote().then(newNotes => [...newNotes,addNewNote])
        .then(noteUpdate=> this.write(noteUpdate))
        .then(()=> addNewNote);
    }
        //deleting notes
    noteDelete(id){
        return this.fetchNote().then(newNotes=>newNotes.filter(newNotes=> newNotes.id !==id))
        .then(targetNotes=> this.write(targetNotes));
    }
}

module.exports = new noteSave();