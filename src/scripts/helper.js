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

function handleTdClick(callback, parentId = '', childId = '') {
  callback(parentId, '', childId);
}

export { getFormData, handleTdClick };
