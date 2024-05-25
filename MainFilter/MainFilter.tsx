import React from 'react'
import styles from './MainFilter.module.css'
import Question from '../components/Question/Question'
import { useState } from 'react';

type QuestionProps = {
    id: string;
    user_id: string;
    question_text: string;
    question_title: string;
    date: string;
    answers: number;
  };
  
  type QuestionListProps = {
    questions: QuestionProps[];
  };

const MainFilter = ({ questions }: QuestionListProps) => {

    const [filter, setFilter] = useState<"all" | "answered" | "unanswered">("all");

    const filteredQuestions = questions.filter((question) => {
      if (filter === "answered") return question.answers > 0;
      if (filter === "unanswered") return question.answers === 0;
      return true;
    });


  return (
        <div>
            <div className={styles.filterButtons}>
                <button onClick={() => setFilter("all")}>All</button>
                <button onClick={() => setFilter("answered")}>Answered</button>
                <button onClick={() => setFilter("unanswered")}>Unanswered</button>
            </div>

            <div className={styles.questionList}>
                {filteredQuestions.map((question) => (
                <Question key={question.id} {...question} />
                ))}
            </div>
        </div>
  )
}

export default MainFilter