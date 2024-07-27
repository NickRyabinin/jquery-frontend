/**
 * book.js - контроллер CRUD взаимодействия с сущностью book (через AJAX запросы к API)
 */

import { apiUrl, makeAjaxRequest, readEntity } from './main';
import { buildForm } from './builder';

const entity = 'book';

function createBook() {
  const fillableProperties = ['title', 'author', 'published_at'];
  const form = buildForm(fillableProperties);
  $('main').append(form);

  form.submit((event) => {
    event.preventDefault();

    const formData = JSON.stringify({
      title: $('#title').val(),
      author: $('#author').val(),
      published_at: $('#published_at').val(),
    });

    makeAjaxRequest(`${apiUrl}books/`, 'POST', formData);

    form.off();
  });
}

function readBook() {
  readEntity('', 1, entity);
}

function updateBook() {
  let isFirstFormSubmitted = false;

  const fillableProperties = ['book_id'];
  const form = buildForm(fillableProperties);
  $('main').append(form);

  form.submit((event) => {
    event.preventDefault();
    const bookId = $('#book_id').val();
    isFirstFormSubmitted = true;
    form.off();

    if (isFirstFormSubmitted) {
      const fillableProperties = ['title', 'author', 'published_at'];
      const form = buildForm(fillableProperties);
      $('main').append(form);

      form.submit((event) => {
        event.preventDefault();

        const formData = getFormData(fillableProperties);

        makeAjaxRequest(`${apiUrl}books/${bookId}`, 'PUT', formData);

        form.off();
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
