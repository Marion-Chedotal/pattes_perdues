import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Button from "../../Components/Btn/Button";

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = async (inputs) => {
    try {
      logout(inputs);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return <Button onClick={handleLogout}>Déconnexion</Button>;
};

export default LogoutButton;
