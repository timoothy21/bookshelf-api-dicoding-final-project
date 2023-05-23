const { addBookHandler, getAllBooksHandler, getBookbyIdHandler, editBookByIdHandler } = require("./handler");

const routes = [
    {
        method: "POST",
        path: "/books",
        handler: addBookHandler,
    },
    {
        method: "GET",
        path: "/books",
        handler: getAllBooksHandler,
    },
    {
        method: "GET",
        path: "/books/{bookId}",
        handler: getBookbyIdHandler,
    },
    {
        method: "PUT",
        path: "/books/{bookId}",
        handler: editBookByIdHandler,
    },
];

module.exports = routes;
