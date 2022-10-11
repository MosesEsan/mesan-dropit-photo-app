import {gql} from "@apollo/client";

export const REGISTER = gql`
    mutation ($email: String!, $password: String!, $name: String! ){
        signup(email: $email, password: $password, name: $name){
            token
            user{
                id
                name
                email
                image
            }
        }
    }
`

export const LOGIN = gql`
    mutation ($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
            user{
                id
                name
                email
                image
            }

        }
    }
`

export const UPDATE_USER = gql`
    mutation ($name: String, $image: String){
        updateUser(name: $name, image: $image){
            id
            image
            name
            email
        }
    }
`

export const UPDATE_PASSWORD = gql`
    mutation ($currentPassword: String!, $newPassword: String!){
        resetPassword(currentPassword: $currentPassword, newPassword: $newPassword){
            id
            image
            name
            email
        }
    }
`
