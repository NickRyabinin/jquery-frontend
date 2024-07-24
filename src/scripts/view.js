/**
 * view.js - модуль, управляющий выводом данных на экран пользователя. 
 */

import { apiUrl } from "./main.js";

function getHomePage() {
  $.get(apiUrl, function (data, status) {
    clearContent();

    if (status === 'success') {
      const parsedData = extractBodyContent(data);
      $('section').html(parsedData);
    }
  });
}

function extractBodyContent(data) {
  const startIndex = data.indexOf('<body');
  const endIndex = data.indexOf('</body>');

  if (startIndex !== -1 && endIndex !== -1) {
    const bodyContent = data.substring(startIndex, endIndex + '</body>'.length);
    return bodyContent;
  }

  return "";
}

function showMessage(messageObject) {
  clearContent();
  let message = '';
  for (const key in messageObject) {
    message += key + ': ' + messageObject[key] + '<br>';
  }
  let sectionClass = ('error' in messageObject) ? 'error' : 'message';
  $('section').addClass('message-container ' + sectionClass);
  return $('section').html(message);
}

function showTableHeader(headerText) {
  return $('h4').html(headerText);
}

function showAction(action, entity) {
  let normalizedEntity = entity.toLowerCase();

  if (action !== 'Read') {
    normalizedEntity = normalizedEntity.slice(0, -2);
  }

  return $('h3').html(action + " " + normalizedEntity);
}

function clearContent() {
  $('section').removeClass();
  $('section, h4, form, table, #pagination-buttons').empty();
}

$('.submenu, #home').click(function() {
  $('h3').empty();
});

export { getHomePage, showMessage, showTableHeader, showAction, clearContent };