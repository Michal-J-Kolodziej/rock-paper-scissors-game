class Player {
    constructor() {
        this.choice = '';
    }

}

class User extends Player {
    constructor() {
        super();
        this.wins = 0;
        this.losses = 0;
        this.draws = 0;
        this.games = 0;


        this.winsDis = document.querySelector('div.wins span');
        this.lossesDis = document.querySelector('div.losses span');
        this.drawsDis = document.querySelector('div.draws span');
        this.gamesDis = document.querySelector('div.games span');

        this.updateStandingsDisplay = () => {
            this.winsDis.textContent = this.wins;
            this.lossesDis.textContent = this.losses;
            this.drawsDis.textContent = this.draws;
            this.gamesDis.textContent = this.games;
        }
    }

    pickChoice(choice) {
        this.choice = choice;
    }

    reset() {
        this.choice = '';
    }

    updateStandings(result) {
        if (result === 'win') this.wins++;
        else if (result === 'loss') this.losses++;
        else if (result === 'draw') this.draws++;

        this.games++;
        this.updateStandingsDisplay();
    }

}

class Computer extends Player {
    constructor() {
        super();
        this.choiceBoxes = [...document.querySelectorAll('div.ai-choice div.ai-choiceBox')];
    }

    pickChoice() {
        const randNumber = Math.floor(Math.random() * 3);
        if (randNumber === 0) {
            this.choice = 'rock';
        } else if (randNumber === 1) {
            this.choice = 'paper';
        } else if (randNumber === 2) {
            this.choice = 'scissors';
        }

        this.choiceBoxes.forEach(box => {
            if (box.dataset.choice === this.choice) {
                box.classList.add('active');
            }
        });
    }

    reset() {
        this.choice = '';
        this.choiceBoxes.forEach(box => {
            box.classList.remove('active');
        });
    }
}

class Game {
    constructor(player, computer) {
        this.player = player;
        this.computer = computer;
        this.playerChoice = '';
        this.computerChoice = '';
        this.result = '';
        this.isFinished = true;
        this.resetTime = 1500;
        this.display = document.querySelector('div.heading h1');
        this.choiceBoxes = [...document.querySelectorAll('div.choiceContainer div.choiceBox')];

        this.reset = () => {
            document.querySelector('div.heading h1').textContent = 'Pick your choice:';
            this.playerChoice = '';
            this.computerChoice = '';
            this.isFinished = true;
            this.player.reset();
            this.computer.reset();
            this.choiceBoxes.forEach(box => {
                box.classList.remove('active');
            });
        }

        this.getIsFinished = () => {
            return this.isFinished;
        }
    }

    addEventToChoiceBoxes() {

        this.choiceBoxes.forEach((box, i) => {
            box.addEventListener('click', () => {
                this.choiceBoxes.forEach((box) => {
                    box.classList.remove('active');
                });
                this.choiceBoxes[i].classList.add('active');
            });
        });
    }

    updateChoices(pChoice, cChoice) {
        this.playerChoice = pChoice;
        this.computerChoice = cChoice;
    }

    checkWhoWon() {
        if ((this.playerChoice === 'rock' && this.computerChoice === 'scissors') || (this.playerChoice === 'paper' && this.computerChoice === 'rock') || (this.playerChoice === 'scissors' && this.computerChoice === 'paper')) {
            return 'win';
        } else if (this.playerChoice === this.computerChoice) {
            return 'draw';
        } else {
            return 'loss';
        }
    }

    updateDisplay(result) {
        if (result === 'win') {
            this.display.textContent = 'You won!';
        } else if (result === 'loss') {
            this.display.textContent = 'You lost!';
        } else if (result === 'draw') {
            this.display.textContent = 'Draw!';
        }
    }

    updateResults(result) {
        this.updateDisplay(result);
        this.player.updateStandings(result);

        setTimeout(this.reset, this.resetTime)
    }

    startGame() {
        if (!game.isFinished) return;
        this.isFinished = false;
        try {
            this.playerChoice = document.querySelector('div.choiceBox.active').dataset.choice;
        } catch {
            window.alert('Pick your choice!');
            this.isFinished = true;
            return;
        }

        this.player.pickChoice(this.playerChoice);
        this.computer.pickChoice();
        this.updateChoices(player.choice, computer.choice);
        let result = this.checkWhoWon();
        this.updateResults(result);

    }
}

// End of classes

const player = new User();
const computer = new Computer();
const game = new Game(player, computer);

const playButton = document.querySelector('div.play button.start');
playButton.addEventListener('click', () => {
    game.startGame();
});
game.addEventToChoiceBoxes();