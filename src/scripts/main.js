/** */
import { getHomePage } from "./home.js";
import { authorizeUser, createUser, readUser, deleteUser } from "./user.js";
import { createBook, readBook, updateBook, deleteBook } from "./book.js";

const apiUrl = "http://php-crud-api.alwaysdata.net/";

$(document).ready(function() {
  $('.users').click(function() {
    $('.booksSubmenu').slideUp();
    $('.usersSubmenu').slideToggle();
  });

  $('.books').click(function() {
    $('.usersSubmenu').slideUp();
    $('.booksSubmenu').slideToggle();
  });

  $('#home').click(function() {
    $('.booksSubmenu').slideUp();
    $('.usersSubmenu').slideUp();
    getHomePage();
  })

  $('.usersSubmenu li').click(function() {
    const action = $(this).text();
    switch(action) {
      case 'Authorize':
        authorizeUser();
        break;
      case 'Create':
        createUser();
        break;
      case 'Read':
        readUser();
        break;
      case 'Update':
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

getHomePage();

export { apiUrl };