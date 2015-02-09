/**
 * Created by mankind on 10/02/15.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Scema;

var UserSchema   = new Schema({
    email: String,
    password: String,
    token: String
});

module.exports = mongoose.model('User', UserSchema);