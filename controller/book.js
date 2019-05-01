const BookModel = require("../model/book");

// show user page
const HOME = async (req, res) => {
  try {
    const books = await BookModel.find({ addedBy: req.user._id });
    res.render("user", { books });
  } catch (e) {
    console.log(e);
  }
};

module.exports.HOME = HOME;

// search for a book
const searchBook = async (req, res) => {
  let { book } = req.body;
  try {
    book = book.toLowerCase();
    const books = await BookModel.find({
      $or: [{ title: book }, { genre: book }]
    });
    res.render("search", { books });
  } catch (e) {
    console.log(e);
  }
};

module.exports.searchBook = searchBook;

// view all books
const viewBook = async (req, res) => {
  try {
    const books = await BookModel.find();
    res.render("view_all_books", { books });
  } catch (e) {
    console.log(e);
  }
};

module.exports.viewBook = viewBook;

// view a book
const viewABook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await BookModel.findById(bookId);
    res.render("view_book", { book });
  } catch (e) {
    console.log(e);
  }
};

module.exports.viewABook = viewABook;

// show add a book page
const showAddPage = (req, res) => {
  res.render("add_book");
};

module.exports.showAddPage = showAddPage;

// add a book
const addBook = async (req, res) => {
  const { title, author, genre } = req.body;
  try {
    let book = new BookModel({ title, author, genre, addedBy: req.user.id });
    book = await book.save();
    res.redirect("/book");
  } catch (e) {
    console.log(e);
  }
};

module.exports.addBook = addBook;

// show edit a book page
const showEditPage = async (req, res) => {
  const { bookId } = req.params;
  try {
    const book = await BookModel.findById(bookId);
    res.render("edit_book", { book });
  } catch (e) {
    console.log(e);
  }
};

module.exports.showEditPage = showEditPage;

// editBook
const editBook = async (req, res) => {
  const { title, author, genre } = req.body;
  const { bookId } = req.params;
  try {
    const updatedBook = await BookModel.updateOne(
      { _id: bookId, addedBy: req.user._id },
      { title, author, genre }
    );
    res.redirect("/book");
  } catch (e) {
    console.log({ e });
  }
};

module.exports.editBook = editBook;

// delete a book
const deleteBook = async (req, res) => {
  const { bookId } = req.params;
  try {
    const deletedBook = await BookModel.deleteOne({
      _id: bookId,
      addedBy: req.user._id
    });
    res.redirect("/book");
  } catch (e) {
    console.log(e);
  }
};

module.exports.deleteBook = deleteBook;
