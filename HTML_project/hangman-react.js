"use strict";

let images = [
  { name: 'hook', image: 'assets/hook.jpg'},
  { name: 'head', image: 'assets/head.jpg'},
  { name: 'body', image: 'assets/body.jpg'},
  { name: 'left arm', image: 'assets/larm.jpg'},
  { name: 'right arm', image: 'assets/rarm.jpg'},
  { name: 'left leg', image: 'assets/lleg.jpg'},
  { name: 'right leg', image: 'assets/rleg.jpg'}
];
let counter = 0;
let stickFigure = document.getElementsByClassName('hangman');
let wrong = [];

class StartGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: "",
      underScores: [],
      winMessage: "",
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  newActivity() {
      fetch("https://cors-anywhere.herokuapp.com/https://api.datamuse.com/words?ml=car")
      .then(res => res.json())
      .then(
          (result) => {
              this.setState({
                  activity: result[Math.floor(Math.random() * result.length)].word,
              });
              console.log(this.state.activity);
              this.setState({underScores: []});
              for (var i = 0; i < this.state.activity.length; i++) {
                this.setState(prevState => ({
                  underScores: [...prevState.underScores, '_ ']
                }))
              }

              counter = 0;
              stickFigure[counter].innerHTML = '<img src="'
                + images[counter].image + '">';
              wrong = [];

              document.getElementById("hideButton").style.visibility="visible";
              document.getElementById("hideBank").style.visibility="visible";
          }
      )
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(event) {
    let letter = String.fromCharCode(event.keyCode);
    let letterGuessed = letter.toLowerCase();

    if (this.state.activity.indexOf(letterGuessed) > -1) {
      for (var i = 0; i < this.state.activity.length; i++) {
        if (letterGuessed === this.state.activity[i]) {
          let currentState = [...this.state.underScores];
          currentState[i] = letterGuessed;
          this.setState({underScores: currentState});

          if (this.state.underScores.join('') === this.state.activity) {
            this.setState({winMessage: "Congratulations, you won!"});
          }
        }
      }
    }

    else {
      counter++;
      stickFigure[0].innerHTML = '<img src="' + images[counter].image + '">';

      let wrongGuesses = document.getElementsByClassName("guessed-letters");
      wrong.push(letter);
      wrongGuesses[0].innerHTML = wrong;
      if (counter === 6) {
        this.setState({winMessage: "Sorry, you lost"})
        event.stopPropagation();
      }
    }
  }

  guessWord() {
    var msg = prompt("Please guess the word");
    if (msg === this.state.activity && msg != null) {
      alert('Congratulations!');
    }
    else {
      alert('You guessed incorrectly :( - Game Over)');
    }
  }

  render() {
    return (
    <div>
      <div className="header-content">
        <h1>Hang Man</h1>
        <button className="button button2"
        onClick={() => this.newActivity()}>Start Game</button>
        <p>{this.state.winMessage}</p>
      </div>

      <div className="main-content">
        <div className="hangman-content" id="hideBank">
          <h3>Wrong Guesses Letter Bank</h3>
          <div className="wrong-guesses">
            <h3 class="guessed-letters"></h3>
          </div>
        </div>

        <div className="hangman-content">
          <h3 className="letterScores">{this.state.underScores}</h3>
          <button className="button button2" id="hideButton"
          onClick={() => this.guessWord()}>Guess Word</button>
        </div>

        <div className="hangman-content">
          <div className="hangman"></div>
        </div>
      </div>
    </div>
    );
  }
}

ReactDOM.render( <StartGame / >, document.getElementById("root"));
