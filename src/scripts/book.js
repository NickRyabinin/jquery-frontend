import { buildTable } from "./builder.js";

function createBook() {
  alert('Create function called');
}

function readBook() {
  $.get("http://php-crud-api.alwaysdata.net/books/", function(data, status){
    if (status === 'success') {
      const tableElement = buildTable(data);
      $('main').append(tableElement);
    }
  });
}

function updateBook() {
  alert('Update function called');
}

function deleteBook() {
  alert('Delete function called');
}

export { createBook, readBook, updateBook, deleteBook };