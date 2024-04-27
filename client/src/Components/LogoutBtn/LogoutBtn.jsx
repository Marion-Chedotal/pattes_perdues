import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authActions";
import Button from "../../Components/Btn/Button";

const LogoutButton = () => {
 
  const dispatch = useDispatch();
  
  const handleLogout = async (inputs) => {
    try {
      dispatch(logout());
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return <Button onClick={handleLogout}>Déconnexion</Button>;
};

export default LogoutButton;
