/** */
import { getHomePage } from "./view.js";
import { authorizeUser, createUser, readUser, updateUser, deleteUser } from "./user.js";
import { createBook, readBook, updateBook, deleteBook } from "./book.js";
import { createOpinion, readOpinion, updateOpinion, deleteOpinion } from "./opinion.js";

const apiUrl = "http://php-crud-api.alwaysdata.net/";

$(document).ready(function () {
  $('#home').click(function () {
    $('.usersSubmenu').slideUp();
    $('.booksSubmenu').slideUp();
    $('.opinionsSubmenu').slideUp();
    getHomePage();
  })

  $('.users').click(function () {
    $('.booksSubmenu').slideUp();
    $('.opinionsSubmenu').slideUp();
    $('.usersSubmenu').slideToggle();
  });

  $('.books').click(function () {
    $('.usersSubmenu').slideUp();
    $('.opinionsSubmenu').slideUp();
    $('.booksSubmenu').slideToggle();
  });

  $('.opinions').click(function () {
    $('.usersSubmenu').slideUp();
    $('.booksSubmenu').slideUp();
    $('.opinionsSubmenu').slideToggle();
  });

  $('.submenu li').click(function () {
    const action = $(this).text();
    const menuName = $(this).closest('ul').parent().text().split(" ")[0]; // Получаем текст родительского элемента li
    const functionName = action.toLowerCase() + menuName.slice(0, -2);

    const functionCall = functionName + '()';
    
    try {
        eval(functionCall);
    } catch (error) {
        console.error('Error calling function: ' + error);
    }
  });

});

getHomePage();

export { apiUrl };