import { QuestionType } from '../../types/question'
import React from "react";
import Question from '../Question/Question';
import styles from "./QuestionWrapper.module.css";

type QuestionsWrapperProps = {
  questions: QuestionType[];
};

const QuestionsWrapper = ({ questions }: QuestionsWrapperProps) => {
  return (
    <div className={styles.cardsWrapper}>
      {questions.map((question) => (
        <Question
          id={question.id}
          key={question.id}
          question_text={question.question_text}
          user_id={question.user_id}
          date={question.date}
        />
      ))}
    </div>
  );
};

export default QuestionsWrapper;