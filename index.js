// implement your API here
const express = require("express");
const db = require("./data/db.js");
const port = 5000;
const server = express();

server.use(express.json());

server.listen(port, () => {
  console.log(`server up and running on port ${port}.`);
});

server.post("/api/users", (req, res) => {
  const userInfo = req.body
  if(userInfo.name && userInfo.bio) {
    db.insert(userInfo)
      .then(response => {
        res.json(response);
        res.status(200);
      })
      .catch(error => {
        res.json(error);
        res.status(500);
      });
  } else {
    res.json({ errorMessage: "Please provide name and bio for the user." })
    res.status(400);
  }
});

server.get("/", (req, res) => {
  res.send("it's working");
});

server.get("/api/users", (req, res) => {
  db.find()
    .then(response => {
      res.json(response);
      res.status(201);
    })
    .catch(error => {
      res.json({ error: "The users information could not be retrieved." });
      res.status(500);
    });
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(response => {
      console.log(response)
      if(!response) {
        res.json({ message: "The user with the specified ID does not exist." });
        res.status(404);
      } else {
      res.json(response);
      res.status(200);
      }
    })
    .catch(error => {
      res.json({ error: "The user information could not be retrieved." });
      res.status(500);
    });
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(response => {
      res.json(response);
      res.status(200);
    })
    .catch(error => {
      res.json({ error: "The user could not be removed" });
      res.status(500);
    });
});

server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const userInfo = req.body;

  db.update(id, userInfo)
    .then(response => {
      res.json(response);
      res.status(200);
    })
    .catch(error => {
      res.json(error);
      res.status(500);
    });
});
