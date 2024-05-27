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
import Answer from "../AnswerCount/AnswerCount";

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

  const newAnswer = (newAnswer: AnswerType) => {
    setAnswers([...answers, newAnswer]);
  };

  const likeDislikeUpdate = (updatedAnswer: AnswerType) => {
    setAnswers(answers.map((answer) =>
      answer.id === updatedAnswer.id ? updatedAnswer : answer
    ));
  };

  const deleteAnswer = async (answerId: string) => {
    try {
      const headers = {
        authorization: cookies.get("jwt_token"),
      };

      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_WEBSITE_URL}/answer/${answerId}`,
        { headers }
      );

      if (response.status === 200) {
        setAnswers(answers.filter((answer) => answer.id !== answerId));
      }
    } catch (err) {
      console.log(err);
    }
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
        <div className={styles.questionSpec}>
          <div className={styles.questionCreationDate}>
             <p>Asked on</p> <h3>{new Date(question.date).toLocaleDateString()}</h3>
          </div>
          <Button
            className={styles.deleteButton}
            type="WARNING"
            isLoading={false}
            title="Delete the question"
            onClick={() => setShowWarning(true)}
          />
        </div>
        <p>{question.question_text}</p>

      </div>

      {isShowWarning && (
        <Modal
          message="Do you really want to delete this question?"
          onConfirm={deleteItem}
          onCancel={() => setShowWarning(false)}
        />
      )}
      <div className={styles.answers}>
        {answers.length === 1 ? (
          <h2>Answer</h2>
        ) : (
          <h2>{answers.length} Answers</h2>
        )}
      </div>
      <div className={styles.answers}>
        {answers.length > 0 ? (
          answers.map((answer) => (
            <div key={answer.id} className={styles.answer}>
            <Answer
              key={answer.id}
              answer={answer}
              onLikeDislikeUpdate={likeDislikeUpdate}
              onDelete={() => deleteAnswer(answer.id)}
            />
              <>
              <Button
                isLoading={false}
                title="Delete the answer"
                onClick={() => deleteAnswer(answer.id)}
              />
              </>
            </div>
          ))
        ) : (
          <p>No answers yet.</p>
        )}

      </div>
      <div className={styles.answerField}>
        <h1>Your Answer</h1>
        <AnswerForm questionId={question.id} onAnswerPosted={newAnswer} />
      </div>
    </main>
  );
};

export default QuestionCardWrapper;