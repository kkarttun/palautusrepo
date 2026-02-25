import { useState } from 'react'

const Header=({head}) => {
  return <h1>{head}</h1>
}

const Display=({text, number}) =>{
  return <div>{text} {number}</div>
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
    </>
  )
}

export default App
