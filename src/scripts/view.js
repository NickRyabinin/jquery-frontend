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

function showHeader(headerText) {
  return $('h3').html(headerText);
}

function clearContent() {
  $('section').removeClass();
  $('section, h3, form, table, #pagination-buttons').empty();
}

export { getHomePage, showMessage, showHeader, clearContent };