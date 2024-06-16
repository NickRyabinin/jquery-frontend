function buildTable(data) {
  const table = $('table');
  table.empty();
  $('form').empty();
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
  const form = $('form');
  $('table').empty();
  form.empty();

  data.forEach((title) => {
    const input = $('<input></input>');
    input.attr({
      "type": "text",
      "id": title,
      "placeholder": title
    });

    form.append(input, '<br>');
    // form.append('<br>');
  });

  const button = $('<button>Отправить</button>');
  form.append(button);

  return form;
}

export { buildTable, buildForm };
