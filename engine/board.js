class board {
  constructor(onePlayer, twoPlayer) {
    //инициализация игрового поля
    this.divBoard = document.createElement('div');
    this.divBoard.id = 'board';
    this.divBoard.className = 'board';
    this.player1 = onePlayer;
    this.player2 = twoPlayer;

    //создаем панель счета
    this.panel = document.createElement('h1');
    this.panel.id = 'panel';
    this.panel.className = 'panel';
    this.updateScore();

    document.body.appendChild(this.panel);
    document.body.appendChild(this.divBoard);

    //создаем массив ячеек [][]
    this.arrayCell = [];
    for (let i = 0; i < 3; i++) {
      this.arrayCell[i] = [];
      for (let j = 0; j < 3; j++) {
        let idCell = i * 3 + j + 1;
        let c = new cell(idCell, this.divBoard.id, j, i);
        this.arrayCell[i][j] = c; // объекты ячеек в массив
        this.divBoard.appendChild(this.arrayCell[i][j].getElem()); //вывод доски
      }
    }
  }

  updateScore() {
    this.panel.textContent =
      ' Крестики -      ' +
      this.player1.getScore() +
      '        Нолики - ' +
      this.player2.getScore();
  }

  checkRows() {
    for (let i = 0; i < 3; i++) {
      let sum =
        this.arrayCell[i][0].getState() +
        this.arrayCell[i][1].getState() +
        this.arrayCell[i][2].getState();
      if (sum == -3) this.player2.setWin(true);
      if (sum == 3) this.player1.setWin(true);
    }
  }
  checkCols() {
    for (let i = 0; i < 3; i++) {
      let sum =
        this.arrayCell[0][i].getState() +
        this.arrayCell[1][i].getState() +
        this.arrayCell[2][i].getState();
      if (sum == -3) this.player2.setWin(true);
      if (sum == 3) this.player1.setWin(true);
    }
  }

  checkDiagonals() {
    for (let i = 0; i < 1; i++) {
      let sum =
        this.arrayCell[i][i].getState() +
        this.arrayCell[i + 1][i + 1].getState() +
        this.arrayCell[i + 2][i + 2].getState();
      if (sum == -3) this.player2.setWin(true);
      if (sum == 3) this.player1.setWin(true);
    }
    for (let i = 1; i > 0; i--) {
      let sum =
        this.arrayCell[i][i].getState() +
        this.arrayCell[i + 1][i - 1].getState() +
        this.arrayCell[i - 1][i + 1].getState();
      if (sum == -3) this.player2.setWin(true);
      if (sum == 3) this.player1.setWin(true);
    }
  }

  /**
   * Проверка победителя,
   * смотрим строки, столбцы и диагонали,
   * если есть победитель увеличиваем его счетчик
   */
  checkWinner() {
    this.checkRows();
    this.checkCols();
    this.checkDiagonals();

    if (this.player1.getWin()) {
      this.player1.addScore();
      return true;
    }
    if (this.player2.getWin()) {
      this.player2.addScore();
      return true;
    }
    return false;
  }

  /**
   * Вернет игрока,
   * который может пойти
   * При первом ходе, возвращается
   * первый игрок
   */
  currentPlayer() {
    if (this.player1.getAbilityMove() == true) {
      this.player1.setAbilityMove(false);
      this.player2.setAbilityMove(true);
      return this.player1;
    } else if (this.player2.getAbilityMove() == true) {
      this.player2.setAbilityMove(false);
      this.player1.setAbilityMove(true);
      return this.player2;
    }
  }

  /**
   * Поиск клетки в массиве
   * по id
   */
  findById(id) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.arrayCell[i][j].getId() == id) {
          return this.arrayCell[i][j];
        }
      }
    }
  }

  /**
   * Обновляет переданную ячейку,
   * если свободна ставит метку игрока
   */
  updateCell(player, idCell) {
    let c = this.findById(idCell);
    if (c.getState() != 0) {
      alert('Ячейка занята');
    } else {
      c.setState(player.getState());
      c.getElem().classList.add(player.getName());
    }
  }
  /**
   * Проверяет, есть ли хотя бы одна свободная ячейка
   */
  freeCell() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.arrayCell[i][j].getState() == 0) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Очищает игровую доску,
   * присваивает всем ячейка состояние 0
   */
  cleanCells() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.arrayCell[i][j].setState(0);
        this.arrayCell[i][j]
          .getElem()
          .classList.toggle(this.player1.getName(), false);
        this.arrayCell[i][j]
          .getElem()
          .classList.toggle(this.player2.getName(), false);
      }
    }
  }

  /**
   * Перезапуск игры,
   * если есть победитель,
   * очищаем доску, обновляем счет
   */
  gameRestart() {
    if (this.checkWinner() == true || this.freeCell() == false) {
      this.cleanCells();
      this.updateScore();
      this.player1.setWin(false);
      this.player2.setWin(false);
    }
  }

  /**
   * Вешает слушатель на доску,
   * при клике опредяет ячейку и игрока,
   * ожидает дальнейших ходов.
   *
   * После окончания игры перезапускает ее
   */
  startGame() {
    this.divBoard.addEventListener('click', (event) => {
      let idCell = event.target.id;
      let player = this.currentPlayer();
      if (this.checkWinner() == false) {
        this.updateCell(player, idCell);
      }
      this.gameRestart();
    });
  }
}
