const router = require("express").Router();
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const Book = require("../models/book.js");
const { authenticateToken } = require("./userAuth.js");

//admin
router.post("/add-book", authenticateToken, async (req, res) => {
  try {
    //check if the is admin or not
        const { id } = req.headers;
        const user = await User.findById(id);
        if (user.role !== "admin") {
          return res.status(400).json({ message: "You dont have the access to perform this" });
        }
    const book = new Book({
      url: req.body.url,
      title: req.body.title,
      author:req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language:req.body.language,
    });
    await book.save();
    res.status(200).json({ message: "Book added Successfully" });
  }
  catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
  
})

//update Book
router.put("/update-book", authenticateToken, async (req, res) => {
  try {
    console.log(req.body);
    const { bookid } = req.headers;
    await Book.findByIdAndUpdate(bookid, {
      url: req.body.url,
      title: req.body.title,
      author:req.body.author,
      price:Number(req.body.price),
      desc: req.body.desc,
      language:req.body.language,
    });
    return res.status(200).json({
      message: "Book Details Updated Successfully",
    })
  }
  catch (error) {
  //  console.log(error);
    return res.status(500).json({ message: "An Error Occurred" });
  }
});

//Delete Book
router.delete("/delete-book", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;
    await Book.findByIdAndDelete(bookid);
    return res.status(200).json({
      message: "Book Removed Successfully",
    })
  }
  catch (error) {
   //console.log(error);
    res.status(500).json({ message: "An Error Occurred" });
  }
});

//Get-all Book
router.get("/get-all-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createAt: -1 });
    return res.json({
      status: "Success",
      data: books, 
    });
  }
  catch (error) {
    res.status(500).json({ message: "An Error Occurred" });
  }
});
//Get-recent-services
router.get("/get-recent-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(4);
    return res.json({
      status: "Success",
      data: books,
    });
  }
  catch (error) {
    res.status(500).json({ message: "An Error Occurred" });
  }
});

//get services by id
router.get("/get-book-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.json({
      status: "Success",
      data:book,
    });
  }
  catch (error) {
    return res.status(500).json({ message: "An Error Occurred" });
  }
});

module.exports = router;
// res.status(500).json({ message: "Internal Server error" });