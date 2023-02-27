import * as React from "react";

const authContext = React.createContext({username: {}, userId: {}});

function useAuth() {
  const [authed, setAuthed] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [userId, setUserId] = React.useState("");


  return {
    authed,
    username,
    userId,
    login(name, Id) {
      return new Promise((res) => {
        setAuthed(true);
        setUsername(name);
        setUserId(Id);
        res();
      });
    },
    logout() {
      return new Promise((res) => {
        setAuthed(false);
        setUsername("");
        setUserId("");
        res();
      });
    },
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}