import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton'
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        console.log(response);
        setBook(response.data.book);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center min-h-screen p-4">
      <div className="relative w-full max-w-2xl">
        {/* Container for BackButton and heading */}
        <div className="flex items-center justify-center mb-4 realtive top-2">
          {/* <div className="absolute left-0 top-0 ml-4"> */}
          <BackButton destination='/'/>
          {/* </div> */}
          <h1 className="text-2xl text-center flex-grow text-sky-800">Book Details</h1>
        </div>

        {/* Card container */}
        <div className="bg-white shadow-lg rounded-xl p-4 mx-auto">
          {loading ? (
            <Spinner />
          ) : (
            <div className="grid gap-0 ">
              <div className="grid grid-cols-2 gap-4 px-7 py-4 bg-gray-100">
                <p className="text-xl font-semibold text-black">ID:</p>
                <p className="text-lg text-gray-700">{book._id}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 px-7 py-4 bg-gray-50 ">
                <p className="text-xl font-semibold text-black">Title:</p>
                <p className="text-lg text-gray-700">{book.title}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 px-7 py-4 bg-gray-100">
                <p className="text-xl font-semibold text-black">Author:</p>
                <p className="text-lg text-gray-700">{book.author}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 px-7 py-4 bg-gray-50 ">
                <p className="text-xl font-semibold text-black">Publish Year:</p>
                <p className="text-lg text-gray-700">{book.publishYear}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 px-7 py-4 bg-gray-100">
                <p className="text-xl font-semibold text-black">Create Time:</p>
                <p className="text-lg text-gray-700">{new Date(book.createdAt).toLocaleString()}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 px-7 py-4 bg-gray-50 ">
                <p className="text-xl font-semibold text-black">Last Update Time:</p>
                <p className="text-lg text-gray-700">{new Date(book.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowBook;
