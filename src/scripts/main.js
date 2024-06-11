/** */
import { buildTable } from "./builder.js";
import { createBook, readBook, updateBook, deleteBook } from "./book.js";

$(document).ready(function() {
  $('.books').click(function() {
    $('.submenu').slideToggle();
  });

  $('.submenu li').click(function() {
    const action = $(this).text();
    switch(action) {
      case 'Create':
        createBook();
        break;
      case 'Read':
        readBook();
        break;
      case 'Update':
        updateBook();
        break;
      case 'Delete':
        deleteBook();
        break;
      default:
        break;
    }
  });
});

const data = [
  {"id":1,"login":"Ur-Quan Master","created_at":"2024-01-22 16:41:09"},
  {"id":3,"login":"Mur-Mur","created_at":"2024-01-22 16:42:24"},
  {"id":6,"login":"MurQuan","created_at":"2024-01-24 11:44:17"},
  {"id":7,"login":"Mirelurk","created_at":"2024-01-31 17:19:00"}
];

const tableElement = buildTable(data);
$('main').append(tableElement);