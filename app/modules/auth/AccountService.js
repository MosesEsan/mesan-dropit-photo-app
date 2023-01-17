import {gql} from "@apollo/client";

export const DELETE_ACCOUNT = gql`
    mutation deleteAccount{
        deleteAccount
    }
`;

export const GET_BLOCKED_USERS = gql`
    query getBlockedUsers{
        blockedUsers {
            id
            user {
                id
                name
                image
            }
        }
    }
`;

export const UNBLOCK_USER = gql`
    mutation unBlockUser($userId: ID!){
        unBlockUser(userId: $userId)
    }
`;
