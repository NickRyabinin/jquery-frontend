/** */
import { createUser, readUser, updateUser, deleteUser } from "./user.js";
import { createBook, readBook, updateBook, deleteBook } from "./book.js";

$(document).ready(function() {
  $('.users').click(function() {
    $('.booksSubmenu').slideUp();
    $('.usersSubmenu').slideToggle();
  });

  $('.books').click(function() {
    $('.usersSubmenu').slideUp();
    $('.booksSubmenu').slideToggle();
  });

  $('.usersSubmenu li').click(function() {
    const action = $(this).text();
    switch(action) {
      case 'Create':
        createUser();
        break;
      case 'Read':
        readUser();
        break;
      case 'Update':
        updateUser();
        break;
      case 'Delete':
        deleteUser();
        break;
    }
  });

  $('.booksSubmenu li').click(function() {
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
    }
  });
});
