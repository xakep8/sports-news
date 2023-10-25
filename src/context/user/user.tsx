import { createContext, useEffect, useState } from "react";
import { User } from "../../types/user";
import { me } from "./actions";

export type UserProp = {
  user: User | null;
  setUser: (user: User | null) => void;
};
const UserContext = createContext<UserProp>({
  user: null,
  setUser: () => void 0,
});

const fetchUser = async (setUserCB: (data: User) => void) => {
  try {
    const data: User = await me();
    console.log(data);
    setUserCB(data);
  } catch (err: any) {
    console.log(err.message);
  }
};
const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const valueToShare = {
    user,
    setUser,
  };

  useEffect(() => {
    fetchUser(setUser);
  }, []);

  return (
    <UserContext.Provider value={valueToShare}>{children}</UserContext.Provider>
  );
};
export { UserContext, UserProvider };