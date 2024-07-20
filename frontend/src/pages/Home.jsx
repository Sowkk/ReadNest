import { useState, useEffect } from "react";
import axios from 'axios';
import Spinner from '../components/Spinner';
import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { FiEdit, FiTrash, FiPlusCircle } from 'react-icons/fi';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5555/books')
            .then((response) => {
                setBooks(response.data.books);
                setLoading(false);
            }).catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-4 text-lg bg-gradient-to-br from-gray-200 to-gray-300 min-h-screen flex flex-col items-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Books List</h1>
            <div className="flex justify-end w-full max-w-4xl mb-4">
                <Link to={'/books/create'} className="flex items-center text-sky-800 hover:text-sky-600">
                    <FiPlusCircle className="text-3xl mr-2" />
                    <span className="text-xl ">Add Book</span>
                </Link>
            </div>
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
                {loading ? (
                    <Spinner />
                ) : (
                    <table className="w-full">
                        <thead className="bg-balck text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-base font-bold text-gray-700 uppercase tracking-wider">No</th>
                                <th className="px-6 py-3 text-left text-base font-bold text-gray-700 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-base font-bold text-gray-700 uppercase tracking-wider">Author</th>
                                <th className="px-6 py-3 text-left text-base font-bold text-gray-700 uppercase tracking-wider">Publish Year</th>
                                <th className="px-6 py-3 text-left text-base font-bold text-gray-700 uppercase tracking-wider">Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book, index) => (
                                <tr key={book._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                    <td className="px-5 py-4 whitespace-nowrap">{index + 1}</td>
                                    <td className="px-5 py-4 whitespace-nowrap">{book.title}</td>
                                    <td className="px-5 py-4 whitespace-nowrap">{book.author}</td>
                                    <td className="px-5 py-4 whitespace-nowrap">{book.publishYear}</td>
                                    <td className="px-5 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-4">
                                            <Link to={`/books/details/${book._id}`} className="text-gray-600 hover:text-sky-600">
                                                <AiOutlineInfoCircle className="text-xl" />
                                            </Link>
                                            <Link to={`/books/edit/${book._id}`} className="text-gray-600 hover:text-sky-600">
                                                <FiEdit className="text-xl" />
                                            </Link>
                                            <Link to={`/books/delete/${book._id}`} className="text-gray-600 hover:text-sky-600">
                                                <FiTrash className="text-xl" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default Home;
