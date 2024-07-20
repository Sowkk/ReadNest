import express from "express"
import { Book } from "../models/bookModel.js"


const bookRouter = express.Router()

//to add a new book
bookRouter.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) { response.status(400).send({ message: 'Send all required fields: title,author,publishYear' }) }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        }
        const book = await Book.create(newBook)
        return response.status(201).send({ message: 'Successfully added a new book ', book })
    }


    catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
})

//to get all books in ReadNest
bookRouter.get('/', async (request, response) => {
    try {
        const books = await Book.find()
        return response.status(201).send({books})
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
})

//get a specific book by its id
bookRouter.get('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const book = await Book.findById(id)
        return response.status(201).json({book})

    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
})

///update a book by its id
bookRouter.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) { return response.status(400).send({ message: 'Send all required fields: title,author,publishYear' }) }

        const { id } = request.params
        const result = await Book.findByIdAndUpdate(id, request.body, { new: true })

        if (!result) {
            response.status(404).json({ message: 'Book not found' })
        }

        return response.status(200).json({ message: `Book with ${id} got updated successfully`, result })

    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
})

//delete a book by its id
bookRouter.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const result = await Book.findByIdAndDelete(id)

        if (!result) {
            return response.status(404).json({ message: "Book not found" })
        }
        return response.status(200).json({ message: "Book got deleted successfully" })

    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
})

export default bookRouter