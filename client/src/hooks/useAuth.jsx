import * as React from "react";

const authContext = React.createContext();

function useAuth() {

  const getToken = () => {
    return window.sessionStorage.getItem('token');
  };

  const saveToken = (token) => {
  
    window.sessionStorage.setItem('token',token);
  };

  const [authed, setAuthed] = React.useState(getToken() != null);


  return {
    authed,
    login(token) {
      return new Promise((res) => {
        saveToken(token);
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