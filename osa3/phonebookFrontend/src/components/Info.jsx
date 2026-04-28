const Info = ({text, color}) => {
  if (text === null) {
    return null
  }

  return (
    <div style ={{
      color: color,
      background: 'lightgrey',
      fontSize: '20px',
      border: '1px solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px'
    }}>
      {text}
    </div>
  )
}

export default Info