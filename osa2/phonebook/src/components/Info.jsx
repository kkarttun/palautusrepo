const Info = ({text}) => {
  if (text === null) {
    return null
  }

  return (
    <div className = "error">
      {text}
    </div>
  )
}

export default Info