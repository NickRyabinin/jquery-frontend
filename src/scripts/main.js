/** */
import { getHomePage } from "./home.js";
import { authorizeUser, createUser, readUser, deleteUser } from "./user.js";
import { createBook, readBook, updateBook, deleteBook } from "./book.js";
import { readOpinion } from "./opinion.js";

const apiUrl = "http://php-crud-api.alwaysdata.net/";

$(document).ready(function() {
  $('#home').click(function() {
    $('.usersSubmenu').slideUp();
    $('.booksSubmenu').slideUp();
    $('.opinionsSubmenu').slideUp();
    getHomePage();
  })

  $('.users').click(function() {
    $('.booksSubmenu').slideUp();
    $('.opinionsSubmenu').slideUp();
    $('.usersSubmenu').slideToggle();
  });

  $('.books').click(function() {
    $('.usersSubmenu').slideUp();
    $('.opinionsSubmenu').slideUp();
    $('.booksSubmenu').slideToggle();
  });

  $('.opinions').click(function() {
    $('.usersSubmenu').slideUp();
    $('.booksSubmenu').slideUp();
    $('.opinionsSubmenu').slideToggle();
  });

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

  $('.opinionsSubmenu li').click(function() {
    const action = $(this).text();
    switch(action) {
      case 'Create':
        createOpinion();
        break;
      case 'Read':
        readOpinion();
        break;
      case 'Update':
        updateOpinion();
        break;
      case 'Delete':
        deleteOpinion();
        break;
    }
  });
});

getHomePage();

export { apiUrl };