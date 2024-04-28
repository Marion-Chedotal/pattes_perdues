import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authActions";
import Button from "../../Components/Btn/Button";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (inputs) => {
    try {
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return <Button onClick={handleLogout}>Déconnexion</Button>;
};

export default LogoutButton;
