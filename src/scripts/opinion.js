import { apiUrl } from "./main.js";
import { buildTable, buildForm, buildPaginationButtons, setPaginationActions, clearContent } from "./builder.js";

function readOpinion(bookId = "", opinionId = "", page = 1) {
  if (bookId) {
    getOpinionData(bookId, opinionId, page);
  } else {
    let isFirstFormSubmitted = false;
    const fillableProperties = ["id"];
    const form = buildForm(fillableProperties);
    $('main').append(form);
    form.submit(function (event) {
      event.preventDefault();
      const bookId = $('#id').val();
      isFirstFormSubmitted = true;
      form.off();
      if (isFirstFormSubmitted) {
        getOpinionData(bookId, opinionId, page);
      }
    });
  }

  function getOpinionData(bookId, opinionId, page) {
    let query = (opinionId === "") ? '?page=' + page : "";
    $.get(apiUrl + "books/" + bookId + "/opinions/" + opinionId + query)
      .done(function (rawData) {
        let data = (opinionId === "") ? rawData['items'] : rawData;
        const tableElement = buildTable(data);
        $('main').append(tableElement);
        if (opinionId === "") {
          const paginationButtons = buildPaginationButtons();
          $('main').append(paginationButtons);
          setPaginationActions(page, readOpinion);
        }
        $('td').click(function () {
          if ($(this).index() === $('th:contains("id")').index()) {
            if ($(this).text()) {
              readOpinion(bookId, $(this).text());
            }
          }
        });
      })
      .fail(function (jqXHR) {
        const errorResponse = JSON.parse(jqXHR.responseText);
        alert("Ошибка: " + errorResponse.error);
        clearContent();
      });
  }
}

export { readOpinion };