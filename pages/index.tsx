import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageTemplate from '@/components/PageTemplate/PageTemplate';
import QuestionsWrapper from '@/components/QuestionWrapper/QuestionWrapper';
import { QuestionType } from '../types/question';
import MainFilter from '../MainFilter/MainFilter';

const HomePage = () => {

  const [questions, setQuestions] = useState<QuestionType[]>([]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/questions`);
      const questionsWithAnswers = await Promise.all(response.data.map(async (question: any) => {
        const answersResponse = await axios.get(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/question/${question.id}/answers`);
        return { ...question, answers: answersResponse.data.length };
      }));
      setQuestions(questionsWithAnswers);
    } catch(err) {
      console.log('could not fetch');
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div>
      <PageTemplate>
        {/* <MainFilter questions={questions}/> */}
        {questions && <QuestionsWrapper questions={questions}/>}
      </PageTemplate>
    </div>
  );
};

export default HomePage;