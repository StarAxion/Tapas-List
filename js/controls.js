function toggleDone(event) {
  let index = event.target.parentElement.parentElement.dataset.index;

  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  displayData(items, itemsList);
}



function showControls(event) {
  if (event.target.firstElementChild.firstElementChild.checked) return;
  event.target.lastElementChild.classList.remove('hidden');
}


function hideControls(event) {
  event.target.lastElementChild.classList.add('hidden');
}



function editItemName(event) {
  let index = event.target.parentElement.parentElement.dataset.index;

  const editForm = event.target.parentElement.parentElement.querySelector(".edit-form"),
    editInput = editForm.firstElementChild,
    submitButton = editForm.querySelector(".edit-form__submit-button"),
    cancelButton = editForm.querySelector(".edit-form__cancel-button"),
    chekboxBlock = editForm.parentElement.firstElementChild,
    controlsBlock = editForm.parentElement.lastElementChild;

  editForm.style.display = "flex";
  chekboxBlock.style.display = "none";
  controlsBlock.style.display = "none";


  function saveChanges(e) {
    e.preventDefault();

    if (editInput.value !== '') {
      items[index].text = editInput.value;
      localStorage.setItem('items', JSON.stringify(items));
      displayData(items, itemsList);

      editForm.style.display = "none";
      chekboxBlock.style.display = "block";
      controlsBlock.style.display = "block";
    } else {
      editInput.focus();
      editInput.placeholder = "Enter item name";
    }
  }

  submitButton.addEventListener('click', saveChanges);
  editForm.addEventListener('submit', saveChanges);


  function cancelChanges() {
    editInput.value = items[index].text;

    editForm.style.display = "none";
    chekboxBlock.style.display = "block";
    controlsBlock.style.display = "block";
  }

  cancelButton.addEventListener('click', cancelChanges);
  editInput.onkeyup = function (event) {
    if (event.keyCode === 27) {
      cancelChanges();
    }
  };
}



function deleteItem(event) {
  let index = event.target.parentElement.parentElement.dataset.index;

  const confirmModal = document.querySelector(".confirm-modal"),
    modalSubmitButton = document.querySelector(".modal-content__submit-button"),
    modalCancelButton = document.querySelector(".modal-content__cancel-button");

  confirmModal.style.display = "flex";

  modalSubmitButton.onclick = function () {
    confirmModal.style.display = "none";
    items.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(items));
    if (items.length === 0) localStorage.clear();
    displayData(items, itemsList);
  }

  modalCancelButton.onclick = function () {
    confirmModal.style.display = "none";
  }
}
