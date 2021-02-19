class cell {
  constructor(idCell, idBoard, col, row) {
    this.elem = document.createElement('div');
    this.elem.id = idCell;
    this.elem.className = 'cell';
    this.state = 0;
    this.col = col;
    this.row = row;

    document.getElementById(idBoard).appendChild(this.elem);
  }

  getCol() {
    return this.col;
  }

  getRow() {
    return this.row;
  }

  getState() {
    return this.state;
  }

  setState(num) {
    this.state = num;
  }

  getElem() {
    return this.elem;
  }

  getId() {
    return this.elem.id;
  }
}
