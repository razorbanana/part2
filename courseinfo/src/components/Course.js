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

  export default Course