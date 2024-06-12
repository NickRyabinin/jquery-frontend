/** */
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
