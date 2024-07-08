import { apiUrl } from "./main.js";
import { buildTable, buildForm, buildPaginationButtons, setPaginationActions } from "./builder.js";
import { showMessage } from "./view.js";

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

    $.ajax({
      url: apiUrl + "books/",
      type: 'POST',
      data: formData,
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      success: function (responseData) {
        showMessage(responseData.message);
      },
      error: function (jqXHR) {
        const errorResponse = JSON.parse(jqXHR.responseText);
        showMessage("Ошибка: " + errorResponse.error);
      }
    });

    form.off('submit');
  });
}

function readBook(id = "", page = 1) {
  let query = (id === "") ? '?page=' + page : "";
  $.get(apiUrl + "books/" + id + query)
    .done(function (rawData) {
      let data = (id === "") ? rawData['items'] : rawData;
      const tableElement = buildTable(data);
      $('main').append(tableElement);
      if (id === "") {
        const paginationButtons = buildPaginationButtons();
        $('main').append(paginationButtons);
        setPaginationActions(readBook, page);
      }

      $('td').click(function () {
        if ($(this).index() === $('th:contains("id")').index()) {
          if ($(this).text()) {
            readBook($(this).text());
          }
        }
      });
    })
    .fail(function (jqXHR) {
      const errorResponse = JSON.parse(jqXHR.responseText);
      showMessage("Ошибка: " + errorResponse.error);
    });
}

function updateBook() {
  let isFirstFormSubmitted = false;

  const fillableProperties = ["id"];
  const form = buildForm(fillableProperties);
  $('main').append(form);

  form.submit(function (event) {
    event.preventDefault();
    const id = $('#id').val();
    isFirstFormSubmitted = true;
    form.off();

    if (isFirstFormSubmitted) {
      const fillableProperties = ["title", "author", "published_at"];
      const form = buildForm(fillableProperties);
      $('main').append(form);

      form.submit(function (event) {
        event.preventDefault();

        const formData = getFormData(fillableProperties);
        const token = sessionStorage.getItem('token');

        $.ajax({
          url: apiUrl + "books/" + id,
          type: 'PUT',
          data: formData,
          beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
          },
          success: function (responseData) {
            showMessage(responseData.message);
          },
          error: function (jqXHR) {
            const errorResponse = JSON.parse(jqXHR.responseText);
            showMessage("Ошибка: " + errorResponse.error);
          }
        });

        form.off('submit');
      });
    }
  });
}

function getFormData(fields) {
  const rawFormData = {};

  for (const field of fields) {
    const value = $(`#${field}`).val();
    if (value !== '') {
      rawFormData[field] = value;
    }
  }

  return JSON.stringify(rawFormData);
}

function deleteBook() {
  const fillableProperties = ["id"];
  const form = buildForm(fillableProperties);
  $('main').append(form);

  form.submit(function (event) {
    event.preventDefault();

    const id = $('#id').val();

    const token = sessionStorage.getItem('token');

    $.ajax({
      url: apiUrl + "books/" + id,
      type: 'DELETE',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      success: function (responseData) {
        showMessage(responseData.message);
      },
      error: function (jqXHR) {
        const errorResponse = JSON.parse(jqXHR.responseText);
        showMessage("Ошибка: " + errorResponse.error);
      }
    });

    form.off('submit');
  });
}

export { createBook, readBook, updateBook, deleteBook };