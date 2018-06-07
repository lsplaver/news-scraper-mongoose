var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// creates a custom note schema for use by the note constructor
var NoteSchema = new Schema({
    // noteTitle is the title for each note object
    noteTitle: {
        type: String,
        // reuired is true so that if you create the object it has to have a title
        required: true,
        // requires title to be unique for each note, hopefully enabling multiple notes per article rather than overwriting the previous notes
        unique: true
    },

    // noteBody is the body for each note object
    noteBody: {
        type: String,
        // reuired is true so that if you create the object it has to have a body
        required: true,
        // specifies that the body text does NOT have to be unique for each individual note, hopefully enabling multiple notes per article rather than overwriting the previous notes, but enabling it to use the same text as a prior on the same article
        unique: false
    },

    //noteAuthor is the user who created the specific note
    noteAuthor: {
        type: String,
        // required is true so that you know who created the note
        required: true
    },

    //noteID is the unique id for each note but with a scope of only the article it is attached to
    noteID: {
        type: Number,
        // requiresd is true to ensure that each one has a local id number
        required: true,
        // sets that the minimum value is 0 at creation of individual objects
        min: 0
        // default value set at time of creation and then updated as needed
    },

    // noteCreated is the date when it was created
    noteCreated: {
        type: Date,
        required: true,
        default: Date.now()
    },

    // noteUpdates is the date when it was updated
    noteUpdates: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;