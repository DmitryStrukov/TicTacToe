class player {
  makeX() {
    this.name = 'X';
    this.state = 1;
    this.winner = false;
    this.abilityMove = true;
    this.score = 0;
  }

  makeO() {
    this.name = 'O';
    this.state = -1;
    this.winner = false;
    this.abilityMove = true;
    this.score = 0;
  }

  getName() {
    return this.name;
  }

  addScore() {
    this.score++;
  }

  getScore() {
    return this.score;
  }

  getState() {
    return this.state;
  }

  getAbilityMove() {
    return this.abilityMove;
  }

  setAbilityMove(move) {
    this.abilityMove = move;
  }

  getWin() {
    return this.winner;
  }

  setWin(win) {
    this.winner = win;
  }
}
