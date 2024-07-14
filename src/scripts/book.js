import { apiUrl, makeAjaxRequest, readEntity } from "./main.js";
import { buildForm } from "./builder.js";

const entity = 'book';

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

    makeAjaxRequest(apiUrl + "books/", 'POST', formData);

    form.off('submit');
  });
}

function readBook() {
  readEntity("", 1, entity);
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

        makeAjaxRequest(apiUrl + "books/" + id, 'PUT', formData);

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

    makeAjaxRequest(apiUrl + "books/" + id, 'DELETE');

    form.off('submit');
  });
}

export { createBook, readBook, updateBook, deleteBook };