import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';


const THINGS = gql`
  {
    things {
      name
    } 
  }
`


const HomePage = () => {

    const { loading, error, data } = useQuery(THINGS)
    console.log(data)


    return (
        <div>
            Home yay
        </div>
    )
}

export default HomePage;