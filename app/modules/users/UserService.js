import {gql} from "@apollo/client";

//INDEX
export const GET_USERS = gql`
    query getUsers {
        users{
            users {
                id
                name
                image
            }
            following {
                userId
            }
        }
    }
`;

export const GET_USER = gql`
    query getUser($id: ID!, $latitude: Float, $longitude: Float, $radius: Int){
        user(id: $id, latitude: $latitude, longitude: $longitude, radius: $radius) {
            user {
                id
                name
                image
                drops {
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
                likes {
                    id
                }
                comments {
                    id
                }
                followers{
                    id
                }
                following{
                    id
                }
            }
            following {
                userId
            }
        }
    }
`;

export const GET_USER_FOLLOWERS = gql`
    query getUserFollowers($id: ID!){
        user(id: $id) {
            user {
                id
                name
                image
                followers{
                    id
                    follower {
                        id
                        name
                        image
                    }
                }
                following{
                    id
                    user {
                        id
                        name
                        image
                    }
                    follower {
                        id
                        name
                        image
                    }
                }
            }
            following {
                userId
            }
        }
    }
`;

export const FOLLOW_USER = gql`
    mutation followUser($userId: ID!, $value: Boolean!){
        follow(userId: $userId, value: $value)
    }
`;

export const BLOCK_USER = gql`
    mutation blockUser($userId: ID!){
        blockUser(userId: $userId){
            id
            userId
        }
    }
`;

//TO BE DELETED - GET CURRENT USER FOLLOWERS
export const GET_FOLLOWERS = gql`
    query getFollowers{
        followers {
            id
            follower {
                id
                name
                image
            }
        }
    }
`;
