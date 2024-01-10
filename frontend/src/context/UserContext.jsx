import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: null,
    avatar: null,
    key: Date.now(),
  });

  const [userChanged, setUserChanged] = useState(false);

  const updateUser = (newUser) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, ...newUser };
      console.log("Updated user in context:", updatedUser);
      return updatedUser;
    });
  };

  const notifyUserChange = () => {
    setUserChanged((prev) => !prev); // Toggle the state to notify subscribers
  };

  useEffect(() => {
    notifyUserChange(); // Notify on initial mount
  }, [user]);

  return (
    <UserContext.Provider
      value={{ user, updateUser, userChanged, notifyUserChange }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  const { user, updateUser, userChanged, notifyUserChange } = context;
  return { user, updateUser, userChanged, notifyUserChange };
};
