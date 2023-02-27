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
  const [username, setUsername] = React.useState("");
  const [userId, setUserId] = React.useState("");

  return {
    authed,
    username,
    userId,
    login(name, Id) {
      return new Promise((res) => {
        saveToken();
        setAuthed(true);
        setUsername(name);
        setUserId(Id);
        res();
      });
    },
    logout() {
      return new Promise((res) => {
        window.sessionStorage.clear()
        setAuthed(false);
        setUsername("");
        setUserId("");
        res();
      });
    }, updateName(name) {
      return new Promise((res) => {
        setUsername(name);
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