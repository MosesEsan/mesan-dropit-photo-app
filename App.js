import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client';
import {setContext} from "@apollo/client/link/context";

import RootNavigator from "./app/RootNavigator";
import ProviderContainer from "./app/ProviderContainer";
import {TOKEN_KEY} from "./app/modules/auth/AuthProvider";

// const uri = "https://5d09-34-242-156-85.eu.ngrok.io/graphql"
const uri = "https://mesan-digital-dropit-api.herokuapp.com/graphql"

const httpLink = createHttpLink({
    uri
});

const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from async storage if it exists
    const accessToken = await AsyncStorage.getItem(TOKEN_KEY);

    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
    };
});


// Initialize Apollo Client
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});


export default function App() {
    return (
        <ApolloProvider client={client}>
            <ProviderContainer>
                <StatusBar
                    animated={true}
                    barStyle={'light-content'}/>
                <RootNavigator/>
            </ProviderContainer>
        </ApolloProvider>
    );
}

