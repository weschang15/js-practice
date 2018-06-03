const Letter = require("./Letter");

const Word = function (word) {
  this.letters = word
    .trim()
    .split("")
    .map(letter => new Letter(letter));
  this.guessedLetter = [];
  this.word = word;
};

Word.prototype.guess = function (char) {
  this.letters.forEach(letter => {
    letter.checkLetter(char);
  });

  return this.getResult();
};

Word.prototype.getResult = function () {
  console.log(this.letters);
  return this.letters.map(letter => {
    return letter.getCharacter();
  }).join("");
};

module.exports = Word;