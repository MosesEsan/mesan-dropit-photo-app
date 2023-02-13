import {gql} from "@apollo/client";

//COMMENTS
export const GET_COMMENTS = gql`
    query getComments($dropId: Int!) {
        comments (dropId: $dropId) {
            id
            text
            createdAt
            dropId
            user {
                id
                name
                image
            }
        }
    }
`;

//CREATE
export const ADD_COMMENT = gql`
    mutation addComment($dropId: ID!, $text: String!){
        addComment(dropId: $dropId, text: $text){
            id
            text
            createdAt
            user {
                id
                name
                image
            }
        }
    }
`;
