import { IUser } from "./interface";
import { createContext } from "react";

export type UserContextType = {
  user: IUser;
  setUser: (user: IUser) => void;
};

export const UserContext = createContext<UserContextType>(null);
