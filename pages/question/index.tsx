import React from 'react'
import PageTemplate from '../../components/PageTemplate/PageTemplate'
import { useRouter } from 'next/router';
import { useState } from 'react';
import cookies from 'js-cookie';
import axios from 'axios';
import styles from './QuestionPost.module.css'
import Button from '../../components/Button/Button';

const QuestionPost = () => {

    const router = useRouter();

    const [questionTitle, setQuestionTitle] = useState("");
    const [questionText, setQuestionText] = useState("");

    const addQuestion = async () => {
        try {
          const newQuestion = {
            question_title: questionTitle,
            question_text: questionText
          };
    
          const headers = {
            authorization: cookies.get("jwt_token"),
          };
    
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_WEBSITE_URL}/question`,
            newQuestion,
            {
              headers,
            }
          );
    
          console.log(response);
    
          if (response.status === 200) {
            router.push("/")
          } else {
            console.log(`Unexpected response status: ${response.status}`);
            router.push('/login')
          }
        } catch (err: any) {
            console.log("Error occurred during question posting:", err);
            if (err.response && err.response.status === 401) {
              router.push("/login");
            } else {
              console.error("Unexpected error", err);
            }
          }
        }

      const isAllFieldsInserted =
      questionTitle && questionText;


  return (
    <PageTemplate>
        <div className={styles.test}>
        <div className={styles.formWrapper}>

            <input
            placeholder="Question Title"
            value={questionTitle}
            onChange={(e) => setQuestionTitle(e.target.value)}
            />

            <input
            placeholder="Question Text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            />

            <Button
            className={`${
                isAllFieldsInserted ? styles.validBtn : styles.invalidBtn
            }`}
            isLoading={false}
            title="Post the question"
            onClick={addQuestion}
            />
        </div>
        </div>
    </PageTemplate>
  )
}

export default QuestionPost