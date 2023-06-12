import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import QuizCard from '../pages/QuizCard'
import { NameContext } from '../context/NameContext';
import '../styles/Quiz.css'
import Loading from "../components/Loading"

export default function Quiz() {

  const { nickName } = useContext(NameContext)
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true);
  const [listen, setListen] = useState([]);
  useEffect(() => {

    axios.get("https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple")
      .then(response => {
        setList(response.data.results) 
          setLoading(false);
      })
  }, [])




  // listen array correct ,incorrect array = option 
  useEffect(() => {
    if (list.length > 0) {
      const modifiedListen = list.map(item => {
        const options = [item.correct_answer, ...item.incorrect_answers];
        const shuffledOptions = options.sort(() => Math.random() - 0.5);
        return {
          ...item,
          options: shuffledOptions

        };
      });
     

      setListen(modifiedListen);
    }
  }, [list]);


  return (
    <div className='quiz-container'>
      {loading ?( <Loading />):(<>
      <h1>Welcome to the Quiz, {nickName} !</h1>
      <div className="quiz">
        <QuizCard listen={listen} />
      </div>
      </>)}
    </div>
  )

}
