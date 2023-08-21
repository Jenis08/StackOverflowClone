# Stack Over Flow Backend APIs

render_link: https://stackoverflowclone-shipmnts.onrender.com

#setup steps

step 1: npm i

step 2: update MongoDB URL and JWT_SECRET

step 3: node index.js

# API 

<h3>Register</h3>

link: render_link/register

req body 

```json
{
	"username" : "string",
    "password" : "string"
}
```



<h3>login</h3>

link: render_link/login

req body 

```json
{
	"username" : "string",
    "password" : "string"
}
```

<h3>Post Question</h3>

link: render_link/addQues

req body 

```json
{
	"question" : "string"
}
```

<h3>Update Question</h3>

link: render_link/updateQues/:id

req body 

```json
{
	"question" : "string"
}
```



<h3>Delete Question</h3>

link: render_link/delete/:id

<h3>Get All Question</h3>

link:  render_link/getall

<h3>Upvote Question</h3>

link:  render_link/upvote/:id

<h3>Down Question</h3>

link:  render_link/downvote/:id

<h3>Add Comment</h3>

link:  render_link/comment/:id
