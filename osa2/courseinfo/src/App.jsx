const Header = ({course}) => {
  return <h1>{course}</h1>
}

const Content = ({parts}) => {
  return parts.map(part => <div key = {part.id}>{part.name} {part.exercises}</div>)
}

const Sum = ({parts}) => {
  const total = parts.reduce((acc, part) => acc + part.exercises, 0);
  return <b>total of {total} exercises</b>
}

const Course = ({course}) => {
  return <>
    <h1>{course.name}</h1>
    <Content parts = {course.parts}></Content>
    <Sum parts={course.parts}></Sum>
  </>
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return <div>
    {courses.map(course => (
      <Course key = {course.id} course={course}></Course>
    ))}
  </div>
}

export default App