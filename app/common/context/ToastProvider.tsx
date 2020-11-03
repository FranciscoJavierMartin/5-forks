import React, { createContext, useCallback, useEffect, useState } from 'react';
import { IToastContext, IToastState } from '../interfaces/states';

const initialToastState: IToastState = {
  message: '',
  isVisible: false,
};

export const ToastContext = createContext<IToastContext>({
  toast: initialToastState,
  hide: () => {},
  show: () => {},
});

export const ToastProvider: React.FC = ({ children }) => {
  const [toast, setToast] = useState<IToastState>(initialToastState);
  let timeout: NodeJS.Timeout;

  const show = useCallback((args) => {
    setToast({ ...toast, isVisible: true, ...args });
  }, []);

  const hide = useCallback(() => {
    setToast({ ...toast, isVisible: false });
  }, []);

  useEffect(() => {
    if (toast.isVisible) {
      timeout = setTimeout(hide, 3000);
      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
      };
    }
  }, [hide, toast]);
  return (
    <ToastContext.Provider value={{ hide, show, toast }}>
      {children}
    </ToastContext.Provider>
  );
};
