import './index.css'

const EachQuestion = props => {
  const {questionDetails, deleteItem} = props
  const {question, id} = questionDetails

  const onDeleteItem = () => {
    deleteItem(id)
  }
  return (
    <li className="question-item">
      <h1>{question}</h1>
      <button className="delete-button" type="button" onClick={onDeleteItem}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
      {console.log(question)}
    </li>
  )
}

export default EachQuestion
