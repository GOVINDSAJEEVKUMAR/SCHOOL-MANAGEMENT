import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../../Redux/librarySlice';
import { FaBook, FaUser, FaClipboardList } from 'react-icons/fa';

const Book = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.library);

  // Fetch books when the component mounts
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Book List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="bg-white border border-gray-300 rounded-lg shadow-lg p-4">
              <div className="flex flex-col items-center">
                <FaBook className="text-4xl text-blue-500 mb-2" />
                <h2 className="text-lg font-semibold mb-1">{book.bookname}</h2>
                <p className="text-gray-600">Author: {book.author}</p>
                <p className="text-gray-600">Edition: {book.edition}</p>
                <p className="text-gray-600">Quantity: {book.quantity}</p>
                <p className="text-gray-600">Date: {book.date}</p>
                <p className="text-gray-600">Remarks: {book.remarks}</p>
              </div>
              
            </div>
          ))
        ) : (
          <p>No books available</p>
        )}
      </div>
    </div>
  );
};

export default Book;
