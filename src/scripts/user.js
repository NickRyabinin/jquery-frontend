import { buildTable } from "./builder.js";

function createUser() {
  alert('Create function called');
}

function readUser() {
  $.get("http://php-crud-api.alwaysdata.net/users/", function(data, status){
    if (status === 'success') {
      const tableElement = buildTable(data);
      $('main').append(tableElement);
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