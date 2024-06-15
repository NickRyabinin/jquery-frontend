import { buildTable } from "./builder.js";

function createBook() {
  alert('Create function called');
}

function readBook(id = "") {
  $.get("http://php-crud-api.alwaysdata.net/books/" + id, function(data, status){
    if (status === 'success') {
      const tableElement = buildTable(data);
      $('main').append(tableElement);

      $('td').click(function() {
        if ($(this).index() === $('th:contains("id")').index()) {
          if ($(this).text()) {
            readBook($(this).text());
          }
        }
      });
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