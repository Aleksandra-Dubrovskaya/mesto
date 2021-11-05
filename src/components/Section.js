export default class Section {
  constructor(containerSelector, renderer) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  // метод отвечает за отрисовку всех элементов
  renderItems(items) {
    items.forEach(item => {
      this.addItem(item);
    })
  }

  // метод добавляет карточку в контейнер
  addItem(data) {
    const item = this._renderer(data);
    this._container.prepend(item);
  }
}
