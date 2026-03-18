// import { gsap } from "gsap/gsap-core";
const formItem = document.querySelector('[name="formulario"]');
const inputForm = formItem.querySelector('#input--item');
const inputFilter = document.querySelector('.input-filter');
const items = document.querySelector('.items');
const btnClear = document.querySelector('.btn-clear-all');
const btnForm = formItem.querySelector('.addItem');
let isEditMode = false;

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.forEach(item => {
    addItemToDom(item);
  });
}

//  Implementando a nova funcionalidade para checar se o item ja  tinha existido na lista se for sim para nao permitir  a duplicacao se caso for nao adicionar uma nova item   dentro do cart

function onAddItemSubmit(event) {
  this.classList.add('transition', 'duration-200');
  event.preventDefault();
  const valueInput = inputForm;
  let newText = valueInput.value.trim();

  // Check input value  === ""

  if (newText === '') return alert('please enter something');

  newText = newText
    .split(/\s+/)
    .map(text => text[0].toUpperCase() + text.slice(1).toLowerCase())
    .join(' ');

  if (isEditMode) {
    const itemToEdit = items?.querySelector('.edit-modo');

    if (!itemToEdit) {
      isEditMode = false;
      return;
    }

    itemToEdit.classList.remove('edit-modo');
    itemToEdit.remove();

    limparInput();
  } else {
    if (checkIfItemExists(newText)) {
      alert('That item already exists');
      return;
    }
  }

  // if(document.querySelectorAll('ul li').forEach(el => el.textContent.indexOf(newText) - 1)){
  //   alert('Nao Existe')
  // }

  addItemToDom(newText);
  addItemToStorage(newText);
  btnForm.classList.remove('edited-modo');
  btnForm.classList.add('add-modo');
  btnForm.innerHTML = '<i class="fa-solid fa-plus"></i>Add Item';
  isEditMode = false;
  limparInput();
}

function addItemToDom(text) {
  // let istrue = false;
  // if(istrue) {};
  // Create and appdending child
  const li = document.createElement('li');
  li.classList.add(
    'bg-gray-600',
    'hover:bg-gray-700',
    'cursor-pointer',
    'text-white',
    'mt-4',
    'p-2',
    'rounded',
    'w-full',
  );
  li.className =
    'flex items-center hover:bg-linear-to-t from-gray-900/9 transition hover:text-slate-600 duration-150 cursor-pointer justify-between p-2 bg-slate-200 rounded show';
  li.appendChild(document.createTextNode(text));
  const button = creatButton('flex items-center justify-content-between');
  li.appendChild(button);

  items.appendChild(li);
  checkUI(0);

  return items;
}

function creatButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark text-red-500 cursor-pointer');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}
function addItemToStorage(item) {
  const itemsFormStorage = getItemsFromStorage();
  // Add new Item to Array
  itemsFormStorage.push(item);
  // Convertendo JSON para JSON Stringfy
  localStorage.setItem('items', JSON.stringify(itemsFormStorage));
}

function getItemsFromStorage() {
  let itemsFormStorage;
  if (localStorage.getItem('items') === null) {
    itemsFormStorage = [];
  } else {
    itemsFormStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsFormStorage;
}
// Items Remove
function onClickRemoveItem(item) {
  removeItem(item.closest('li'));
  checkLength();
  return;
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.some(i => i.toLowerCase() === item.toLowerCase());
}

function setItemToEdit(item) {
  // removendo classe hidden no "button " remove
  document.querySelector('ul button.hidden')?.classList.remove('hidden');
  // Removendo classe edit-mode para "li"
  document.querySelector('.edit-modo')?.classList.remove('edit-modo');

  isEditMode = true;
  // Adicionando as Classes
  item.classList.add('edit-modo');
  item.querySelector('button').classList.add('hidden');
  btnForm.classList.add('edited-modo');
  btnForm.classList.remove('add-modo');

  btnForm.classList.contains('edited-modo')
    ? (btnForm.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item')
    : (btnForm.innerHTML = '<i class="fa-solid fa-plus"></i>Add Item');
  inputForm.value = item.textContent.trim();
}
function removeItemFromStorage(item) {
  const items = getItemsFromStorage().filter(i => i !== item);
  localStorage.setItem('items', JSON.stringify(items));
  return;
}

function removeItemDom(event) {
  const removeIcon = event.target;

  // If statement for Foreach Looping
  if (removeIcon.classList.contains('fa-xmark')) {
    onClickRemoveItem(removeIcon);
  } else {
    if (event.target !== this)
      // prettier-ignore

      setItemToEdit(event.target);
  }
}
function removeItem(item) {
  if (confirm('Are you sure?')) {
    item.remove();
    let element = item.textContent.trim();
    document.querySelector('.edit-modo').classList.remove('edit-modo');
    // item.querySelector('button').classList.remove('hidden');
    // Vericando se o item contains a clalist se for sim antes de remover o  item dentro de ul, remover a classliss
    btnForm.classList.remove('edited-modo');
    btnForm.classList.add('add-modo');
    !btnForm.classList.contains('edited-modo')
      ? (btnForm.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item')
      : (btnForm.innerHTML = '<i class="fa-solid fa-plus"></i>Update Item');
    document.querySelectorAll('ul button').forEach(btn => {
      btn.classList.remove('hidden');
    });

    const respo = JSON.parse(localStorage.getItem('items')) || [];
    let updatedItems = respo.filter(i => i !== element);

    localStorage.setItem('items', JSON.stringify(updatedItems));
    checkUI(0);
    checkLength();
    limparInput();
  }
}
// Getting All Elements in the DOM Page
// function localStorage(item) {
//   let localStorageItem = [];

//   if (localStorageItem.length === 0) {
//     localStorageItem = localStorage.setItem('produtos');
//   }
// }
// cards.forEach(card => {
// console.log(card.lastChild.previousSibling);

// // prettier-ignore
// if (card.firstChild.nextElementSibling.textContent.toLowerCase().includes(valueInput)) {
//   card.style.display = "grid";
//   card.querySelector('button').classList.toggle('btn');
// } else {
//   card.querySelector('button').classList.toggle('btn');
//   card.style.display = "none";
// }
//  });

// Limpar Input
function limparInput() {
  inputForm.value = '';
  inputForm.focus();
  inputFilter.value = '';
}

// Filter Input

function filterItems(e) {
  const listItems = Array.from(items.querySelectorAll('li'));
  listItems.filter(item => {
    if (
      item.firstChild.textContent
        .toLocaleLowerCase()
        .includes(e.target.value.toLocaleLowerCase())
    )
      item.style.display = 'flex';
    else item.style.display = 'none';
  });
}

// Check Lenght Items
function checkLength() {
  const legthItems = items.querySelectorAll('li').length === 0;
  checkUI(legthItems);
}
function checkUI(status = 0) {
  if (status) {
    inputFilter.parentElement.style.display = 'none';
    btnClear.parentElement.style.display = 'none';
    btnForm.classList.remove('edited-modo');
    btnForm.classList.add('add-modo');
    btnForm.innerHTML = '<i class="fa-solid fa-plus"></i>Add Item';
    inputForm.value = '';
    inputForm.focus();
    inputForm.focus();
  } else {
    inputFilter.parentElement.style.display = 'flex';
    btnClear.parentElement.style.display = 'flex';
  }
}

function clearItems() {
  // while(items.firstChild){

  //   items.remove()
  // }
  items.innerHTML = '';
  localStorage.removeItem('items');
  checkUI(0);
  checkLength();
  // inputFilter.parentElement.style.display = 'none';
  // btnClear.style.display = 'none';
}

function editItem(item) {
  let input = document.querySelector('#input--item');
  input.value = item.textContent.trim();
  if (isEditMode) {
    item.remove();
    // item.classList.add('edit-mode');
    btnAdItem.innerHTML = `<i class="fa-solid fa-pen text-white"></i> Edit Item`;
    btnAdItem.className =
      'bg-green-500 hover:bg-green-600 cursor-pointer text-white mt-4 p-2 md:w-full rounded';
    checkUI(0);
  } else {
    btnAdItem.innerHTML = ` <i class="fa-solid fa-plus text-white"></i> Add Item`;
    btnAdItem.className =
      'bg-gray-500 hover:bg-gray-600 cursor-pointer text-white mt-4 p-2 w-full rounded';
  }
}

function resizeModo(e) {
  const h1 = document.querySelector('h1');
  if (window.innerWidth <= 515 || matchMedia('(max-width: 500px)').matches) {
  } else {
    document.body.style.backgroundColor = 'initial';
    console.log('false');
  }
}
// window.addEventListener('resize', resizeModo.bind(this));

document.addEventListener('DOMContentLoaded', () => {
  formItem.addEventListener('submit', onAddItemSubmit);
  items.addEventListener('click', removeItemDom);
  inputFilter.addEventListener('input', filterItems);
  btnClear.addEventListener('click', clearItems);
  checkUI(0);
  checkLength();
  displayItems();
});

// const itemsLocal = JSON.parse(localStorage.getItem('items'));

// itemsLocal?.forEach(text => {
//   const html = `<li
//             class="flex items-center hover:bg-linear-to-t from-gray-900/9 transition hover:text-slate-600 duration-150 cursor-pointer justify-between p-2 bg-slate-200 rounded"
//           >
//             ${text}
//             <button>
//               <i class="fa-solid fa-xmark text-red-500 cursor-pointer"></i>
//             </button>
//           </li>`;
//   items.insertAdjacentHTML('afterbegin', html);
// });
