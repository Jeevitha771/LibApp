const express = require("express");
const router = express.Router();
require("../db/conn");
//const Library = require("../model/librarySchema");
const Library = require("../model/libraryModel");
router.get("/", (req, res) => {
  res.send("hello world from router.js");
});
router.post("/registerBook", (req, res) => {
  const { BookName, Description, Author, Comment, Status } = req.body;

  // Check for missing fields
  if (!BookName || !Description || !Author || !Comment || !Status) {
    return res
      .status(422)
      .json({ error: "Please fill in all fields properly" });
  }

  // Check if the book already exists
  Library.findOne({ BookName })
    .then((bookExist) => {
      if (bookExist) {
        return res.status(422).json({ error: "Book already exists" });
      }

      // If book doesn't exist, create a new entry
      const library = new Library({
        BookName,
        Description,
        Author,
        Comment,
        Status,
      });

      // Save the new book entry
      library
        .save()
        .then(() => {
          return res.status(201).json({ message: "Created successfully" });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: "Failed to create the book" });
        });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "An error occurred while registering the book" });
    });
});

router.get("/Allbooks", (req, res) => {
  Library.find()
    .then((books) => res.json(books))
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving books" });
    });
});

router.get("/Onebook/:bookName", (req, res) => {
  const { bookName } = req.params;

  Library.findOne({ BookName: bookName })
    .then((book) => {
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
      res.json(book);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving the book" });
    });
});

router.put("/Updatebook/:bookName", (req, res) => {
  const { bookName } = req.params; // Get the book name from the URL parameter
  const { BookName, Description, Author, Comment, Status } = req.body; // Get the new data from the request body

  // Update the book with the matching BookName
  Library.findOneAndUpdate(
    { BookName: bookName }, // Search condition
    { BookName, Description, Author, Comment, Status }, // New data
    { new: true, runValidators: true } // Options
  )
    .then((book) => {
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
      res.json(book); // Send the updated book data as a response
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "An error occurred while updating the book" });
    });
});

router.delete("/Deletebook/:bookName", (req, res) => {
  const { bookName } = req.params; // Get the book name from the URL parameter

  // Find and remove the book with the matching BookName
  Library.findOneAndDelete({ BookName: bookName })
    .then((book) => {
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
      res.json({ message: "Book deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the book" });
    });
});

module.exports = router;
