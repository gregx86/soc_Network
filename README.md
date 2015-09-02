##### This application will work if you run mongod
**Application testing with POSTMAN**

**get All users**, *localhost:3030/users/*

**post user**, *localhost:3030/users/*

##### Sample for post in JSON

```json
[
  {
    "name": "Grisha",
    "sourname": "Rozhnov",
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


**get user**, *localhost:3030/users/id*

**put**,  *localhost:3030/users/id*

**put**,  *localhost:3030/users/id*

**putch**, *localhost:3030/users/id*

**delete**, *localhost:3030/users/id*
