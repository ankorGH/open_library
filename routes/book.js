const router = require("express").Router();
const authCheck = require("./authCheck");
const BookModel = require("../model/book");
const {
  HOME,
  searchBook,
  showAddPage,
  addBook,
  showEditPage,
  editBook,
  deleteBook,
  viewBook,
  viewABook
} = require("../controller/book");

router.get("/", authCheck, HOME);

// search for a book
router.post("/search", searchBook);

// view all books
router.get("/view", viewBook);

// view a book
router.get("/view/:bookId", viewABook);

// show add a book page
router.get("/create", authCheck, showAddPage);

// add a book
router.post("/create", authCheck, addBook);

// show edit a book page
router.get("/edit/:bookId", authCheck, showEditPage);

// edit a book
router.put("/edit/:bookId", authCheck), editBook;

// delete a book
router.delete("/delete/:bookId", authCheck, deleteBook);

module.exports = router;
