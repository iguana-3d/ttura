import Head from 'next/head';
import React from 'react';
import LoginScreen from './components/LoginScreen';
import { store } from '../store/store';
import { Provider } from 'react-redux';

export default function Home() {
    return (
        <React.Fragment>
            <Provider store={store}>
                <Head>
                    <title>TTURA TESTS</title>
                    <meta name="description" content="Tests login screen" />
                </Head>
                <div className="container">
                    <LoginScreen />
                </div>
            </Provider>
        </React.Fragment>
    )
}
