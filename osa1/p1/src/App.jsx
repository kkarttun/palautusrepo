const Header = ({course}) => {
  return <h1>{course}</h1>
}
const Content = ({Content}) => {
  return<>
      <p>
        {Content[0].part} {Content[0].exercises}
      </p>
      <p>
        {Content[1].part} {Content[1].exercises}
      </p>
      <p>
        {Content[2].part} {Content[2].exercises}
      </p>
  </>
}
const Total = ({amounts}) => {
  const sum = amounts[0] + amounts[1] + amounts[2]
  return <p>Number of exercises {sum}</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const data = [{part: part1, exercises: exercises1},{part: part2, exercises: exercises2}, {part: part3, exercises: exercises3}]

  return (
    <div>
      <Header course={course} ></Header>
      <Content Content={data}></Content>
      {<Total amounts={[exercises1, exercises2, exercises3]}></Total>}
    </div>
  )
}

export default App