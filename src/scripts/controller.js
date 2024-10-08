/**
 * controller.js - базовый контроллер CRUD взаимодействия с сущностями (через AJAX-запросы к API),
 * куда вынесены общие операции.
 */

import apiUrl from './main.js';
import {
  buildForm, buildTable, setPaginationActions, buildPaginationButtons,
} from './builder.js';
import { getFormData, makeTableHeader, getCellValue } from './utils.js';
import makeAjaxRequest from './request.js';
import { showTableHeader, showMessage } from './view.js';

function handleForm(fillableProperties, url, method) {
  const form = buildForm(fillableProperties);
  $('main').append(form);
  form.submit((event) => {
    event.preventDefault();
    const formData = getFormData(fillableProperties);
    makeAjaxRequest(url, method, formData);
    form.off();
  });
}

function readEntity(id = '', page = 1, entity = '') {
  const query = (id === '') ? `?page=${page}` : '';
  $.get(`${apiUrl + entity}s/${id}${query}`)
    .done((rawData) => {
      const data = (id === '') ? rawData.items : rawData;
      const table = buildTable(data);
      $('main').append(table);
      if (id === '') {
        const paginationButtons = buildPaginationButtons();
        $('main').append(paginationButtons);
        setPaginationActions(readEntity, page, '', entity);
      }
      showTableHeader(makeTableHeader(entity, rawData, id));

      $('td').click((event) => {
        const idValue = getCellValue(event, 'id');
        readEntity(idValue, 1, entity);
      });
    })
    .fail((jqXHR) => {
      const errorResponse = JSON.parse(jqXHR.responseText);
      showMessage(errorResponse);
    });
}

export { handleForm, readEntity };
