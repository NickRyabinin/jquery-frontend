/**
 * user.js - контроллер CRUD взаимодействия с сущностью user (через AJAX-запросы к API)
 */

import apiUrl from './main.js';
import { buildForm } from './builder.js';
import { showMessage } from './view.js';
import makeAjaxRequest from './request.js';
import { handleForm, readEntity } from './controller.js';

const entity = 'user';

function authorizeUser() {
  const fillableProperties = ['token'];
  const form = buildForm(fillableProperties);
  $('main').append(form);

  form.submit((event) => {
    event.preventDefault();

    const token = $('#token').val();
    sessionStorage.setItem('token', token);
    showMessage({ message: `User authorized with token<br>${token}` });

    form.off('submit');
  });
}

function createUser() {
  const fillableProperties = ['login', 'email'];
  const url = `${apiUrl}users/`;
  const method = 'POST';

  handleForm(fillableProperties, url, method);
}

function readUser() {
  readEntity('', 1, entity);
}

function updateUser() {
  makeAjaxRequest(`${apiUrl}users/`, 'PUT');
}

function deleteUser() {
  makeAjaxRequest(`${apiUrl}users/`, 'DELETE');
  sessionStorage.removeItem('token');
}

export {
  authorizeUser, createUser, readUser, updateUser, deleteUser,
};
