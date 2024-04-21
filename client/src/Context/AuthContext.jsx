import { createContext, useEffect, useState } from "react";
import authService from "../Services/AuthService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  const login = async (inputs) => {
    await authService.login(inputs);
    const userData = await authService.getMe();
    setCurrentUser(userData);
  };

  const logout = async () => {
    await authService.logout();
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 2eme essai:
// import { createContext, useEffect, useState } from "react";
// import authService from "../Services/AuthService";
// import axios from "axios";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/api/me", {
//           withCredentials: true,
//         });
//         setCurrentUser(response.data);
//         setIsLoggedIn(true);
//       } catch (error) {
//         if (error.response && error.response.status === 401) {

//           setIsLoggedIn(false);
//         } else {
//           console.error("Error fetching current user:", error);
//         }
//       }
//     };

//     if (isLoggedIn) {
//       fetchCurrentUser();
//     }
//   }, [isLoggedIn]);

//   const login = async (inputs) => {
//     try {

//       const userData = await authService.login(inputs);
//       setCurrentUser(userData);
//       setIsLoggedIn(true);
//     } catch (error) {
//       console.error("Error logging in:", error);
//     }
//   };

//   const logout = async () => {
//     try {

//       await authService.logout();
//       setCurrentUser(null);
//       setIsLoggedIn(false);
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{ currentUser, setCurrentUser, isLoggedIn, login, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
