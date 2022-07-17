/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    
    let table = document.createElement('table');
    this.table = table;
    table.className = 'tableUsers';
    table.innerHTML = `<thead><tr>
    <th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th><th></th>
    </tr></thead>`

    let tbody = document.createElement('tbody');
    table.append(tbody);

    tbody.innerHTML = rows.map((row) => {
      return `<tr><td class="userName">${row.name}</td>
      <td class="userAge">${row.age}</td>
      <td class="userSalary">${row.salary}</td>
      <td class="userCity">${row.city}</td>
      <td class="userButton"><button>X</button></td></tr>`
    }).join('');
    
    table.addEventListener('click', this.onClick);
  }

  onClick(event) {
    event.target.closest('tr').remove();
  }

  get elem() {
    return this.table;  
  }
}

