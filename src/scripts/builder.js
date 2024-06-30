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

  data.forEach(item => {
    const row = $('<tr>');
    headers.forEach(header => {
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
      "type": "text",
      "id": title,
      "placeholder": title
    });

    form.append(input, '<br>');
  });

  const button = $('<button>Отправить</button>');
  form.append(button);

  return form;
}

function clearContent() {
  $('section, form, table, #pagination-buttons').empty();
}

function buildPaginationButtons() {
  const buttonsContainer = $('<div></div>');
  buttonsContainer.attr({"id": "pagination-buttons"});
  const left = $('<button><</button>');
  const first = $('<button>1</button>');
  const right = $('<button>></button>');

  left.attr({"id": "pagination-left"});
  first.attr({"id": "pagination-first"});
  right.attr({"id": "pagination-right"});

  buttonsContainer.append(left, first, right);

  return buttonsContainer;
}

function setPaginationActions(page, callback) {
  $('#pagination-left').click(function () {
    callback('', page - 1)
  });
  $('#pagination-first').click(function () {
    callback('', 1)
  });
  $('#pagination-right').click(function () {
    callback('', page + 1)
  });
}

export { buildTable, buildForm, clearContent, buildPaginationButtons, setPaginationActions };
