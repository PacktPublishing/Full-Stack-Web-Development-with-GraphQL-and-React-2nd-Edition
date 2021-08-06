import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Router from './router';
import { useCurrentUserQuery } from './apollo/queries/currentUserQuery';
import { withApollo } from '@apollo/client/react/hoc';
import './components/fontawesome';
import '../../assets/css/style.css';
import 'cropperjs/dist/cropper.css';

const App = ({ client }) => {
    const [loggedIn, setLoggedIn] = useState((typeof window.__APOLLO_STATE__ !== typeof undefined && typeof window.__APOLLO_STATE__.ROOT_QUERY !== typeof undefined && typeof window.__APOLLO_STATE__.ROOT_QUERY.currentUser !== typeof undefined));
    const { data, loading, error } = useCurrentUserQuery();

    useEffect(() => {
        const unsubscribe = client.onClearStore(
            () => {
                if(loggedIn){
                    setLoggedIn(false)
                }
            }
        );
        return () => {
            unsubscribe();
        }
    }, []);


    return (
        <div className="container">
            <Helmet>
                <title>Graphbook - Feed</title>
                <meta name="description" content="Newsfeed of all your friends on Graphbook" />
            </Helmet>
            <Router loggedIn={loggedIn} changeLoginState={setLoggedIn}/>
        </div>
    )
}

export default withApollo(App)