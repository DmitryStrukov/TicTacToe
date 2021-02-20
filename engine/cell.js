class Cell {
  constructor(idCell, idBoard, col, row) {
    this.elem = document.createElement('div');
    this.elem.id = idCell;
    this.elem.className = 'cell';
    this.state = 0;
    this.col = col;
    this.row = row;

    document.getElementById(idBoard).appendChild(this.elem);
  }
}
