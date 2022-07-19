import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    let modal = createElement(`
    <div class="modal">
      <!--Прозрачная подложка перекрывающая интерфейс-->
      <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">
          <!--Кнопка закрытия модального окна-->
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

          <h3 class="modal__title"></h3>
        </div>

        <div class="modal__body"></div>
      </div>
    </div>
    `);

    this.modal = modal;
  }

  setTitle(title) {
    this.title = title;
    this.modal.querySelector('.modal__title').innerHTML = this.title;
  }

  setBody(body) {
    this.body = body;
    this.modal.querySelector('.modal__body').innerHTML = '';
    this.modal.querySelector('.modal__body').append(this.body);
  }

  open() {
    document.querySelector('body').append(this.modal);

    document.querySelector('body').classList.add('is-modal-open');

    document.querySelector('.modal__inner').addEventListener('click', (event) => {
      this.clickClose(event);
    });

    this.escHandler = this.escClose.bind(this);
    document.addEventListener('keydown', this.escHandler);
  }

  close() {
    document.removeEventListener('keydown', this.escHandler);

    document.querySelector('body').classList.remove('is-modal-open');

    if (document.querySelector('.modal')) document.querySelector('.modal').remove();
  }

  clickClose(event) {
    if (!event.target.closest('.modal__close')) return;
    this.close();
  }

  escClose(event) {
    if (event.code === 'Escape') this.close();
  }
  
}
