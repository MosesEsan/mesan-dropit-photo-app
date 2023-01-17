import {gql} from "@apollo/client";

//INDEX
export const GET_NOTIFICATIONS = gql`
    query getNotifications {
        notifications{
            id
            type
            drop{
                id
                image
                caption
                latitude
                longitude
                city
                country
                private
                radius
                createdAt
                user{
                    id
                    name
                    image
                }
                likes{
                    userId
                }
            }
            createdAt
        }
    }
`;


//READ
export const GET_NOTIFICATION = gql`
    query getNotification($id: ID!){
        notification(id: $id){
            id
            drop{
                id
                image
                caption
                latitude
                longitude
                city
                country
                private
                radius
                createdAt
                user{
                    id
                    name
                    image
                }
                likes{
                    userId
                }
                comments
            }
            createdAt
        }
    }
`;


// UPDATE
export const UPDATE_NOTIFICATION = gql`
    mutation updateNotification($read: Boolean){
        updateNotification(read: $read){
            id
            user{
                id
                name
                image
            }
            drop{
                id
            }
            createdAt
        }

    }
`;


//DELETE
export const DELETE_NOTIFICATION = gql`
    mutation ($id: ID!){
        deleteNotification(id: $id){
            id
        }
    }
`;


//REGISTER
export const REGISTER_FOR_NOTIFICATON = gql`
    mutation registerForNotification($deviceToken: String!){
        registerForNotification(deviceToken:$deviceToken){
            id
            user {
                id
                name
            }
            tagged
            like
            comment
            promotional
        }
    }
`;
