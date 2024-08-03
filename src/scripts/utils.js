function getFormData(fields) {
  const rawFormData = {};

  fields.forEach((field) => {
    const value = $(`#${field}`).val();
    if (value !== '') {
      rawFormData[field] = value;
    }
  });

  return JSON.stringify(rawFormData);
}

function getCellValue(event, cellName) {
  const headerCell = $(`th:contains(${cellName})`);
  /* ищем значение нужной ячейки в той строке, куда кликнули */
  const cellValue = $(event.target).closest('tr')
    .find('td').eq(headerCell.index())
    .text();
  return cellValue;
}

function handleTdClick(callback, parentId = '', childId = '') {
  callback(parentId, '', childId);
}

function makeTableHeader(entity, rawData, id) {
  let header = entity.charAt(0).toUpperCase() + entity.slice(1);
  if (id === '') {
    const startRecord = rawData.offset + 1;
    const endRecord = (rawData.total < (rawData.offset + 1) * 10)
      ? rawData.total
      : (rawData.offset + 1) * rawData.limit;
    const totalRecords = rawData.total;
    header += `s записи ${startRecord} - ${endRecord} из ${totalRecords}`;
  } else {
    header += ` ${id}`;
  }
  return header;
}

export {
  getFormData, getCellValue, handleTdClick, makeTableHeader,
};
