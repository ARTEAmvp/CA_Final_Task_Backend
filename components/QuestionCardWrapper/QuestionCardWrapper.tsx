import React, { useState, useEffect } from "react";
import { QuestionType } from "../../types/question";
import { AnswerType } from "../../types/answer";
import styles from "./QuestionCardWrapper.module.css";
import Button from "../Button/Button";
import axios from "axios";
import cookies from "js-cookie";
import { useRouter } from "next/router";
import Modal from "../Modal/Modal";
import AnswerForm from "../AnswerPost/AnswerPost";

type QuestionCardWrapperProps = {
  question: QuestionType;
};

const QuestionCardWrapper = ({ question }: QuestionCardWrapperProps) => {
  const router = useRouter();
  const [isShowWarning, setShowWarning] = useState(false);
  const [answers, setAnswers] = useState<AnswerType[]>([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const headers = {
          authorization: cookies.get("jwt_token"),
        };

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_WEBSITE_URL}/question/${question.id}/answers`,
          { headers }
        );

        setAnswers(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAnswers();
  }, [question.id]);

  const handleNewAnswer = (newAnswer: AnswerType) => {
    setAnswers([...answers, newAnswer]);
  };

  const deleteItem = async () => {
    try {
      const headers = {
        authorization: cookies.get("jwt_token"),
      };

      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_WEBSITE_URL}/question/${router.query.id}`,
        {
          headers,
        }
      );

      if (response.status === 200) {
        router.push("/");
      }

      console.log("response", response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.info}>
        <h1>{question.question_title}</h1>
        <p>{question.question_text}</p>
        <h3>{new Date(question.date).toLocaleDateString()}</h3>
        <h3>{question.user_id}</h3>

        <Button
          className={styles.deleteButton}
          type="WARNING"
          isLoading={false}
          title="Delete the question"
          onClick={() => setShowWarning(true)}
        />
      </div>

      {isShowWarning && (
        <Modal
          message="Do you really want to delete this question?"
          onConfirm={deleteItem}
          onCancel={() => setShowWarning(false)}
        />
      )}

      <div className={styles.answers}>
        <h2>Answers</h2>
        {answers.length > 0 ? (
          answers.map((answer) => (
            <div key={answer.id} className={styles.answer}>
              <p>{answer.answer_text}</p>
              <small>{new Date(answer.date).toLocaleDateString()}</small>
            </div>
          ))
        ) : (
          <p>No answers yet.</p>
        )}

      </div>
      <AnswerForm questionId={question.id} onAnswerPosted={handleNewAnswer} />
    </main>
  );
};

export default QuestionCardWrapper;