import React from "react"

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Part = ({part}) => (
    <p>
      {part.name} {part.exercises}
    </p>
)

const Content = ({parts}) => (
<>
  {parts.map(part => 
    <Part key={part.id} part={part} />
  )}
</>
)

const Total = ({parts}) => (
<p>Number of exercises {
  parts.reduce((sum, part) => sum + part.exercises, 0)
  }</p>
)

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }

  return <Course course={course} />
}

export default App
