import { apiUrl } from "./main.js";
import { buildTable, buildForm, buildPaginationButtons, setPaginationActions, clearContent } from "./builder.js";

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

        const token = sessionStorage.getItem('token');

        $.ajax({
          url: apiUrl + "books/" + bookId + "/opinions",
          type: 'POST',
          data: formData,
          beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
          },
          success: function (responseData) {
            alert(responseData.message);
          },
          error: function (jqXHR) {
            const errorResponse = JSON.parse(jqXHR.responseText);
            alert("Ошибка: " + errorResponse.error);
          }
        });

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
        $('td').click(function () {
          if ($(this).index() === $('th:contains("opinion_id")').index()) {
            if ($(this).text()) {
              readOpinion(bookId, "", $(this).text());
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
      let isSecondFormSubmitted = false;
      fillableProperties = ["opinion_id"];
      form = buildForm(fillableProperties);
      $('main').append(form);

      form.submit(function (event) {
        event.preventDefault();
        const opinionId = $('#opinion_id').val();
        isSecondFormSubmitted = true;
        form.off();

        if (isSecondFormSubmitted) {
          fillableProperties = ["opinion"];
          form = buildForm(fillableProperties);
          $('main').append(form);

          form.submit(function (event) {
            event.preventDefault();

            const formData = JSON.stringify({
              "opinion": $('#opinion').val()
            });

            const token = sessionStorage.getItem('token');

            $.ajax({
              url: apiUrl + "books/" + bookId + "/opinions/" + opinionId,
              type: 'PUT',
              data: formData,
              beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
              },
              success: function (responseData) {
                alert(responseData.message);
              },
              error: function (jqXHR) {
                const errorResponse = JSON.parse(jqXHR.responseText);
                alert("Ошибка: " + errorResponse.error);
              }
            });

            form.off('submit');
          });
        }
      });
    }
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
        const token = sessionStorage.getItem('token');

        $.ajax({
          url: apiUrl + "books/" + bookId + "/opinions/" + opinionId,
          type: 'DELETE',
          beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
          },
          success: function (responseData) {
            alert(responseData.message);
          },
          error: function (jqXHR) {
            const errorResponse = JSON.parse(jqXHR.responseText);
            alert("Ошибка: " + errorResponse.error);
          }
        });

        form.off('submit');
      });
    }
  });
}

export { createOpinion, readOpinion, updateOpinion, deleteOpinion };