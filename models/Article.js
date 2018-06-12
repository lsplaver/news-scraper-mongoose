var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// creates a custom article schema for use by the article constructor
var ArticleSchema = new Schema({
    // headline is the class name for the title of the article from scaped site, but value is plain text of <a> tag
    headline: {
        type: String,
        required: true,
        trrim: true
    },

    // blurb is the class name for the summary of the article from scraped site, but value is the plain text of the <div> tag with class='blurb'
    blurb: {
        type: String,
        required: true
    },

    // link actually comes before headline on the main page of scraped site, as the href property
    link: {
        type: String,
        required: true
    },

    // Author's byline and link to profile of the article from the scraped site, both from property and plain text of <a> tag
    author: {
        authorName: {
            type: String,
            required: false
        },
        authorLink: {
            type: String,
            required: false
        }
    },

    // linking the note created by the constructor and schema in Note.js
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;