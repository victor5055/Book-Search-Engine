import { gql } from '@apollo/client';

// queries for logged in users
export const GET_ME = gql`
query me {
    me {
      _id
      username
      email
     
      savedBooks {
      
        authors
       
        description
    
        link
      }
    }
  }
`;