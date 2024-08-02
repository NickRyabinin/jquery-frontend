/**
 * opinion.js - контроллер CRUD взаимодействия с сущностью opinion (через AJAX запросы к API)
 */

import {
  apiUrl, makeAjaxRequest, makeTableHeader, getCellValue,
} from './main.js';
import {
  buildTable, buildForm, buildPaginationButtons, setPaginationActions,
} from './builder.js';
import { clearContent, showTableHeader, showMessage } from './view.js';
import { getFormData, handleTdClick } from './helper.js';

const entity = 'opinion';

function createOpinion() {
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
      fillableProperties = ['opinion'];
      form = buildForm(fillableProperties);
      $('main').append(form);

      form.submit((evnt) => {
        evnt.preventDefault();

        const formData = getFormData(fillableProperties);

        makeAjaxRequest(`${apiUrl}books/${bookId}/opinions`, 'POST', formData);

        form.off();
      });
    }
  });
}

function getOpinionData(callback, bookId, page, opinionId) {
  const query = (opinionId === '') ? `?page=${page}` : '';
  $.get(`${apiUrl}books/${bookId}/opinions/${opinionId}${query}`)
    .done((rawData) => {
      const data = (opinionId === '') ? rawData.items : rawData;
      const table = buildTable(data);
      $('main').append(table);
      if (opinionId === '') {
        const paginationButtons = buildPaginationButtons();
        $('main').append(paginationButtons);
        setPaginationActions(callback, page, bookId);
      }
      showTableHeader(makeTableHeader(entity, rawData, opinionId));

      $('td').click((event) => {
        const idValue = getCellValue(event, 'opinion_id');
        handleTdClick(callback, bookId, idValue);
      });
    })
    .fail((jqXHR) => {
      clearContent();
      const errorResponse = JSON.parse(jqXHR.responseText);
      showMessage(errorResponse);
    });
}

function readOpinion(bookId = '', page = 1, opinionId = '') {
  const callback = readOpinion;
  if (bookId) {
    getOpinionData(callback, bookId, page, opinionId);
  } else {
    let isFirstFormSubmitted = false;
    const fillableProperties = ['book_id'];
    const form = buildForm(fillableProperties);
    $('main').append(form);
    form.submit((event) => {
      event.preventDefault();
      const bookIdValue = $('#book_id').val();
      isFirstFormSubmitted = true;
      form.off();
      if (isFirstFormSubmitted) {
        getOpinionData(callback, bookIdValue, page, opinionId);
      }
    });
  }
}

function submitThirdForm(bookId, opinionId) {
  const fillableProperties = ['opinion'];
  const form = buildForm(fillableProperties);
  $('main').append(form);
  form.submit((event) => {
    event.preventDefault();
    const formData = getFormData(fillableProperties);
    makeAjaxRequest(`${apiUrl}books/${bookId}/opinions/${opinionId}`, 'PUT', formData);
    form.off();
  });
}

function submitSecondForm(bookId) {
  let isSecondFormSubmitted = false;
  const fillableProperties = ['opinion_id'];
  const form = buildForm(fillableProperties);
  $('main').append(form);
  form.submit((event) => {
    event.preventDefault();
    const opinionId = $('#opinion_id').val();
    isSecondFormSubmitted = true;
    form.off();
    if (isSecondFormSubmitted) {
      submitThirdForm(bookId, opinionId);
    }
  });
}

function updateOpinion() {
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
      submitSecondForm(bookId);
    }
  });
}

function deleteOpinion() {
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
      fillableProperties = ['opinion_id'];
      form = buildForm(fillableProperties);
      $('main').append(form);

      form.submit((evt) => {
        evt.preventDefault();

        const opinionId = $('#opinion_id').val();

        makeAjaxRequest(`${apiUrl}books/${bookId}/opinions/${opinionId}`, 'DELETE');

        form.off();
      });
    }
  });
}

export {
  createOpinion, readOpinion, updateOpinion, deleteOpinion,
};
