import { useState } from 'react'

const Header=({head}) => {
  return <h1>{head}</h1>
}

const Display=({text, number, end}) =>{
  return <div>{text} {number} {end}</div>
}

const Statistics=({bad, neutral, good}) =>{
  const all = good + neutral + bad;
  if (all == 0){
    return <>
    <Header head = 'statistics'></Header>
    <div>No feedback given</div>
    </>
  }else{
  const average = !all ? 0 : (good - bad) / all;
  const positive = !all ? 0 : 100 * good / all;
  return <>
    <Header head = 'statistics'></Header>
    <Display text="good" number={good} />
    <Display text="neutral" number={neutral} />
    <Display text="bad" number={bad} />
    <Display text="all" number = {all}></Display>
    <Display text="average" number = {average}></Display>
    <Display text="positive" number = {positive} end='%'></Display>
  </>
  }
}

const Button = ({ state, onClick }) => {
  return <button onClick={() => onClick(state)}>{state}</button>
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Header head = 'give feedback'></Header>
      <Button state="good" onClick={() => setGood(good + 1)} />
      <Button state="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button state="bad" onClick={() => setBad(bad + 1)} />
      <Statistics {...{bad, neutral, good}}/>
    </>
  )
}

export default App