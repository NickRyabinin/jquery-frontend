import { apiUrl } from "./main.js";
import { clearContent } from "./builder.js";

function getHomePage() {
  $.get(apiUrl, function(data, status) {
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

export { getHomePage };