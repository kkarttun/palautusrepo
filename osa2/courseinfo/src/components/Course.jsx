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


export default Course