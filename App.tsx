import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { store } from './src/api/store';
import './src/api/interceptors';
import queryClient from './src/api/queryClient';
import MainRoutes from './src/navigation';
import { AuthProvider } from './src/context/userContext';
import { ToastProvider } from './src/utils/ToastManager';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <ToastProvider>
              <AuthProvider>
                <MainRoutes />
              </AuthProvider>
            </ToastProvider>
          </Provider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
