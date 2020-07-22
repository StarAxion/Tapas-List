const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");

let items = JSON.parse(localStorage.getItem('items')) || [];



function addItem(event) {
    event.preventDefault();

    const text = this.querySelector('[name=item]').value;
    const item = {
        text,
        done: false
    }

    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
    displayData(items, itemsList);
    this.reset();
}

addItems.addEventListener('submit', addItem);



function displayData(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, index) => {
        return `
            <li data-index="${index}" onmouseenter="showControls(event)" onmouseleave="hideControls(event)">
                <div class="checkbox-block">
                    <input type="checkbox" id="item-${index}" ${plate.done ? "checked" : ""} onclick="toggleDone(event)">
                    <label for="item-${index}">${plate.text}</label>
                </div>

                <form class="edit-form">
                    <input type="text" class="edit-form__input" value="${plate.text}">
                    <div class="edit-form__controls-block">
                        <i class="far fa-check-square control-button edit-form__submit-button" title="save"></i>
                        <i class="far fa-window-close control-button edit-form__cancel-button" title="cancel"></i>
                    </div>          
                </form>

                <div class="controls-block hidden">
                    <i class="fas fa-pen-square control-button edit-button" title="edit" onclick="editItemName(event)"></i>
                    <i class="fas fa-trash-alt control-button delete-button" title="delete" onclick="deleteItem(event)"></i>
                </div>
            </li>
        `
    }).join('');
}

displayData(items, itemsList);
