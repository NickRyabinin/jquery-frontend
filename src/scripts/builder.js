function buildTable(data) {
  const table = $('table');
  table.empty();
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

export { buildTable };
