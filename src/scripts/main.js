/** */
import { getHomePage } from "./view.js";
import { authorizeUser, createUser, readUser, updateUser, deleteUser } from "./user.js";
import { createBook, readBook, updateBook, deleteBook } from "./book.js";
import { createOpinion, readOpinion, updateOpinion, deleteOpinion } from "./opinion.js";

const apiUrl = "http://php-crud-api.alwaysdata.net/";

$(document).ready(function () {
  $('.menu').on('click', 'li', function() {
    const submenu = $(this).find('.submenu');
    $('.submenu').not(submenu).slideUp();
    submenu.slideToggle();
  });

  $('.submenu li').click(function(event) {
    event.stopPropagation(); // Предотвращаем всплытие события, чтобы клик на элементе субменю не вызывал клик на его родителе
    $(this).closest('.submenu').slideUp(); // Сворачиваем текущее субменю после клика на элемент субменю
  });

  $('#home').click(function() {
    getHomePage();
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