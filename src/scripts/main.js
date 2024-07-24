/**
 * main.js - базовый модуль, точка входа в приложение.
 * Устанавливает слушатели событий на элементы меню навигации.
 */

import { getHomePage, showMessage, showTableHeader, showAction, clearContent } from "./view.js";
import { buildTable, buildPaginationButtons, setPaginationActions } from "./builder.js";
import { authorizeUser, createUser, readUser, updateUser, deleteUser } from "./user.js";
import { createBook, readBook, updateBook, deleteBook } from "./book.js";
import { createOpinion, readOpinion, updateOpinion, deleteOpinion } from "./opinion.js";

const apiUrl = "http://php-crud-api.alwaysdata.net/";

function makeAjaxRequest(url, method, data = '') {
  clearContent();

  const token = sessionStorage.getItem('token');

  $.ajax({
    url: url,
    type: method,
    data: data,
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    },
    success: function (responseData) {
      showMessage(responseData);
    },
    error: function (jqXHR) {
      const errorResponse = JSON.parse(jqXHR.responseText);
      showMessage(errorResponse);
    }
  });
}

function readEntity(id = "", page = 1, entity = "") {
  let query = (id === "") ? '?page=' + page : "";
  $.get(apiUrl + entity + 's/' + id + query)
    .done(function (rawData) {
      let data = (id === "") ? rawData['items'] : rawData;
      const tableElement = buildTable(data);
      $('main').append(tableElement);
      if (id === "") {
        const paginationButtons = buildPaginationButtons();
        $('main').append(paginationButtons);
        setPaginationActions(readEntity, page, "", entity);
      }
      showTableHeader(makeTableHeader(entity, rawData, id));

      $('td').click(function () {
        if ($(this).index() === $('th:contains("id")').index()) {
          if ($(this).text()) {
            readEntity($(this).text(), 1, entity);
          }
        }
      });
    })
    .fail(function (jqXHR) {
      const errorResponse = JSON.parse(jqXHR.responseText);
      showMessage(errorResponse);
    });
}

function makeTableHeader(entity, rawData, id) {
  let header = entity.charAt(0).toUpperCase() + entity.slice(1);
  if (id === "") {
    const startRecord = rawData['offset'] + 1;
    let endRecord = (rawData['total'] < (rawData['offset'] + 1) * 10) ? rawData['total'] : (rawData['offset'] + 1) * rawData['limit'];
    const totalRecords = rawData['total'];
    header += 's записи ' + startRecord + ' - ' + endRecord + ' из ' + totalRecords;
  } else {
    header += ' ' + id;
  }
  return header;
}

$(document).ready(function () {
  $('.menu').on('click', 'li', function() {
    const submenu = $(this).find('.submenu');
    $('.submenu').not(submenu).slideUp();
    submenu.slideToggle();
  });

  $('.submenu li').click(function(event) {
    event.stopPropagation(); // Предотвращаем всплытие события, чтобы клик на элементе субменю не вызывал клик на его родителе
    $(this).closest('.submenu').slideUp(); // Сворачиваем текущее субменю после клика на элемент субменю
  });

  $('#home').click(function() {
    getHomePage();
  });

  $('.submenu li').click(function () {
    $('form').off();

    const action = $(this).text();
    const menuName = $(this).closest('ul').parent().text().split(" ")[0]; // Получаем текст родительского элемента li (entity)

    showAction(action, menuName);

    const functionName = action.toLowerCase() + menuName.slice(0, -2);
    const functionCall = functionName + '()';

    try {
        eval(functionCall);
    } catch (error) {
        console.error('Error calling function: ' + error);
    }
  });
});

getHomePage();

export { apiUrl, makeAjaxRequest, readEntity, makeTableHeader };