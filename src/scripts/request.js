import { clearContent, showMessage } from './view.js';

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

export { makeAjaxRequest };
