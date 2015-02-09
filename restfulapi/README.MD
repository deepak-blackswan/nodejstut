## RESTFUL API BOILERPLATE ##


## In a Blogging API, we need: ##

* Create, Update, Delete, View Article
* Create a comment for a specific Article, Update, Delete, View, Comment
* Create, Update, Delete, View User

Resource Name   |   HTTP Verbs      |	HTTP Methods
----------------------------------------------------------------------------------
Article	        |   create Article  |   POST /articles with Payload
                |   update Article  |   PUT /articles/123 with Payload
                |   delete Article  |   DELETE /articles/123
                |   view Article    |   GET /article/123
----------------------------------------------------------------------------------
Comment	        |   create Comment  |   POST /articles/123/comments with Payload
                |   update Comment  |   PUT /comments/123 with Payload
                |   delete Comment  |   DELETE /comments/123
                |   view Comment    |   GET /comments/123
----------------------------------------------------------------------------------
User	        |   create User     |   POST /users with Payload
                |   update User     |   PUT /users/123 with Payload
                |   delete User     |   DELETE /users/123
                |   view User       |   GET /users/123
-----------------------------------------------------------------------------------


