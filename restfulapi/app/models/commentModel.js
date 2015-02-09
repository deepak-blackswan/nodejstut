/**
 * Created by mankind on 10/02/15.
 */
var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

// Define schema for Comments
var CommentSchema = new Schema({
    text        : String,
    article     : {
        type    : String,
        ref     : "Article"
    },
    author: {
        type    : String,
        ref     : "User"
    }
});
mongoose.model('Comment', CommentSchema);