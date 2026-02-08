import { View, Text } from 'react-native';
import React from 'react';
import {QueryClient,QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner-native';

const Providers = ({children}:{children:React.ReactNode}) => {
    const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position='bottom-center'/>
    </QueryClientProvider>
  )
}

export default Providers