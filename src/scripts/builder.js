import { clearContent } from './view';

function buildTable(data) {
  clearContent();

  const table = $('table');
  const thead = $('<thead>');
  const headerTr = $('<tr>');
  const tbody = $('<tbody>');
  const headers = Object.keys(data[0]);

  for (const header of headers) {
    headerTr.append($('<th>').html(header));
  }

  thead.append(headerTr);
  table.append(thead);

  data.forEach((item) => {
    const row = $('<tr>');
    headers.forEach((header) => {
      row.append($('<td>').html(item[header]));
    });
    tbody.append(row);
  });

  table.append(tbody);

  return table;
}

function buildForm(data) {
  clearContent();

  const form = $('form');

  data.forEach((title) => {
    const input = $('<input></input>');
    input.attr({
      type: 'text',
      id: title,
      placeholder: title,
    });

    form.append(input, '<br>');
  });

  const button = $('<button>Отправить</button>');
  form.append(button);

  return form;
}

function buildPaginationButtons() {
  const buttonsContainer = $('<div></div>');
  buttonsContainer.attr({ id: 'pagination-buttons' });
  const left = $('<button><</button>');
  const first = $('<button>1</button>');
  const right = $('<button>></button>');

  left.attr({ id: 'pagination-left' });
  first.attr({ id: 'pagination-first' });
  right.attr({ id: 'pagination-right' });

  buttonsContainer.append(left, first, right);

  return buttonsContainer;
}

function setPaginationActions(callback, page, parentId = '', entity = '') {
  $('#pagination-left').click(() => {
    callback(parentId, page > 1 ? page - 1 : page, entity);
  });
  $('#pagination-first').click(() => {
    callback(parentId, 1, entity);
  });
  $('#pagination-right').click(() => {
    callback(parentId, page + 1, entity);
  });
}

export {
  buildTable, buildForm, buildPaginationButtons, setPaginationActions,
};
