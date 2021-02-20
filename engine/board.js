class Board {
  constructor(onePlayer, twoPlayer) {
    //инициализация игрового поля
    this.divBoard = document.createElement('div');
    this.divBoard.id = 'board';
    this.divBoard.className = 'board';
    this.player1 = onePlayer;
    this.player2 = twoPlayer;

    //создаем панель счета
    this.panel = new Panel();
    this.panel.updateScore(this.player1, this.player2);

    document.body.appendChild(this.divBoard);

    //создаем массив ячеек [][]
    this.arrayCell = [];
    for (let i = 0; i < 3; i++) {
      this.arrayCell[i] = [];
      for (let j = 0; j < 3; j++) {
        let idCell = i * 3 + j + 1;
        let c = new Cell(idCell, this.divBoard.id, j, i);
        this.arrayCell[i][j] = c; // объекты ячеек в массив
        this.divBoard.appendChild(this.arrayCell[i][j].elem); //вывод доски
      }
    }
  }

  checkRows() {
    for (let i = 0; i < 3; i++) {
      let sum =
        this.arrayCell[i][0].state +
        this.arrayCell[i][1].state +
        this.arrayCell[i][2].state;
      if (sum == -3) this.player2.winner = true;
      if (sum == 3) this.player1.winner = true;
    }
  }
  checkCols() {
    for (let i = 0; i < 3; i++) {
      let sum =
        this.arrayCell[0][i].state +
        this.arrayCell[1][i].state +
        this.arrayCell[2][i].state;
      if (sum == -3) this.player2.winner = true;
      if (sum == 3) this.player1.winner = true;
    }
  }

  checkDiagonals() {
    let sumDiag1 =
      this.arrayCell[0][0].state +
      this.arrayCell[1][1].state +
      this.arrayCell[2][2].state;

    let sumDiag2 =
      this.arrayCell[1][1].state +
      this.arrayCell[2][0].state +
      this.arrayCell[0][2].state;

    if (sumDiag1 == 3 || sumDiag2 == 3) this.player1.winner = true;
    if (sumDiag1 == -3 || sumDiag2 == -3) this.player2.winner = true;
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

    if (this.player1.winner) {
      this.player1.score++;
      return true;
    }
    if (this.player2.winner) {
      this.player2.score++;
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
    if (this.player1.abilityMove == true) {
      this.player1.abilityMove = false;
      this.player2.abilityMove = true;
      return this.player1;
    } else if (this.player2.abilityMove == true) {
      this.player2.abilityMove = false;
      this.player1.abilityMove = true;
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
        if (this.arrayCell[i][j].elem.id == id) {
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
    if (c.state != 0) {
      alert('Ячейка занята');
    } else {
      c.state = player.state;
      c.elem.classList.add(player.name);
    }
  }
  /**
   * Проверяет, есть ли хотя бы одна свободная ячейка
   */
  freeCell() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.arrayCell[i][j].state == 0) {
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
        this.arrayCell[i][j].state = 0;
        this.arrayCell[i][j].elem.classList.toggle(this.player1.name, false);
        this.arrayCell[i][j].elem.classList.toggle(this.player2.name, false);
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
      this.panel.updateScore(this.player1, this.player2);
      this.player1.winner = false;
      this.player2.winner = false;
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
