import { apiUrl, makeAjaxRequest, makeTableHeader } from "./main.js";
import { buildTable, buildForm, buildPaginationButtons, setPaginationActions } from "./builder.js";
import { clearContent, showTableHeader, showMessage } from "./view.js";

const entity = 'opinion';

function createOpinion() {
  let isFirstFormSubmitted = false;
  let fillableProperties = ["book_id"];
  let form = buildForm(fillableProperties);
  $('main').append(form);
  form.submit(function (event) {
    event.preventDefault();
    const bookId = $('#book_id').val();
    isFirstFormSubmitted = true;
    form.off();
    if (isFirstFormSubmitted) {
      fillableProperties = ["opinion"];
      form = buildForm(fillableProperties);
      $('main').append(form);

      form.submit(function (event) {
        event.preventDefault();

        const formData = JSON.stringify({
          "opinion": $('#opinion').val()
        });

        makeAjaxRequest(apiUrl + "books/" + bookId + "/opinions", 'POST', formData);

        form.off('submit');
      });
    }
  });
}

function readOpinion(bookId = "", page = 1, opinionId = "") {
  if (bookId) {
    getOpinionData(bookId, page, opinionId);
  } else {
    let isFirstFormSubmitted = false;
    const fillableProperties = ["book_id"];
    const form = buildForm(fillableProperties);
    $('main').append(form);
    form.submit(function (event) {
      event.preventDefault();
      const bookId = $('#book_id').val();
      isFirstFormSubmitted = true;
      form.off();
      if (isFirstFormSubmitted) {
        getOpinionData(bookId, page, opinionId);
      }
    });
  }
}

function getOpinionData(bookId, page, opinionId) {
  let query = (opinionId === "") ? '?page=' + page : "";
  $.get(apiUrl + "books/" + bookId + "/opinions/" + opinionId + query)
    .done(function (rawData) {
      let data = (opinionId === "") ? rawData['items'] : rawData;
      const tableElement = buildTable(data);
      $('main').append(tableElement);
      if (opinionId === "") {
        const paginationButtons = buildPaginationButtons();
        $('main').append(paginationButtons);
        setPaginationActions(readOpinion, page, bookId);
      }
      showTableHeader(makeTableHeader(entity, rawData, opinionId));

      $('td').click(function () {
        if ($(this).index() === $('th:contains("opinion_id")').index()) {
          if ($(this).text()) {
            readOpinion(bookId, "", $(this).text());
          }
        }
      });
    })
    .fail(function (jqXHR) {
      clearContent();
      const errorResponse = JSON.parse(jqXHR.responseText);
      showMessage(errorResponse);
    });
}

function updateOpinion() {
  let isFirstFormSubmitted = false;
  let fillableProperties = ["book_id"];
  let form = buildForm(fillableProperties);
  $('main').append(form);
  form.submit(function (event) {
    event.preventDefault();
    const bookId = $('#book_id').val();
    isFirstFormSubmitted = true;
    form.off();
    if (isFirstFormSubmitted) {
      submitSecondForm(bookId);
    }
  });
}

function submitSecondForm(bookId) {
  let isSecondFormSubmitted = false;
  let fillableProperties = ["opinion_id"];
  let form = buildForm(fillableProperties);
  $('main').append(form);
  form.submit(function (event) {
    event.preventDefault();
    const opinionId = $('#opinion_id').val();
    isSecondFormSubmitted = true;
    form.off();
    if (isSecondFormSubmitted) {
      submitThirdForm(bookId, opinionId);
    }
  });
}

function submitThirdForm(bookId, opinionId) {
  let fillableProperties = ["opinion"];
  let form = buildForm(fillableProperties);
  $('main').append(form);
  form.submit(function (event) {
    event.preventDefault();
    const formData = JSON.stringify({
      "opinion": $('#opinion').val()
    });
    makeAjaxRequest(apiUrl + "books/" + bookId + "/opinions/" + opinionId, 'PUT', formData);
    form.off('submit');
  });
}

function deleteOpinion() {
  let isFirstFormSubmitted = false;
  let fillableProperties = ["book_id"];
  let form = buildForm(fillableProperties);
  $('main').append(form);
  form.submit(function (event) {
    event.preventDefault();
    const bookId = $('#book_id').val();
    isFirstFormSubmitted = true;
    form.off();
    if (isFirstFormSubmitted) {
      fillableProperties = ["opinion_id"];
      form = buildForm(fillableProperties);
      $('main').append(form);

      form.submit(function (event) {
        event.preventDefault();

        const opinionId = $('#opinion_id').val();

        makeAjaxRequest(apiUrl + "books/" + bookId + "/opinions/" + opinionId, 'DELETE');

        form.off('submit');
      });
    }
  });
}

export { createOpinion, readOpinion, updateOpinion, deleteOpinion };