import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import { publicFetch } from 'utils/fetcher';

import Layout from 'layout';
import { SpinnerIcon } from 'components/icons';
import { PageTitle } from 'components/shared';
import {
    DetailPageContainer,
    PostWrapper,
    PostVote,
    PostSummary,
    CommentList,
    CommentItem,
    AddAnswer,
    AnswerContainer
} from 'components/post';

const QuestionDetail = ({ questionId, title }) => {
    const [question, setQuestion] = useState(null);
    const [answerSortType, setAnswerSortType] = useState('Votes');

    useEffect(() => {
        const fetchQuestion = async () => {
            const { data } = await publicFetch.get(`/question/${questionId}`);
            setQuestion(data);
        }

        fetchQuestion();
    }, []);

    const handleSorting = () => {
        switch (answerSortType) {
            case 'Votes':
                return (a, b) => b.score - a.score
            case 'Newest':
                return (a, b) => new Date(b.created) - new Date(a.created)
            case 'Oldest':
                return (a, b) => new Date(a.created) - new Date(b.created)
            default:
                break
        }
    };

    const isClient = typeof window === 'object';

    return (
        <Layout extra={false}>
            <Head>
                <title>{title}</title>
                <link rel="canonical" href={isClient && window.location.href}></link>
            </Head>

            <PageTitle title={title} button />

            <DetailPageContainer>
                {!question && (
                    <div className="loading">
                        <SpinnerIcon />
                    </div>
                )}

                {question && (
                    <>
                        <PostWrapper borderBottom={false}>
                            <PostVote
                                score={question.score}
                                votes={question.votes}
                                questionId={questionId}
                                setQuestion={setQuestion}
                            />
                            <PostSummary
                                tags={question.tags}
                                author={question.author}
                                created={question.created}
                                questionId={questionId}
                            >
                                <div dangerouslySetInnerHTML={{ __html: question.text }} />
                            </PostSummary>
                            <CommentList questionId={questionId} setQuestion={setQuestion}>
                                {question.comments.map(({ id, author, created, body }) => (
                                    <CommentItem
                                        key={id}
                                        commentId={id}
                                        questionId={questionId}
                                        author={author.username}
                                        isOwner={author.username === question.author.username}
                                        created={created}
                                        setQuestion={setQuestion}
                                    >
                                        {body}
                                    </CommentItem>
                                ))}
                            </CommentList>
                        </PostWrapper>

                        {question.answers.length > 0 && (
                            <AnswerContainer
                                answersCount={question.answers.length}
                                answerSortType={answerSortType}
                                setAnswerSortType={setAnswerSortType}
                            >
                                {question.answers.sort(handleSorting()).map((answer) => (
                                    <PostWrapper key={answer.id}>
                                        <PostVote
                                            score={answer.score}
                                            votes={answer.votes}
                                            answerId={answer.id}
                                            questionId={questionId}
                                            setQuestion={setQuestion}
                                        />
                                        <PostSummary
                                            author={answer.author}
                                            created={answer.created}
                                            questionId={questionId}
                                            answerId={answer.id}
                                            setQuestion={setQuestion}
                                        >
                                            {answer.text}
                                        </PostSummary>
                                        <CommentList
                                            answerId={answer.id}
                                            questionId={questionId}
                                            setQuestion={setQuestion}
                                        >
                                            {answer.comments.map(({ id, author, created, body }) => (
                                                <CommentItem
                                                    key={id}
                                                    commentId={id}
                                                    questionId={questionId}
                                                    answerId={answer.id}
                                                    author={author.username}
                                                    isOwner={author.username === question.author.username}
                                                    created={created}
                                                    setQuestion={setQuestion}
                                                >
                                                    {body}
                                                </CommentItem>
                                            ))}
                                        </CommentList>
                                    </PostWrapper>
                                ))}
                            </AnswerContainer>
                        )}

                        <AddAnswer
                            tags={question.tags}
                            id={questionId}
                            setQuestion={setQuestion}
                        />
                    </>
                )}
            </DetailPageContainer>
        </Layout>
    );
};

export async function getServerSideProps(context) {
    const slug = context.params.slug;
    const questionId = slug.split('-').shift();
    const title = slug
        ?.substr(slug.indexOf('-') + 1)
        .split('-')
        .join(' ')

    return {
        props: {
            questionId,
            title
        }
    }
};

export default QuestionDetail;