import { QuestionType } from '../../types/question';
import React from 'react';
import Question from '../Question/Question';
import styles from './QuestionWrapper.module.css';
import { useState } from 'react';

type QuestionsWrapperProps = {
  questions: QuestionType[];
};

const QuestionsWrapper = ({ questions }: QuestionsWrapperProps) => {
  const [filter, setFilter] = useState<'all' | 'answered' | 'unanswered'>('all');

  const filteredQuestions = questions.filter((question) => {
    if (filter === 'answered') return question.answers > 0;
    if (filter === 'unanswered') return question.answers === 0;
    return true;
  });

  return (
    <>
      <div className={styles.filterButtonsWrapper}>
        <button className={styles.filterButtons} onClick={() => setFilter('all')}>All</button>
        <button className={styles.filterButtons} onClick={() => setFilter('answered')}>Answered</button>
        <button className={styles.filterButtons} onClick={() => setFilter('unanswered')}>Unanswered</button>
      </div>

      <div className={styles.cardsWrapper}>
        {filteredQuestions.map((question) => (
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
    </>
  );
};

export default QuestionsWrapper;