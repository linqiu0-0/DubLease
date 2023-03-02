import React from "react";
import Routes from "./Routes";
import './styles/tailwind.css';
import { AuthProvider } from "./hooks/useAuth";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}

export default App;
