import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Link from '../src/components/Link';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>{db.title}</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
          transition={{
            delay: 0,
            duration: 0.5,
          }}
        >
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
            <form onSubmit={($e) => {
              $e.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}
            >
              <Input
                name="userName"
                onChange={($e) => setName($e.target.value)}
                placeholder="Diz ai seu nome"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget
          as={motion.section}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
          transition={{
            delay: 0.5,
            duration: 0.5,
          }}
        >
          <Widget.Header>
            <h1>Quiz da Galera</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Adkdkd</p>
            <ul>
              {db.external.map((url) => {
                const [projectName, gitUserName] = url.replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');
                return (
                  <li key={url}>
                    <Widget.Topic
                      href={`/quiz/${projectName}___${gitUserName}`}
                      as={Link}
                    >
                      {`${gitUserName}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer 
          as={motion.footer}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
          transition={{
            delay: 1,
            duration: 0.5,
          }} />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/stebanmd/aluraquiz-base" />
    </QuizBackground>
  );
}
