import { apiUrl } from './main.js';
import { buildTable, setPaginationActions, buildPaginationButtons } from './builder.js';
import { makeTableHeader, getCellValue } from './utils.js';
import { showTableHeader, showMessage } from './view.js';

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

export { readEntity };
