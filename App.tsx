import React from 'react';
import Navigation from './app/navigations/Navigation';
import { ToastProvider } from './app/common/context/ToastProvider';
import Toast from './app/components/Toast';
import { UserProvider } from './app/common/context/UserProvider';

export default function App() {
  return (
    <ToastProvider>
      <UserProvider>
        <Toast />
        <Navigation />
      </UserProvider>
    </ToastProvider>
  );
}
