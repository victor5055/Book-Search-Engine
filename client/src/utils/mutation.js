import gql from 'graphql-tag';


export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
        token
            user {
                _id
                username
               }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }    
    }
`; 

export const SAVE_BOOK = gql`
    mutation saveBook($bookData: bookInput!) {
        saveBook(bookData: $bookData) {
            _id
            username
            email
            password
            bookCount
            savedBooks {
               
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }
`;


export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
            _id
            username
            email
            password
            bookCount
            savedBooks {
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }
`;

