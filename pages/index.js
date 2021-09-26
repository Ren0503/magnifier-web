import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { publicFetch } from 'utils/fetcher';

import Layout from 'layout';
import { SpinnerIcon } from 'components/icons';
import { PageTitle, ButtonGroup, Button } from 'components/shared';
import { QuestionWrapper, QuestionStats, QuestionSummary } from 'components/question';

const HomePage = () => {
  const router = useRouter();

  const [questions, setQuestions] = useState(null);
  const [sortType, setSortType] = useState('Votes');
  const [showMore, setShowMore] = useState(8);

  useEffect(() => {
    const fetchQuestion = async () => {
      const { data } = await publicFetch.get('/question');
      setQuestions(data);
    }

    const fetchQuestionByTag = async () => {
      const { data } = await publicFetch.get(`/questions/${router.query.tag}`);
      setQuestions(data);
    }

    if (router.query.tag) {
      fetchQuestionByTag();
    } else {
      fetchQuestion();
    }
  }, [router.query.tag]);

  const handleShowMore = () => {
    setShowMore(showMore + 4);
  };

  const handleSorting = () => {
    switch (sortType) {
      case 'Votes':
        return (a, b) => b.score - a.score;
      case 'Views':
        return (a, b) => b.views - a.views;
      case 'Newest':
        return (a, b) => new Date(b.created) - new Date(a.created);
      case 'Oldest':
        return (a, b) => new Date(a.created) - new Date(b.created);
      default:
        break;
    }
  };

  return (
    <Layout>
      <Head>
        <title>
          {router.query.tag ? router.query.tag : 'Questions'} - Forum
        </title>
      </Head>

      <PageTitle title={router.query.tag ? `Questions tagged [${router.query.tag}]` : 'All Questions'} button borderBottom={false} />

      <ButtonGroup
        borderBottom
        buttons={['Votes', 'Views', 'Newest', 'Oldest']}
        selected={sortType}
        setSelected={setSortType}
      />

      {!questions && (
        <div className="loading">
          <SpinnerIcon />
        </div>
      )}

      {questions
        ?.slice(0, showMore)
        .sort(handleSorting())
        .map(
          ({
            id,
            votes,
            answers,
            views,
            title,
            text,
            tags,
            author,
            created
          }) => (
            <QuestionWrapper key={id}>
              <QuestionStats
                voteCount={votes.length}
                answerCount={answers.length}
                view={views}
              />
              <QuestionSummary
                id={id}
                title={title}
                tags={tags}
                author={author}
                createdTime={created}
              >
                {text.length > 30
                  ?
                  <div dangerouslySetInnerHTML={{ __html: text.substring(0, 30) + "...." }} />
                  :
                  <div dangerouslySetInnerHTML={{ __html: text }} />
                }
              </QuestionSummary>
            </QuestionWrapper>
          )
        )}
      <div style={{ textAlign: 'center', padding: '10px' }}>
        <Button onClick={handleShowMore}>
          See More
        </Button>
      </div>
    </Layout>
  );
};

export default HomePage;