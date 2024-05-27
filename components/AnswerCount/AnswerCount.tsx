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

  const likeCount = answer.likes.length;
  const dislikeCount = answer.dislikes.length;
  const totalCount = likeCount - dislikeCount;

  return (
    <div className={styles.answer}>
      <div className={styles.actionSelect}>
        <Button
          isLoading={false}
          title="👍"
          onClick={() => handleToggleLikeDislike('like')}
          className={`${styles.upVoteButton} ${styles.upVote}`}
        />
        <div className={styles.count}>
          {totalCount}
        </div>
        <Button
          isLoading={false}
          title="👎"
          onClick={() => handleToggleLikeDislike('dislike')}
          className={`${styles.downVoteButton} ${styles.downVote}`}
        />
      </div>
      <div className={styles.answerInfo}>
        <p>{answer.answer_text}</p>
        <small>Answered on: {new Date(answer.date).toLocaleDateString()}</small>
      </div>
    </div>
  );
};

export default Answer;