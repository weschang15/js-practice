const Letter = function (char) {
  this.char = char;
  this.correct = false;
};

Letter.prototype.getCharacter = function () {
  if (this.correct) {
    return this.char;
  }

  if (this.char === ' ') {
    return ' ';
  }

  if (!this.correct) {
    return '*';
  }

  return this.char;
};

Letter.prototype.checkLetter = function (letter) {
  this.correct = this.char.toLowerCase() === letter.toLowerCase();
  return this.correct;
};

module.exports = Letter;