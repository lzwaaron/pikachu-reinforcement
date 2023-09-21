// client/components/App.tsx

import React from 'react';
import SearchPage from './SearchPage';
import LoginPage from './LoginPage';
import { useState, useEffect } from 'react';
import { User } from '../../models/restaurantModel';
import jwt_decode from 'jwt-decode';
declare const google: any;

const App: React.FC = () => {
  const defaultUser: User = {
    given_name: '',
    email: '',
    picture: '',
  };

  const [isLoggedin, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User>(defaultUser);

  function handleCallbackResponse(response: any) {
    console.log('Encoded JWT ID token:' + response.credential);
    const userObject: User = jwt_decode(response.credential);
    console.log(userObject.email);
    setUser(userObject);
    document.getElementById('signInDiv')!.hidden = true;
    setIsLoggedIn(true);
  }

  function handleSignout() {
    setUser(defaultUser);
    document.getElementById('signInDiv')!.hidden = false;
    setIsLoggedIn(false);
  }

  useEffect(() => {
    // global google
    google.accounts.id.initialize({
      client_id:
        '1047732779933-sl07ees646isgptdhogc1j2ctdvp1e60.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
      type: 'standard',
    });

    // google.accounts.id.prompt();
  }, []);

  return (
    <div>
      {isLoggedin ? '' : <LoginPage />}
      <h1>Hello {user.given_name}</h1>
      <h1>Restaurant Finder</h1>
      {isLoggedin ? <SearchPage /> : ''}
    </div>
  );
};

export default App;
