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
  let id = null;
  let isFirstFormSubmitted = false;

  const fillableProperties = ["id"];
  const form = buildForm(fillableProperties);
  $('main').append(form);

  form.submit(function (event) {
    event.preventDefault();
    id = $('#id').val();
    isFirstFormSubmitted = true;
    form.off();
    buildNextForm(isFirstFormSubmitted, id);
  });
}

function buildNextForm(isFirstFormSubmitted, id) {
  if (isFirstFormSubmitted) {
    const fillableProperties = ["title", "author", "published_at"];
    const form = buildForm(fillableProperties);
    $('main').append(form);

    form.submit(function (event) {
      event.preventDefault();

      const rawFormData = {};

      const title = $('#title').val();
      const author = $('#author').val();
      const publishedAt = $('#published_at').val();

      if (title !== '') {
        rawFormData.title = title;
      }

      if (author !== '') {
        rawFormData.author = author;
      }

      if (publishedAt !== '') {
        rawFormData.published_at = publishedAt;
      }

      const formData = JSON.stringify(rawFormData);

      const token = sessionStorage.getItem('token');

      $.ajax({
        url: apiUrl + "books/" + id,
        type: 'PUT',
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

export { createBook, readBook, updateBook, deleteBook };