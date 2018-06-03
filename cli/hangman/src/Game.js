const readline = require('readline');
const EventEmitter = require('events');
const words = require('../data/words');
const Word = require('./Word');

const Game = function (word) {
  this.guessesRemaining = 10;
  this.guessedLetters = [];
  this.currentWord = null;

  this._interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ',
  });
};

Game.prototype.init = function () {
  if (this.guessedLetters.length > 0) {
    this.guessedLetters = [];
  }

  this._interface.question(`Are you ready to play?`, (response) => {
    this.handleResponse(response);
  });

  this._interface.on('close', () => {
    this.handleQuit();
  });
};

Game.prototype.handleResponse = function (response) {
  const answer = typeof response === "string" && response.trim().length > 0 ? response.trim() : false;
  const regex = new RegExp('no|stop|exit|quit', 'gi');
  if (!answer || regex.test(answer)) {
    this.handleQuit();
  }

  console.log(`Awesome. Here we go.`);
  console.log(`---------------------`);
  const randomInt = Math.floor(Math.random() * words.length);
  this.currentWord = new Word(words[randomInt]);
  console.log(`Choose a letter...`);

  this._interface.prompt();
  this._interface.on('line', line => {
    this.handleGuess(line);
  });
};

Game.prototype.handleGuess = function (str) {
  console.log(this.currentWord.word);
  console.log(this.currentWord.guess(str));
  this._interface.prompt();
};

Game.prototype.handleQuit = function () {
  console.log(`You sore loser!`);
  process.exit(0);
}

module.exports = Game;