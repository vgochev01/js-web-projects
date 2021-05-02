const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const columnList = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

// Items
let draggedItem;
let currentColumn;

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];

// App Start
attachEvents()
updateDOM();

// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  const itemArrays = JSON.parse(localStorage.getItem('itemArrays'));
  if (itemArrays) {
    backlogListArray = itemArrays.backlogListArray;
    progressListArray = itemArrays.progressListArray;
    completeListArray = itemArrays.completeListArray;
    onHoldListArray = itemArrays.onHoldListArray;
  } else {
    backlogListArray = ['Release the course', 'Sit back and relax'];
    progressListArray = ['Work on projects', 'Listen to music'];
    completeListArray = ['Being cool', 'Getting stuff done'];
    onHoldListArray = ['Being uncool'];
  }
}

// Set localStorage Arrays
function updateSavedColumns() {
  let itemArrays = { backlogListArray, progressListArray, completeListArray, onHoldListArray };
  localStorage.setItem('itemArrays', JSON.stringify(itemArrays));
}

// Create DOM Elements for each list item
function createItemEl(columnEl, item, index) {
  // List Item
  const listEl = document.createElement('li');
  listEl.classList.add('drag-item');
  listEl.textContent = item;
  listEl.draggable = true;
  listEl.contentEditable = true;
  listEl.addEventListener('dragstart', dragItem);
  listEl.addEventListener('focusout', onFocusOut);
  // Append to column
  columnEl.appendChild(listEl);
}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  getSavedColumns();
  // Backlog Column
  backlogList.innerHTML = '';
  backlogListArray.forEach((listItem, index) => createItemEl(backlogList, listItem, index));
  // Progress Column
  progressList.innerHTML = '';
  progressListArray.forEach((listItem, index) => createItemEl(progressList, listItem, index));
  // Complete Column
  completeList.innerHTML = '';
  completeListArray.forEach((listItem, index) => createItemEl(completeList, listItem, index));
  // On Hold Column
  onHoldList.innerHTML = '';
  onHoldListArray.forEach((listItem, index) => createItemEl(onHoldList, listItem, index));
  // Run getSavedColumns only once, Update Local Storage
}

function dragItem(ev){
  draggedItem = ev.target;
}

// Collumn allows for item to drop 
function allowDrop(ev){
  ev.preventDefault();
}

function dropItem(ev){
  ev.preventDefault();
  columnList.forEach(l => l.classList.remove('over'));
  columnList[currentColumn].appendChild(draggedItem);

  let columnArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
  const itemArray = columnArrays.find(arr => arr.includes(draggedItem.textContent));
  const itemIndex = itemArray.indexOf(draggedItem.textContent);
  itemArray.splice(itemIndex, 1);
  columnArrays[currentColumn].push(draggedItem.textContent);
  // Update Local Storage
  updateSavedColumns();
}

function dragEnter(columnIndex){
  columnList[columnIndex].classList.add('over');
  currentColumn = columnIndex;
}

function showInput(columnIndex){
  addItemContainers[columnIndex].style.display = "flex";
  addBtns[columnIndex].style.visibility = 'hidden';
  saveItemBtns[columnIndex].style.display = 'flex';
}

function hideInput(columnIndex){
  const itemText = addItems[columnIndex].textContent.trim();
  if(itemText){
    let columnArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
    columnArrays[columnIndex].push(itemText);
    updateSavedColumns();
    updateDOM();
    addItems[columnIndex].textContent = '';
  }

  addItemContainers[columnIndex].style.display = "none";
  addBtns[columnIndex].style.visibility = 'visible';
  saveItemBtns[columnIndex].style.display = 'none';
}

function onFocusOut(ev){
  console.log(true);
}

function attachEvents(){
  columnList.forEach((l, i) => {
    l.addEventListener('dragover', allowDrop);
    l.addEventListener('dragenter', () => dragEnter(i));
    l.addEventListener('drop', dropItem);
  });

  addBtns.forEach((b, i) => {
    b.addEventListener('click', () => showInput(i));
  })

  saveItemBtns.forEach((b, i) => {
    b.addEventListener('click', () => hideInput(i));
  })
}
