import React from 'react';
import Die from './components/Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

function App() {

  const [dice, setDice] = React.useState(generateRandomDice());
  const [gameOver, setGameOver] = React.useState(false);
  const [rolls, setRolls] = React.useState(0);

  React.useEffect(() => {
    const value = dice[0].value;
    const isGameOver = dice.every(die => die.value === value && die.isHeld);
    
    if (isGameOver) {
      setGameOver(true);
    }
  }, [dice])

  const dieComponents = dice.map(die => {
    return(
      <Die 
        key={die.id}
        id={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDie={holdDie}
      />
    )
  })

  function generateRandomDice() {
    const randomDice = [];
    for (let i = 0; i < 10; i++) {
      randomDice.push(generateNewDie());
    }
    return randomDice;
  }

  function generateNewDie() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false
    }
  }

  function reset() {
    setDice(generateRandomDice());
    setGameOver(false);
    setRolls(0);
  }

  function rerollDie() {
    setRolls(prevRolls => prevRolls + 1);
    setDice(prevDice => {
      return(
        prevDice.map(die => {
          return die.isHeld ? die : generateNewDie()
        })
      )
    });
  }

  function holdDie(id) {
    setDice(prevDie => {
      return(
        prevDie.map(die => die.id === id ? 
          {...die, isHeld: !die.isHeld} : die
        )
      )
    })
  }

  return (
    <div className="App">
      <div className='prompt'>
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className='die-div'>
        {dieComponents}
      </div>
      {rolls > 0 && <div className='rolls-div'>Rolls: {rolls}</div>}
      <button onClick={gameOver ? reset : rerollDie}>{gameOver ? 'New Game' : 'Roll'}</button>
      {gameOver && <Confetti />}
    </div>
  );
}

export default App;
