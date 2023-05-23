const { addBookHandler, getAllBooksHandler, getBookbyIdHandler } = require("./handler");

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
];

module.exports = routes;
