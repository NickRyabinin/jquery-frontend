/**
 * book.js - контроллер CRUD взаимодействия с сущностью book (через AJAX-запросы к API)
 */

import apiUrl from './main.js';
import { buildForm } from './builder.js';
import makeAjaxRequest from './request.js';
import { handleForm, readEntity } from './controller.js';

const entity = 'book';

function createBook() {
  const fillableProperties = ['title', 'author', 'published_at'];
  const url = `${apiUrl}books/`;
  const method = 'POST';

  handleForm(fillableProperties, url, method);
}

function readBook() {
  readEntity('', 1, entity);
}

function updateBook() {
  let isFirstFormSubmitted = false;

  let fillableProperties = ['book_id'];
  const form = buildForm(fillableProperties);
  $('main').append(form);

  form.submit((event) => {
    event.preventDefault();
    const bookId = $('#book_id').val();
    isFirstFormSubmitted = true;
    form.off();

    if (isFirstFormSubmitted) {
      fillableProperties = ['title', 'author', 'published_at'];
      const url = `${apiUrl}books/${bookId}`;
      const method = 'PUT';

      handleForm(fillableProperties, url, method);
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
