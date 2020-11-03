import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../../api/firebase';
import { IUserContext, IUserState } from '../interfaces/states';

const initialUserState: IUserState = {
  user: null,
};

export const UserContext = createContext<IUserContext>({
  user: initialUserState,
});

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUserState>(initialUserState);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser({ user: firebaseUser });
    });
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
