/**
 * Created by mankind on 10/02/15.
 */
var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

// Define schema for Articles
var ArticleSchema = new Schema({
    title   : String,
    slug    : String,
    content : String,
    author  : {
        type: String,
        ref : "User"
    }
});
mongoose.model('Article', ArticleSchema);

