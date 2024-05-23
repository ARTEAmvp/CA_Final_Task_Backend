import React from "react";
import styles from "./Question.module.css";
import Link from "next/link";

type QuestionProps = {
  id: string;
  user_id: string;
  question_text: string;
  date: string;
};

const Question = ({ id, user_id, question_text, date }: QuestionProps) => {
  const dateObj = new Date(date);
  const formattedDate = !isNaN(dateObj.getTime()) ? dateObj.toLocaleDateString() : "Invalid Date";

  return (
    <Link href={`/`} className={styles.wrapper} key={id}>
      <div className={styles.infoWrapper}>
        <h2>{question_text}</h2>
        <h3>{user_id}</h3>
        <h4>{formattedDate}</h4>
      </div>
    </Link>
  );
};

export default Question;