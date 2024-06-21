import { apiUrl } from "./main.js";
import { buildTable, buildForm } from "./builder.js";

function createBook() {
  const fillableProperties = ["title", "author", "published_at"];
  const form = buildForm(fillableProperties);
  $('main').append(form);

  form.submit(function (event) {
    event.preventDefault();

    const formData = JSON.stringify({
      "title": $('#title').val(),
      "author": $('#author').val(),
      "published_at": $('#published_at').val()
    });

    const token = sessionStorage.getItem('token');

    /* $.post(apiUrl + "books/", formData)
      .done(function (responseData) {
        alert(responseData.message);
      })
      .fail(function (jqXHR) {
        const errorResponse = JSON.parse(jqXHR.responseText);
        alert("Ошибка: " + errorResponse.error);
      }); */

    $.ajax({
      url: apiUrl + "books/",
      type: 'POST',
      data: formData,
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      success: function (responseData) {
        alert(responseData.message);
      },
      error: function (jqXHR) {
        const errorResponse = JSON.parse(jqXHR.responseText);
        alert("Ошибка: " + errorResponse.error);
      }
    });

    form.off('submit');
  });
}

function readBook(id = "") {
  $.get(apiUrl + "books/" + id, function (data, status) {
    if (status === 'success') {
      const tableElement = buildTable(data);
      $('main').append(tableElement);

      $('td').click(function () {
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