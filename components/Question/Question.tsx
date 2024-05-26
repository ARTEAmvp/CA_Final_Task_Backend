import React from "react";
import styles from "./Question.module.css";
import Link from "next/link";

type QuestionProps = {
  id: string;
  user_id: string;
  question_text: string;
  question_title: string;
  date: string;
  answers: number;
};

const Question = ({ id, user_id, question_title, date, answers }: QuestionProps) => {
  const dateObj = new Date(date);
  const formattedDate = !isNaN(dateObj.getTime()) ? dateObj.toLocaleDateString() : "Invalid Date";

  return (
    <Link href={`/question/${id}`} className={styles.wrapper} key={id}>
      <div className={styles.infoWrapper}>
        <h2 className={styles.h2}>Question: {question_title}</h2>
        <h2 className={styles.h2}>Number of answers: {answers}</h2>
        <h4 className={styles.h4}>Question created on: {formattedDate}</h4>
        <h5 className={styles.h5}>Asked by user: {user_id}</h5>
      </div>
    </Link>
  );
};

export default Question;