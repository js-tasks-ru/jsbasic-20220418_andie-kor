function highlight(table) {

  for (let tr of table.lastElementChild.children){

    let trAvailableFlag = tr.lastElementChild.dataset.available;
    if (trAvailableFlag == 'true') tr.classList.add('available');
    else if (trAvailableFlag == 'false') tr.classList.add('unavailable');
    else tr.hidden = true;

    let gender = tr.cells[2].innerHTML;
    if (gender == 'm') tr.classList.add('male');
    else if (gender == 'f') tr.classList.add('female');

    if (+tr.cells[1].innerHTML < 18){
      tr.style.textDecoration = 'line-through';
    }

  }
}
