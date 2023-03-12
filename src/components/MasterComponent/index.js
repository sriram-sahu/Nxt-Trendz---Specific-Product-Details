import {useState} from 'react'
import {v4 as uuid} from 'uuid'
import Header from '../Header'
import EachQuestion from '../EachQuestion'

import './index.css'

const MasterComponent = () => {
  const [firstNum, setFirstNum] = useState(0)
  const [secondNum, setSecondNum] = useState(0)
  const [operator, setOperator] = useState('+')
  const [questionsList, setQuestionsList] = useState([])
  const [answerList, setAnswerList] = useState([])
  const [isTaskCreated, setTask] = useState(false)

  const operators = [
    {id: 0, operator: '+', text: 'plus'},
    {id: 1, operator: '-', text: 'minus'},
    {id: 2, operator: '*', text: 'times'},
    {id: 3, operator: '/', text: 'divided_by'},
  ]
  const findAnswer = (a, op, b) => {
    switch (op) {
      case '+':
        return a + b
      case '-':
        return a - b
      case '*':
        return a * b
      case '/':
        return a / b
      default:
        return null
    }
  }

  const onChangeFirstNum = event => setFirstNum(Math.floor(event.target.value))
  const onClickFirstNum = () => setFirstNum('')
  const onChangeSecondNum = event =>
    setSecondNum(Math.floor(event.target.value))
  const onClickSecondNum = () => setSecondNum('')
  const onChangeOperator = event => setOperator(event.target.value)
  const createQuestions = () => {
    const result = findAnswer(firstNum, operator, secondNum)
    const myQuestion = {
      id: uuid(),
      question: `⚫ ${firstNum} ${operator} ${secondNum}? `,
      answer: result,
      studentAnswer: '',
    }

    setQuestionsList(prevState => [...prevState, myQuestion])
  }

  const onDeleteItem = id => {
    const filteredQuestionsArray = questionsList.filter(each => each.id !== id)
    setQuestionsList(filteredQuestionsArray)
  }

  const createTests = () => {
    const stringfiedData = JSON.stringify(questionsList)
    localStorage.setItem('questionList', stringfiedData)
    setTask(true)
  }

  const clearAll = () => {
    setQuestionsList([])
  }

  const questions = JSON.parse(localStorage.getItem('questionList'))
  console.log(questions)

  return (
    <>
      <Header />
      <div className="master-container">
        <div className="forms-container">
          <form>
            <h1 className="texts">Create your questions</h1>
            <input
              type="number"
              value={firstNum}
              onChange={onChangeFirstNum}
              placeholder="Enter First Number"
              onClick={onClickFirstNum}
            />
            <select
              className="input-value"
              value={operator}
              onChange={onChangeOperator}
            >
              {operators.map(eachItem => (
                <option>{eachItem.operator}</option>
              ))}
            </select>
            <input
              type="number"
              value={secondNum}
              onChange={onChangeSecondNum}
              onClick={onClickSecondNum}
              placeholder="Enter Second Number"
            />
            <div className="button-container">
              <button
                type="button"
                className="button"
                onClick={createQuestions}
              >
                Create Question
              </button>
              <button type="button" className="button" onClick={clearAll}>
                Clear Question
              </button>
            </div>
          </form>
        </div>
        <div className="Questions-container">
          {questionsList.length === 0 ? (
            <div className="no-tests">
              <h1 className="texts">No Current Tests</h1>
            </div>
          ) : (
            <div>
              <h1 className="texts">Questions</h1>
              <ul>
                {questionsList.map(eachItem => (
                  <EachQuestion
                    key={eachItem.id}
                    questionDetails={eachItem}
                    deleteItem={onDeleteItem}
                  />
                ))}
              </ul>
              {isTaskCreated && <h1 className="texts">Test Created</h1>}
              <button type="button" className="button" onClick={createTests}>
                Create Tests
              </button>
            </div>
          )}
        </div>
        <div>
          {questions !== null && (
            <div className="answer-container">
              <h1 className="texts">Students Answers</h1>
              <ul>
                {questions.map(eachItem => (
                  <li>
                    <h1 className="question">{`Question : ${eachItem.question.slice(
                      1,
                    )} `}</h1>
                    <p>{`Answer : ${eachItem.answer} `}</p>
                    {eachItem.studentAnswer === '' ? (
                      <p>Students Answer : Not Answered Yet</p>
                    ) : (
                      <p>{`Students Answer : ${eachItem.studentAnswer}`}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
export default MasterComponent
