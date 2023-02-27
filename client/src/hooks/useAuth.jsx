import * as React from "react";

const authContext = React.createContext();

function useAuth() {

  const getToken = () => {
    const tokenString = window.sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.AuthToken
  };

  const saveToken = () => {
    let userToken = {
      AuthToken: "authorizedToken"
    }
    window.sessionStorage.setItem('token', JSON.stringify(userToken));
  };

  const [authed, setAuthed] = React.useState(getToken() != null);


  return {
    authed,
    login() {
      return new Promise((res) => {
        saveToken();
        setAuthed(true);
        res();
      });
    },
    logout() {
      return new Promise((res) => {
        window.sessionStorage.clear()
        setAuthed(false);
        res();
      });
    }
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}