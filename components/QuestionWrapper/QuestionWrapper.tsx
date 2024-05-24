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
        <div key={question.id} className={styles.questionWrapper}>
          <Question
            id={question.id}
            question_text={question.question_text}
            question_title={question.question_title}
            user_id={question.user_id}
            date={question.date}
            answers={question.answers}
          />
        </div>
      ))}
    </div>
  );
};

export default QuestionsWrapper;
