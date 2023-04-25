class Section {
    constructor({ renderer }, container) {
        this._renderer = renderer;
        this._container = container;
    }
    renderItems(card) {
        card.forEach((data) => {
            this._renderer(data);
        });
    }
    prependItem(element) {
        this._container.prepend(element);
    }
    addItem(element) {
        this._container.append(element);
    }
}
export default Section;
