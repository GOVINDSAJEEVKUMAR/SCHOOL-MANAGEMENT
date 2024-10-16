import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa';
import {
  fetchBooks,
  addBook,
  editBook,
  deleteBook,
} from '../../Redux/librarySlice';

const Library = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.library);
  const [bookData, setBookData] = useState({
    bookname: '',
    author: '',
    edition: '',
    quantity: '',
    date: '',
    remarks: '',
  });
  const [editingBookId, setEditingBookId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleAddBook = () => {
    dispatch(addBook(bookData));
    setBookData({
      bookname: '',
      author: '',
      edition: '',
      quantity: '',
      date: '',
      remarks: '',
    });
    setShowForm(false);
  };

  
  const handleEditBook = () => {
    dispatch(editBook({ id: editingBookId, bookData })).then((response) => {
      
      const updatedBook = response.payload; 
      const updatedBooks = books.map((book) =>
        book._id === updatedBook._id ? updatedBook : book
      );
      setBooks(updatedBooks); 
    });
    setEditingBookId(null);
    setBookData({
      bookname: '',
      author: '',
      edition: '',
      quantity: '',
      date: '',
      remarks: '',
    });
    setShowForm(false);
  };

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingBookId) {
      handleEditBook();
    } else {
      handleAddBook();
    }
  };

  const handleEditClick = (book) => {
    setBookData(book);
    setEditingBookId(book._id);
    setShowForm(true);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    if (!showForm) {
      setBookData({
        bookname: '',
        author: '',
        edition: '',
        quantity: '',
        date: '',
        remarks: '',
      });
      setEditingBookId(null);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Library Management</h1>

      <div className="flex justify-center mb-4">
        <button
          onClick={toggleForm}
          className="bg-black text-white py-2 px-4 rounded flex items-center"
        >
          {showForm ? (
            <>
              <FaTimes className="mr-2" />
              Close Form
            </>
          ) : (
            <>
              <FaPlus className="mr-2" />
              Add New Book
            </>
          )}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-gray-100 rounded shadow-lg mb-8">
          <div className="grid grid-cols-2 gap-4">
            <h2>Book Name</h2>
            <input
              type="text"
              name="bookname"
              placeholder="Book Name"
              value={bookData.bookname}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
            <h2>Author</h2>
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={bookData.author}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
            <h2>Edition</h2>
            <input
              type="text"
              name="edition"
              placeholder="Edition"
              value={bookData.edition}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <h2>Quantity</h2>
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={bookData.quantity}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <h2>Added Date</h2>
            <input
              type="date"
              name="date"
              placeholder="Date"
              value={bookData.date}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <h2>Remarks</h2>
            <input
              type="text"
              name="remarks"
              placeholder="Remarks"
              value={bookData.remarks}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-purple-500 text-white py-2 px-4 rounded flex justify-center items-center"
          >
            {editingBookId ? 'Update Book' : 'Add Book'}
            <FaPlus className="ml-2" />
          </button>
        </form>
      )}

      <h2 className="text-2xl font-semibold mb-4">Book List</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul className="space-y-4">
          {books.length > 0 ? (
            books.map((book) => (
              <li key={book._id} className="bg-gray-100 p-4 rounded-lg shadow flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">{book.bookname}</h3>
                  <p>Author: {book.author}</p>
                  <p>Edition: {book.edition}</p>
                  <p>Quantity: {book.quantity}</p>
                  <p>Date: {book.date}</p>
                  <p>Remarks: {book.remarks}</p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleEditClick(book)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteBook(book._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>No books available</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Library;
