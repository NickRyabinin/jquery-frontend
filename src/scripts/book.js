/**
 * book.js - контроллер CRUD взаимодействия с сущностью book (через AJAX запросы к API)
 */

import { apiUrl, makeAjaxRequest, readEntity } from './main.js';
import { buildForm } from './builder.js';

const entity = 'book';

function getFormData(fields) {
  const rawFormData = {};

  fields.forEach((field) => {
    const value = $(`#${field}`).val();
    if (value !== '') {
      rawFormData[field] = value;
    }
  });

  return JSON.stringify(rawFormData);
}

function createBook() {
  const fillableProperties = ['title', 'author', 'published_at'];
  const form = buildForm(fillableProperties);
  $('main').append(form);

  form.submit((event) => {
    event.preventDefault();

    const formData = getFormData(fillableProperties);

    makeAjaxRequest(`${apiUrl}books/`, 'POST', formData);

    form.off();
  });
}

function readBook() {
  readEntity('', 1, entity);
}

function updateBook() {
  let isFirstFormSubmitted = false;

  let fillableProperties = ['book_id'];
  let form = buildForm(fillableProperties);
  $('main').append(form);

  form.submit((event) => {
    event.preventDefault();
    const bookId = $('#book_id').val();
    isFirstFormSubmitted = true;
    form.off();

    if (isFirstFormSubmitted) {
      fillableProperties = ['title', 'author', 'published_at'];
      form = buildForm(fillableProperties);
      $('main').append(form);

      form.submit((evnt) => {
        evnt.preventDefault();

        const formData = getFormData(fillableProperties);

        makeAjaxRequest(`${apiUrl}books/${bookId}`, 'PUT', formData);

        form.off();
      });
    }
  });
}

function deleteBook() {
  const fillableProperties = ['book_id'];
  const form = buildForm(fillableProperties);
  $('main').append(form);

  form.submit((event) => {
    event.preventDefault();

    const bookId = $('#book_id').val();

    makeAjaxRequest(`${apiUrl}books/${bookId}`, 'DELETE');

    form.off();
  });
}

export {
  createBook, readBook, updateBook, deleteBook,
};
