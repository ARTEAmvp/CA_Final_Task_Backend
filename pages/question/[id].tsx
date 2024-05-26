import React, { useEffect, useState } from "react";
import axios from "axios";
import cookies from "js-cookie";
import { useRouter } from "next/router";
import PageTemplate from "../../components/PageTemplate/PageTemplate";
import QuestionCardWrapper from "../../components/QuestionCardWrapper/QuestionCardWrapper";

const Question = () => {
  
  const [question, setQuestion] = useState();
  const router = useRouter();

  const fetchQuestion = async () => {
    try {
      const headers = {
        authorization: cookies.get("jwt_token"),
      };

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_WEBSITE_URL}/question/${router.query.id}`,
        {
          headers,
        }
      );

      setQuestion(response.data.question);
    } catch (err) {
      // @ts-expect-error this is correct way to catch error
      if (err.response.status === 401) {
        router.push("/login");
      }
    }
  };

  useEffect(() => {
    router.query.id && fetchQuestion();
  }, [router.query.id]);

  return <PageTemplate>
    {question && <QuestionCardWrapper question={question} />}
    </PageTemplate>;
};

export default Question;