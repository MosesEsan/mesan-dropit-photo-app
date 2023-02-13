import {gql} from "@apollo/client";

// INDEX
export const GET_DROPS = gql`
    query getDrops ($latitude: Float!, $longitude: Float!, $radius: Int!, $private: Boolean, $orderBy: DropOrderBy, $showAll: Boolean) {
        drops(latitude: $latitude, longitude: $longitude, radius: $radius, private: $private, orderBy: $orderBy, showAll: $showAll){
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
            in_range
            distance
            distance_long 
        }
    }
`;


//CREATE
export const ADD_DROP = gql`
    mutation addDrop($image: String!, $caption: String!, $latitude: Float!, $longitude: Float!, $radius: Int!, $private: Boolean!, $taggedUsers: [ID!]){
        addDrop(image: $image, caption: $caption, latitude: $latitude, longitude: $longitude, radius: $radius, private: $private, taggedUsers: $taggedUsers){
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
            in_range
            distance
            distance_long
        }
    }
`;

//READ
export const GET_DROP = gql`
    query getDrop ($id: ID!) {
        drop(id: $id){
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
            taggedUsers {
                id
            }
            user{
                id
                name
                image
            }
            likes{
                userId
            }
            comments
            in_range
            distance
            distance_long
        }
    }
`;

// UPDATE
export const UPDATE_DROP = gql`
    mutation updateDrop($id: ID!, $caption: String, $radius: Int, $private: Boolean, $taggedUsers: [ID!]){
        updateDrop(id: $id, caption: $caption, radius: $radius, private: $private, taggedUsers: $taggedUsers){
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
            in_range
            distance
            distance_long
        }

    }
`;

//DELETE
export const DELETE_DROP = gql`
    mutation deleteDrop($id: ID!){
        deleteDrop(id: $id){
            id
        }
    }
`;

//LIKE
export const LIKE_DROP = gql`
    mutation likeDrop($dropId: ID!, $value: Boolean!){
        like(dropId: $dropId, value: $value){
            id,
            userId
        }
    }
`;

//REPORT
export const REPORT_DROP = gql`
    mutation reportDrop($dropId: ID!, $reason: String!){
        report(dropId: $dropId, reason: $reason){
            id
            userId
            dropId
        }
    }
`;
