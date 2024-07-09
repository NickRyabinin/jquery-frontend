import { apiUrl } from "./main.js";
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
    showMessage('User authorized with token:\n' + token);

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

    $.post(apiUrl + "users/", formData)
      .done(function (responseData) {
        showMessage("Token: " + responseData.token);
      })
      .fail(function (jqXHR) {
        const errorResponse = JSON.parse(jqXHR.responseText);
        showMessage("Ошибка: " + errorResponse.error);
      });

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
      showMessage("Ошибка: " + errorResponse.error);
    });
}

function updateUser() {
  $.ajax({
    url: apiUrl + "users/",
    type: 'PUT',

    success: function (responseData) {
      showMessage(responseData.message);
    },
    error: function (jqXHR) {
      const errorResponse = JSON.parse(jqXHR.responseText);
      showMessage("Ошибка: " + errorResponse.error);
    }
  });
}

function deleteUser() {
  const token = sessionStorage.getItem('token');

  $.ajax({
    url: apiUrl + "users/",
    type: 'DELETE',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    },
    success: function (responseData) {
      sessionStorage.removeItem('token');
      showMessage(responseData.message);
    },
    error: function (jqXHR) {
      const errorResponse = JSON.parse(jqXHR.responseText);
      showMessage("Ошибка: " + errorResponse.error);
    }
  });
}

export { authorizeUser, createUser, readUser, updateUser, deleteUser };