const { nanoid } = require("nanoid");
const books = require("./books");

const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    const id = nanoid(16);
    const finished = pageCount == readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };

    if (newBook.name === undefined) {
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku",
        });
        response.code(400);
        return response;
    } else if (readPage > pageCount) {
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        });
        response.code(400);
        return response;
    } else {
        books.push(newBook);

        const isSuccess = books.filter((book) => book.id === id).length > 0;

        if (isSuccess) {
            const response = h.response({
                status: "success",
                message: "Buku berhasil ditambahkan",
                data: {
                    bookId: id,
                },
            });
            response.code(201);
            return response;
        }
    }
};

const getAllBooksHandler = (request, h) => {
    const query = request.query;

    if ("name" in query) {
        const book = books
            .filter((book) => book.name.toLowerCase().includes(query["name"].toLowerCase()))
            .map((data) => ({ id: data.id, name: data.name, publisher: data.publisher }));

        const response = h.response({
            status: "success",
            data: {
                books: book,
            },
        });

        return response;
    } else if ("reading" in query) {
        const book = books
            .filter((book) => book.reading == query["reading"])
            .map((data) => ({ id: data.id, name: data.name, publisher: data.publisher }));

        const response = h.response({
            status: "success",
            data: {
                books: book,
            },
        });

        return response;
    } else if ("finished" in query) {
        const book = books
            .filter((book) => book.finished == query["finished"])
            .map((data) => ({ id: data.id, name: data.name, publisher: data.publisher }));

        const response = h.response({
            status: "success",
            data: {
                books: book,
            },
        });

        return response;
    } else {
        const book = books.map((data) => ({ id: data.id, name: data.name, publisher: data.publisher }));

        const response = h.response({
            status: "success",
            data: {
                books: book,
            },
        });

        return response;
    }
};

const getBookbyIdHandler = (request, h) => {
    const bookId = request.params.bookId;
    const book = books.filter((book) => book.id === bookId)[0];

    if (book !== undefined) {
        const response = h.response({
            status: "success",
            data: {
                book,
            },
        });
        return response;
    }

    const response = h.response({
        status: "fail",
        message: "Buku tidak ditemukan",
    });
    response.code(404);
    return response;
};

const editBookByIdHandler = (request, h) => {
    const id = request.params.bookId;

    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const updatedAt = new Date().toISOString();

    if (name === undefined) {
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Mohon isi nama buku",
        });
        response.code(400);
        return response;
    } else if (readPage > pageCount) {
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        });
        response.code(400);
        return response;
    }

    const index = books.findIndex((book) => book.id === id);

    if (index === -1) {
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Id tidak ditemukan",
        });
        response.code(404);
        return response;
    } else {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt,
        };

        const response = h.response({
            status: "success",
            message: "Buku berhasil diperbarui",
        });
        response.code(200);
        return response;
    }
};

const deleteBookByIdHandler = (request, h) => {
    const id = request.params.bookId;

    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
        books.splice(index, 1);

        const response = h.response({
            status: "success",
            message: "Buku berhasil dihapus",
        });

        response.code(200);
        return response;
    }

    const response = h.response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan",
    });
    response.code(404);
    return response;
};

module.exports = { addBookHandler, getAllBooksHandler, getBookbyIdHandler, editBookByIdHandler, deleteBookByIdHandler };
