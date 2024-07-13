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
  let message = '';
  for (const key in messageObject) {
    message += key + ': ' + messageObject[key] + '<br>';
  }
  return $('section').html(message);
}

function clearContent() {
  $('section, form, table, #pagination-buttons').empty();
}

export { getHomePage, showMessage, clearContent };