import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cookies from 'js-cookie';
import { useRouter } from 'next/router';
import PageTemplate from '@/components/PageTemplate/PageTemplate';
import QuestionsWrapper from '@/components/QuestionWrapper/QuestionWrapper';

const HomePage = () => {

  const router = useRouter();

  const [question, setQuestion] = useState([]);

  const fetchQuestions = async () => {
    try {

      const response = await axios.get(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/questions`);

      console.log(response);

      setQuestion(response.data)

      console.log(question)

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
          {question && <QuestionsWrapper questions={question}/>}
      </PageTemplate>
    </div>
  );
};

export default HomePage;
