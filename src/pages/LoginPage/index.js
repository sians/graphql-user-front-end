import React, { useState, useRef } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const LoginPage = () => {
  const email = useRef(null);
  const password = useRef(null);

  const LOGIN = gql`
  mutation LoginMutation(
    $email: String!
    $password: String!
  ) {
    login(email: $email, password: $password) {
        jwt
        user {
          email
        }     
    }
  }
`

  return (
      <Mutation
        mutation={LOGIN}
      >
        {
          (login, { loading: authenticating }) =>
            authenticating ? (
              "..."
            ) : (
              <div>
                <form
                  onSubmit={event => {
                    event.preventDefault();
                    console.log("in")
                    login({
                      variables: { email: email.current.value, password: password.current.value}
                    }).then(( { data : { login : {jwt} } }) => {
                      if (jwt) {
                        localStorage.setItem("jwt", jwt);
                        console.log(jwt);
                      }
                    });
                  }}
                >
                  <input
                    ref={email}
                    type="email"
                    placeholder="your email"
                  />
                  <input
                    ref={password}
                    type="password"
                    placeholder="*****"
                  />
                  <input
                    type="submit"
                    value="Sign in"
                  />
                </form>
              </div>
            )
        }
      </Mutation>
  )
}

export default LoginPage;

