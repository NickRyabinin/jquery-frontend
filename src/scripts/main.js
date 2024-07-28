/**
 * main.js - базовый модуль, точка входа в приложение.
 * Устанавливает слушатели событий на элементы меню навигации.
 */

import {
  getHomePage, showMessage, showTableHeader, showAction, clearContent,
} from './view.js';
import { buildTable, buildPaginationButtons, setPaginationActions } from './builder.js';
import {
  authorizeUser, createUser, readUser, updateUser, deleteUser,
} from './user.js';
import {
  createBook, readBook, updateBook, deleteBook,
} from './book.js';
import {
  createOpinion, readOpinion, updateOpinion, deleteOpinion,
} from './opinion.js';

const apiUrl = 'http://php-crud-api.alwaysdata.net/';

function makeAjaxRequest(url, method, data = '') {
  clearContent();

  const token = sessionStorage.getItem('token');

  $.ajax({
    url,
    type: method,
    data,
    beforeSend(xhr) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    },
    success(responseData) {
      showMessage(responseData);
    },
    error(jqXHR) {
      const errorResponse = JSON.parse(jqXHR.responseText);
      showMessage(errorResponse);
    },
  });
}

function makeTableHeader(entity, rawData, id) {
  let header = entity.charAt(0).toUpperCase() + entity.slice(1);
  if (id === '') {
    const startRecord = rawData.offset + 1;
    const endRecord = (rawData.total < (rawData.offset + 1) * 10)
      ? rawData.total
      : (rawData.offset + 1) * rawData.limit;
    const totalRecords = rawData.total;
    header += `s записи ${startRecord} - ${endRecord} из ${totalRecords}`;
  } else {
    header += ` ${id}`;
  }
  return header;
}

function getCellValue(event, cellName) {
  const headerCell = $(`th:contains(${cellName})`);
  /* ищем значение нужной ячейки в той строке, куда кликнули */
  const cellValue = $(event.target).closest('tr')
    .find('td').eq(headerCell.index())
    .text();
  return cellValue;
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

$(document).ready(() => {
  $('.menu').on('click', 'li', function () {
    const submenu = $(this).find('.submenu');
    $('.submenu').not(submenu).slideUp();
    submenu.slideToggle();
  });

  $('.submenu li').click(function (event) {
    /* Предотвращаем всплытие события, чтобы клик на элементе субменю
    не вызывал клик на его родителе */
    event.stopPropagation();
    /* Сворачиваем текущее субменю после клика на элемент субменю */
    $(this).closest('.submenu').slideUp();
  });

  $('#home').click(() => {
    getHomePage();
  });

  $('.submenu li').click(function () {
    $('form').off();

    const action = $(this).text();
    const menuName = $(this).closest('ul').parent().text()
      .split(' ')[0]; // Получаем текст родительского элемента li (entity)

    showAction(action, menuName);

    const functionName = action.toLowerCase() + menuName.slice(0, -2);
    const functionCall = `${functionName}()`;

    try {
      eval(functionCall);
    } catch (error) {
      showMessage({ error: `Error calling function: ${error}` });
    }
  });
});

getHomePage();

export {
  apiUrl, makeAjaxRequest, readEntity, makeTableHeader, getCellValue,
};
