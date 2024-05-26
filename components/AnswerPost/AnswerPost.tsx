// AnswerForm.tsx
import React, { useState } from "react";
import axios from "axios";
import cookies from "js-cookie";
import Button from "../Button/Button";
import styles from "./AnswerPost.module.css";
import { AnswerType } from "../../types/answer";

type AnswerFormProps = {
  questionId: string;
  onAnswerPosted: (newAnswer: AnswerType) => void;
};

const AnswerForm = ({ questionId, onAnswerPosted }: AnswerFormProps) => {
  const [newAnswerText, setNewAnswerText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePostAnswer = async () => {
    if (!newAnswerText) return;

    setIsSubmitting(true);

    try {
      const headers = {
        authorization: cookies.get("jwt_token"),
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_WEBSITE_URL}/question/${questionId}/answer`,
        { answer_text: newAnswerText },
        { headers }
      );

      onAnswerPosted(response.data);
      setNewAnswerText("");
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.newAnswer}>
      <textarea
        value={newAnswerText}
        onChange={(e) => setNewAnswerText(e.target.value)}
        placeholder="Write your answer..."
      />
      <Button
        title="Post Answer"
        onClick={handlePostAnswer}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default AnswerForm;