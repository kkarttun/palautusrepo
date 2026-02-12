const Header = ({course}) => {
  return <h1>{course}</h1>
}
const Part = ({part}) => {
  return <p>{part.name} {part.exercises}</p>
}
const Content = ({Content}) => {
  return<>
      <Part part = {Content[0]}></Part>
      <Part part = {Content[1]}></Part>
      <Part part = {Content[2]}></Part>
  </>
}
const Total = ({amounts}) => {
  const sum = amounts[0] + amounts[1] + amounts[2]
  return <p>Number of exercises {sum}</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} ></Header>
      <Content Content={parts}></Content>
      {<Total amounts={[parts[0].exercises, parts[1].exercises, parts[2].exercises]}></Total>}
    </div>
  )
}

export default App