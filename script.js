`use strict`;

let toDoInput;
let toDoList;
let addBtn;
let errorInfo;
let popup;
let popupInfo;
let toDoToEdit;
let popupInput;
let popUpAddBtn;
let popupCloseBtn;

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
};

const prepareDOMElements = () => {
  toDoInput = document.querySelector('.todo-input');
  errorInfo = document.querySelector('.error-info');
  toDoList = document.querySelector('.todolist ul');
  addBtn = document.querySelector('.btn-add');
  popup = document.querySelector('.popup');
  popupInfo = document.querySelector('.popup-info');
  popupInput = document.querySelector('.popup-input');
  popUpAddBtn = document.querySelector('.accept');
  popupCloseBtn = document.querySelector('.cancel');
};

const prepareDOMEvents = () => {
  addBtn.addEventListener('click', addNewTask);
  toDoList.addEventListener('click', checkClick);
  popupCloseBtn.addEventListener('click', closePopup);
  popUpAddBtn.addEventListener('click', changeToDoText);
  toDoInput.addEventListener('keyup', enterKeyCheck);
};

const addNewTask = () => {
  if (toDoInput.value !== '') {
    const newToDo = document.createElement('li');
    newToDo.textContent = toDoInput.value;
    createToolsArea(newToDo);
    toDoList.append(newToDo);

    toDoInput.value = '';
    errorInfo.textContent = '';
  } else {
    errorInfo.textContent = 'Wpisz treść zadania';
  }
};

const createToolsArea = (newToDo) => {
  const toolsPanel = document.createElement('div');
  toolsPanel.classList.add('tools');
  newToDo.append(toolsPanel);

  const completeBtn = document.createElement('button');
  completeBtn.classList.add('complete');
  completeBtn.innerHTML = '<i class="fas fa-check"></i></button>';

  const editBtn = document.createElement('button');
  editBtn.textContent = 'EDIT';
  editBtn.classList.add('edit');

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete');
  deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

  toolsPanel.append(completeBtn, editBtn, deleteBtn);
};

const checkClick = (e) => {
  if (e.target.matches('.complete')) {
    e.target.closest('li').classList.toggle('completed');
    e.target.classList.toggle('completed');
  } else if (e.target.matches('.edit')) {
    console.log('Edit');
    editToDo(e);
  } else if (e.target.matches('.delete')) {
    console.log('Delete');
    deleteToDo(e);
  }
};

const editToDo = (e) => {
  toDoToEdit = e.target.closest('li');
  popupInput.value = toDoToEdit.firstChild.textContent;
  popup.style.display = 'flex';
};

const closePopup = () => {
  popup.style.display = 'none';
  popupInfo.textContent = '';
};

const changeToDoText = () => {
  if (popupInput.value !== '') {
    toDoToEdit.firstChild.textContent = popupInput.value;
    popupInfo.textContent = '';
    closePopup();
  } else {
    popupInfo.textContent = 'Musisz podać jakąś treść.';
  }
};

const deleteToDo = (e) => {
  e.target.closest('li').remove();

  const allToDos = toDoList.querySelectorAll('li');
  console.log(allToDos.length);
  if (allToDos.length == 0) {
    errorInfo.textContent = 'Brak zadań na liście';
  }
};

const enterKeyCheck = (e) => {
  if (e.key === 'Enter') {
    addNewTask();
  }
};

document.addEventListener('DOMContentLoaded', main);
