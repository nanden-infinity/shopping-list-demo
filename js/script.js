// import { gsap } from "gsap/gsap-core";
const formItem = document.querySelector('[name="formulario"]');
const inputForm = formItem.querySelector('#input--item');
const inputFilter = document.querySelector('.input-filter');
const items = document.querySelector('.items');
const btnClear = document.querySelector('.btn-clear-all');
const btnForm = formItem.querySelector('.addItem');
let isEditMode = false;
formItem.addEventListener('submit', onAddSubmit);

function onAddSubmit(event) {
  this.classList.add('transition', 'duration-200');
  console.log(this);

  event.preventDefault();
  const valueInput = event.target.elements.input;
  const newText = valueInput.value;
  const li = document.createElement('li');
  li.classList.add(
    'bg-gray-600',
    'hover:bg-gray-700',
    'cursor-pointer',
    'text-white',
    'mt-4',
    'p-2',
    'w-full',
    'rounded',
  );
  // Check input value  === ""

  if (newText === '') return alert('please enter something');

  // Check for Edit Modo
  if (isEditMode) {
    isEditMode = false;
    const itemToEdit = items.querySelector('li.edit-modo');
    itemToEdit?.classList.remove('edit-modo');
    itemToEdit.remove();
    console.log(itemToEdit);

    !isEditMode
      ? btnForm.classList.toggle('edited-modo')
      : btnForm.classList.toggle('add-modo');
    btnForm.classList.contains('edited-modo')
      ? (btnForm.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item')
      : (btnForm.innerHTML = '<i class="fa-solid fa-plus"></i>Add Item');
  }
  // Create and appdending child

  li.className =
    'flex items-center hover:bg-linear-to-t from-gray-900/9 transition hover:text-slate-600 duration-150 cursor-pointer justify-between p-2 bg-slate-200 rounded';
  li.appendChild(document.createTextNode(newText));
  const button = creatButton('flex items-center justify-content-between');
  li.appendChild(button);
  setTimeout(
    () => {
      li.classList.add('show');

      items.appendChild(li);
    },
    (Math.random() * 5 + 2) * 100,
  );
  checkUI();
  valueInput.value = '';
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

items.addEventListener('click', event => {
  const removeIcon = event.target;

  // If statement for Foreach Looping
  if (removeIcon.classList.contains('fa-xmark')) {
    onClickItem(removeIcon);
    console.log(true);
  } else {
    setItemToEdit(event.target);
  }
});
// Items Remove
function onClickItem(item) {
  removeItem(item.closest('li'));
  checkLength();
  return;
}

function setItemToEdit(item) {
  // document.querySelector('.edit-modo')?.classList.remove('edit-modo');
  isEditMode = true;
  item.classList.add('edit-modo');
  isEditMode
    ? btnForm.classList.toggle('edited-modo')
    : btnForm.classList.toggle('add-modo');
  console.log(isEditMode);

  btnForm.classList.contains('edited-modo')
    ? (btnForm.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item')
    : (btnForm.innerHTML = '<i class="fa-solid fa-plus"></i>Add Item');
  inputForm.value = item.textContent.trim();
  console.log(item);
}
function removeItem(item) {
  if (confirm('Are you sure?')) {
    item.remove();
    checkUI();
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
  const size = items.querySelectorAll('li').length === 0;
  checkUI(size);
}
function checkUI(status) {
  if (status) {
    inputFilter.parentElement.style.display = 'none';
    btnClear.style.display = 'none';
  } else {
    inputFilter.parentElement.style.display = 'flex';
    btnClear.style.display = 'flex';
  }
}

function editItem(item) {
  let input = (document.querySelector('#input--item').value =
    item.textContent.trim());
  if (isEditMode) {
    const li = items.querySelector('.edit');
    li?.remove();
    console.log(li);
    item.classList.add('edit');
    btnAdItem.innerHTML = `
            
            <i class="fa-solid fa-pen text-white"></i>
            Edit Item
          `;
    btnAdItem.className =
      'bg-green-500 hover:bg-green-600 cursor-pointer text-white mt-4 p-2 md:w-full rounded';
  } else {
    btnAdItem.innerHTML = `
            
            <i class="fa-solid fa-plus text-white"></i>
            Add Item
          `;
    btnAdItem.className =
      'bg-gray-500 hover:bg-gray-600 cursor-pointer text-white mt-4 p-2 w-full rounded';
  }

  console.log(item, input);
}

function resizeModo(e) {
  const h1 = document.querySelector('h1');
  if (window.innerWidth <= 515 || matchMedia('(max-width: 500px').matches) {
  } else {
    document.body.style.backgroundColor = 'initial';
    console.log('false');
  }
}
window.addEventListener('resize', resizeModo.bind(this));
inputFilter.addEventListener('input', filterItems);
