import React from 'react';
import axios from 'axios';
import cookies from 'js-cookie';
import Button from '../Button/Button';
import styles from './AnswerCount.module.css';
import { AnswerType } from '../../types/answer';

type AnswerProps = {
  answer: AnswerType;
  onLikeDislikeUpdate: (updatedAnswer: AnswerType) => void;
  onDelete: () => void;
};

const Answer = ({ answer, onLikeDislikeUpdate }: AnswerProps) => {
  const handleToggleLikeDislike = async (action: 'like' | 'dislike') => {
    try {
      const headers = {
        authorization: cookies.get('jwt_token') || '',
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_WEBSITE_URL}/answer/${answer.id}/toggle-like-dislike`,
        { action },
        { headers }
      );

      if (response.status === 200) {
        onLikeDislikeUpdate(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.answer}>
      <div>
        <p>{answer.answer_text}</p>
        <small>{new Date(answer.date).toLocaleDateString()}</small>
      </div>
      <div className={styles.actions}>
        <div>
          <span>Likes: {answer.likes.length}</span>
          <span>Dislikes: {answer.dislikes.length}</span>
        </div>
        <Button
          isLoading={false}
          title="Like"
          onClick={() => handleToggleLikeDislike('like')}
        />
        <Button
          isLoading={false}
          title="Dislike"
          onClick={() => handleToggleLikeDislike('dislike')}
        />
      </div>
    </div>
  );
};

export default Answer;