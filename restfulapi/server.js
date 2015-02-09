var restify     = require('restify'),
    mongoose    = require('mongoose'),
    fs          = require('fs'),
    MongoClient = require('mongodb').MongoClient
;


// Connect to MongoDB now
MongoClient.connect("mongodb://localhost:27017/blogs", function(err, db) {
    if(!err) {
        console.log("We are connected");
    }
});

// controller files that contain controller methods
var models = {}
    , models_path = process.cwd() + '/app/models';
// iterate through all the models and intialise them
fs.readdirSync(models_path).forEach(function (file) {
    if (~file.indexOf('.js')) require(models_path + '/' + file)
});

// controller files that contain controller methods
var controllers = {}
    , controllers_path = process.cwd() + '/app/controllers';

// iterate through all the controllers and intialise them
fs.readdirSync(controllers_path).forEach(function (file) {
    if (file.indexOf('.js') != -1) {
        controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
    }
})

var server = restify.createServer();

server.use(restify.fullResponse());
server.use(restify.bodyParser());

// Article Start
server.post("/articles", controllers.article.createArticle);
server.put("/articles/:id", controllers.article.updateArticle);
server.del("/articles/:id", controllers.article.deleteArticle);
server.get({path: "/articles/:id", version: "1.0.0"}, controllers.article.viewArticle);
server.get({path: "/articles/:id", version: "2.0.0"}, controllers.article.viewArticle_v2);
// Article End

// Comment Start
//server.post("/comments", controllers.comment.createComment);
server.put("/comments/:id", controllers.comment.updateComment);
server.del("/comments/:id", controllers.comment.deleteComment);
server.get("/comments/:id", controllers.comment.viewComment);
// Comment End

// Start server to listen to set environment port if set else port 3000
var port = process.env.PORT || 3000;

server.listen(port, function (err) {
    if (err) {
        console.log(err);
        console.log(err.stack);
    } else {
        console.log('App is ready at : ' + port)
    }

});

if (process.env.environment == 'production') {
    process.on('uncaughtException', function (err) {
        console.error(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)))
    });
}
