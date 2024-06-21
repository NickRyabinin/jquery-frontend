import { apiUrl } from "./main.js";
import { buildTable, buildForm } from "./builder.js";

function authorizeUser() {
  const fillableProperties = ['token'];
  const form = buildForm(fillableProperties);
  $('main').append(form);

  form.submit(function (event) {
    event.preventDefault();

    const token = $('#token').val();
    sessionStorage.setItem('token', token);
    alert('User authorized with token:\n' + token);

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
        alert("Token: " + responseData.token);
      })
      .fail(function (jqXHR) {
        const errorResponse = JSON.parse(jqXHR.responseText);
        alert("Ошибка: " + errorResponse.error);
      });

    form.off('submit');
  });
}

function readUser(id = "") {
  $.get(apiUrl + "users/" + id, function (data, status) {
    if (status === 'success') {
      const tableElement = buildTable(data);
      $('main').append(tableElement);

      $('td').click(function () {
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

export { authorizeUser, createUser, readUser, updateUser, deleteUser };