import { useState } from 'react'

const Header=({head}) => {
  return <h1>{head}</h1>
}

const Display=({text, number, end}) =>{
  return <div>{text} {number} {end}</div>
}

const Button = ({ state, onClick }) => {
  return <button onClick={() => onClick(state)}>{state}</button>
}

function App() {
  const [reviews, setReviews] = useState({
    good : 0,
    neutral : 0,
    bad : 0,
  })
  function handleReviews(state){
    setReviews(prev => ({
    ...prev,
    [state]: prev[state] + 1
    }));
  }

  const all = reviews.good + reviews.neutral + reviews.bad;
  const average = !all ? 0 : (reviews.good - reviews.bad) / all;
  const positive = !all ? 0 : 100 * reviews.good / all;

  return (
    <>
      <Header head = 'give feedback'></Header>
      <Button state="good" onClick={handleReviews} />
      <Button state="neutral" onClick={handleReviews} />
      <Button state="bad" onClick={handleReviews} />
      <Header head = 'statistics'></Header>
      <Display text="good" number={reviews.good} />
      <Display text="neutral" number={reviews.neutral} />
      <Display text="bad" number={reviews.bad} />
      <Display text="all" number={all} />
      <Display text="average" number={average} />
      <Display text="positive" number={positive} end="%"/>
    </>
  )
}

export default App