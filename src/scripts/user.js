import { apiUrl } from "./main.js";
import { buildTable, buildForm, buildPaginationButtons } from "./builder.js";

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
  $.get(apiUrl + "users/" + id, function (rawData, status) {
    if (status === 'success') {
      let data = (id === "") ? rawData['items'] : rawData;
      const tableElement = buildTable(data);
      const paginationButtons = buildPaginationButtons();
      $('main').append(tableElement, paginationButtons);

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
      alert(responseData.message);
    },
    error: function (jqXHR) {
      const errorResponse = JSON.parse(jqXHR.responseText);
      alert("Ошибка: " + errorResponse.error);
    }
  });
}

export { authorizeUser, createUser, readUser, deleteUser };