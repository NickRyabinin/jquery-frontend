import { buildTable } from "./builder.js";

function createUser() {
  alert('Create function called');
}

function readUser(id = "") {
  $.get("http://php-crud-api.alwaysdata.net/users/" + id, function(data, status){
    if (status === 'success') {
      const tableElement = buildTable(data);
      $('main').append(tableElement);

      $('td').click(function() {
        if ($(this).index() === $('th:contains("id")').index()) {
          if ($(this).text()) {
            readUser($(this).text());
          }
        }
      });
    }
  });
}

function updateUser() {
  alert('Update function called');
}

function deleteUser() {
  alert('Delete function called');
}

export { createUser, readUser, updateUser, deleteUser };