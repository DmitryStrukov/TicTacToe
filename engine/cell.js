class Cell {
  constructor(idCell, idBoard) {
    this.elem = document.createElement('div');
    this.elem.id = idCell;
    this.elem.className = 'cell';
    this.state = 0;
    document.getElementById(idBoard).appendChild(this.elem);
  }
}
