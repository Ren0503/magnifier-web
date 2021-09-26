import React from 'react';
import Head from 'next/head';

import { Header } from 'components/core';
import { QuestionForm, QuestionAskView } from 'components/question';

const Ask = () => {
    return (
        <div>
            <Head>
                <title>Ask a Question - Forum</title>
            </Head>

            <Header />
            <QuestionAskView>
                <QuestionForm />
            </QuestionAskView>
        </div>
    );
};

export default Ask;