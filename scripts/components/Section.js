class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderElement(data) {
    data.forEach((item) => {
      this._renderer(item);
    });
  }
}

export { Section };
