import React, { useContext} from "react";
import { AuthContext } from "../../Context/AuthContext";

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = async (inputs) => {
    try {
      logout(inputs)

    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return <button onClick={handleLogout}>Déconnexion</button>;
};

export default LogoutButton;
