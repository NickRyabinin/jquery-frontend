import { apiUrl, makeAjaxRequest } from "./main.js";
import { buildTable, buildForm, buildPaginationButtons, setPaginationActions } from "./builder.js";
import { showMessage } from "./view.js";

function authorizeUser() {
  const fillableProperties = ['token'];
  const form = buildForm(fillableProperties);
  $('main').append(form);

  form.submit(function (event) {
    event.preventDefault();

    const token = $('#token').val();
    sessionStorage.setItem('token', token);
    showMessage({message: 'User authorized with token' + '<br>' + token});

    form.off('submit');
  });

  return;
}

function createUser() {
  const fillableProperties = ["login", "email"];
  const form = buildForm(fillableProperties);
  $('main').append(form);

  form.submit(function (event) {
    event.preventDefault();

    const formData = JSON.stringify({
      "login": $('#login').val(),
      "email": $('#email').val()
    });

    makeAjaxRequest(apiUrl + "users/", 'POST', formData);

    form.off('submit');
  });
}

function readUser(id = "", page = 1) {
  let query = (id === "") ? '?page=' + page : "";
  $.get(apiUrl + "users/" + id + query)
    .done(function (rawData) {
      let data = (id === "") ? rawData['items'] : rawData;
      const tableElement = buildTable(data);
      $('main').append(tableElement);
      if (id === "") {
        const paginationButtons = buildPaginationButtons();
        $('main').append(paginationButtons);
        setPaginationActions(readUser, page);
      }

      $('td').click(function () {
        if ($(this).index() === $('th:contains("id")').index()) {
          if ($(this).text()) {
            readUser($(this).text());
          }
        }
      });
    })
    .fail(function (jqXHR) {
      const errorResponse = JSON.parse(jqXHR.responseText);
      showMessage(errorResponse);
    });
}

function updateUser() {
  makeAjaxRequest(apiUrl + "users/", 'PUT');
}

function deleteUser() {
  makeAjaxRequest(apiUrl + "users/", 'DELETE');
  sessionStorage.removeItem('token');
}

export { authorizeUser, createUser, readUser, updateUser, deleteUser };