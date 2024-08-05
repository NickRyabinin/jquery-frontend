/**
 * main.js - базовый модуль, точка входа в приложение.
 * Устанавливает слушатели событий на элементы меню навигации.
 */

import { getHomePage, showMessage, showAction } from './view.js';
import {
  authorizeUser, createUser, readUser, updateUser, deleteUser,
} from './user.js';
import {
  createBook, readBook, updateBook, deleteBook,
} from './book.js';
import {
  createOpinion, readOpinion, updateOpinion, deleteOpinion,
} from './opinion.js';

const apiUrl = 'http://php-crud-api.alwaysdata.net/';
export default apiUrl;

const availableFunctions = {
  authorizeUser,
  createUser,
  readUser,
  updateUser,
  deleteUser,
  createBook,
  readBook,
  updateBook,
  deleteBook,
  createOpinion,
  readOpinion,
  updateOpinion,
  deleteOpinion,
};

$(document).ready(() => {
  $('.menu').on('click', 'li', (event) => {
    const submenu = $(event.currentTarget).find('.submenu');
    $('.submenu').not(submenu).slideUp();
    submenu.slideToggle();
  });

  $('.submenu li').click((event) => {
    /* Предотвращаем всплытие события, чтобы клик на элементе субменю
    не вызывал клик на его родителе */
    event.stopPropagation();
    /* Сворачиваем текущее субменю после клика на элемент субменю */
    $(event.currentTarget).closest('.submenu').slideUp();
  });

  $('#home').click(() => {
    getHomePage();
  });

  $('.submenu li').click((event) => {
    $('form').off();

    const action = $(event.currentTarget).text();
    const menuName = $(event.currentTarget).closest('ul').parent().text()
      .split(' ')[0]; // Получаем текст родительского элемента li (entity)

    showAction(action, menuName);

    const functionName = action.toLowerCase() + menuName.slice(0, -2);

    if (availableFunctions[functionName]) {
      availableFunctions[functionName]();
    } else {
      showMessage({ error: `Function ${functionName} is not available` });
    }
  });
});

getHomePage();
