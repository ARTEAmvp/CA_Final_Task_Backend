import React from 'react'
import styles from './Register.module.css'
import { useRouter } from 'next/router'
import Button from '../../components/Button/Button'
import axios from 'axios'
import { useState } from 'react'
import PageTemplate from '../../components/PageTemplate/PageTemplate'


const Register = () => {

  const router = useRouter()

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

    const createAccount = async() => {

      setLoading(true)

      const registerBody = {
        email: email,
        name: name,
        password: password,
      };

      if (!email || !password || !name) {
        setError(true);
        setLoading(false)
        return;
      }

      setError(false);

      try{
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_WEBSITE_URL}/register`,
          registerBody
        );

        if(response.status === 200) {
          router.push('/login')
        }

      }catch(err) {
        setLoading(false)
        console.log({err: 'error happened'})
      }
    }


  return (
    <PageTemplate>
    <div className={styles.form}>
        <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email..."
        />

        <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="name..."
        />

        <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password..."
        />

      {isError && (
        <div className={styles.error}>Please fill all the inputs</div>
      )}

        <Button isLoading={isLoading} onClick={createAccount} title="Create an account" />
    </div>
    </PageTemplate>
  )
}

export default Register