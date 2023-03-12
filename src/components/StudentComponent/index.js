import {useState} from 'react'
import Header from '../Header'
import './index.css'

const StudentComponent = () => {
  const [username, setUsername] = useState('')
  const [questionList, setQuestionList] = useState([])
  const [answerList, setAnswerList] = useState([])
  const [answer, setAnswer] = useState('')
  const [buttonText, setButtonText] = useState('Next')
  const [index, setIndex] = useState(0)
  const [submittedText, setSubmittedText] = useState('')

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }
  const onClickStart = () => {
    const data = localStorage.getItem('questionList')
    const questions = JSON.parse(data)
    setQuestionList(questions)
  }

  const onCLickNext = () => {
    setAnswerList(preState => [...preState, answer])
    console.log(questionList)
    if (index < questionList.length - 1) {
      const oneQuestion = questionList[index]
      questionList[index].studentAnswer = answer
      console.log(questionList)
      setIndex(preState => preState + 1)
    } else {
      setButtonText('Submit')
      questionList[index].studentAnswer = answer
      setIndex(preState => preState)
    }

    if (buttonText === 'Submit') {
      const ansDetails = {
        name: username,
        answers: answerList,
      }
      const answerDetails = JSON.stringify(ansDetails)
      localStorage.setItem('answersList', answerDetails)
      setQuestionList('')
      setSubmittedText('You Completed The Test')
      localStorage.setItem('questionList', JSON.stringify(questionList))
    }
    console.log(answerList)
  }

  const onChangeAnswer = event => {
    setAnswer(event.target.value)
  }

  const displayQuestions = () => {
    const questionItem = questionList[index].question

    return (
      <div>
        <h1>{`${index + 1}) ${questionItem}? `}</h1>
        <input
          type="number"
          className="input"
          onChange={onChangeAnswer}
          placeholder="Enter Your Answer"
        />
        <br />
        <button type="button" className="button" onClick={onCLickNext}>
          {buttonText}
        </button>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <div className="student-container">
        <div>
          <label className="input-labels" htmlFor="student">
            Name :
          </label>
          <input
            type="text"
            className="student-input"
            htmlFor="student"
            onChange={onChangeUsername}
            value={username}
          />
        </div>
        <button className="button" type="button" onClick={onClickStart}>
          Start Test
        </button>
        {questionList.length !== 0 && <div>{displayQuestions()}</div>}
        {submittedText.length !== 0 && (
          <h1 className="texts">{submittedText}</h1>
        )}
      </div>
    </div>
  )
}

export default StudentComponent
