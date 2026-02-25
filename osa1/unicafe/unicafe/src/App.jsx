import { useState } from 'react'

const Header=({head}) => {
  return <h1>{head}</h1>
}

const StatisticLine = ({ text, value, end }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value} {end}</td>
    </tr>
  );
};

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
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value = {all}></StatisticLine>
        <StatisticLine text="average" value = {average}></StatisticLine>
        <StatisticLine text="positive" value = {positive} end='%'></StatisticLine>
      </tbody>
    </table>
  </>
  }
}

const Button = ({ state, onClick }) => {
  return <button onClick={onClick}>{state}</button>
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