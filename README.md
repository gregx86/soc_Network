##### This application will work on Windows if you run mongod

**get All users**, *localhost:3030/users/*

**post user**, *localhost:3030/users/*

##### Sample for post in JSON

```json
[
  {
    "name": "Grisha",
    "sourname": "Rozhnov",
    "email": "gr@gmail.com",
    "age": 29,
    "posts": [
      {
        "title": "first post",
        "description": "My first post"
      }
    ]
  }
]
```
#### User routes

**get user**, *localhost:3030/users/id*

**put**,  *localhost:3030/users/id*

**put**,  *localhost:3030/users/id*

**putch**, *localhost:3030/users/id*

**delete**, *localhost:3030/users/id*

#### Post routes

**get post**,  *localhost:3030/users/id/posts/*

**get put**,  *localhost:3030/users/id/posts/postId*

**delete**,  *localhost:3030/users/id/posts/postId*


