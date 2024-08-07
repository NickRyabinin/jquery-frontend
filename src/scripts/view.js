/**
 * view.js - модуль, управляющий выводом данных на экран пользователя.
 */

import apiUrl from './main.js';

function clearContent() {
  $('section').removeClass();
  $('section, h4, form, table, #pagination-buttons').empty();
}

function showMessage(messageObject) {
  clearContent();

  let message = '';
  Object.entries(messageObject).forEach(([key, value]) => {
    message += `${key}: ${value}<br>`;
  });
  const sectionClass = ('error' in messageObject) ? 'error' : 'message';
  $('section').addClass(`message-container ${sectionClass}`);

  return $('section').html(message);
}

function extractBodyContent(data) {
  const startIndex = data.indexOf('<body');
  const endIndex = data.indexOf('</body>');

  if (startIndex !== -1 && endIndex !== -1) {
    const bodyContent = data.substring(startIndex, endIndex + '</body>'.length);
    return bodyContent;
  }

  return '';
}

function getHomePage() {
  $('h3').empty();
  clearContent();
  $('#spinner').show(); // Показываем спиннер
  $.get(apiUrl)
    .done((data) => {
      const parsedData = extractBodyContent(data);
      $('section').html(parsedData);
    })
    .fail((jqXHR) => {
      const errorResponse = JSON.parse(jqXHR.responseText);
      showMessage(errorResponse);
    })
    .always(() => {
      $('#spinner').hide(); // Скрываем спиннер после завершения запроса
    });
}

function showTableHeader(headerText) {
  return $('h4').html(headerText);
}

function showAction(action, entity) {
  let normalizedEntity = entity.toLowerCase();

  if (action !== 'Read') {
    normalizedEntity = normalizedEntity.slice(0, -2);
  }

  return $('h3').html(`${action} ${normalizedEntity}`);
}

export {
  getHomePage, showMessage, showTableHeader, showAction, clearContent,
};
