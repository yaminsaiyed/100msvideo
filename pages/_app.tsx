// _app.tsx
import React from 'react';
import {useEffect} from 'react';
import { AppProps } from 'next/app';
import { HMSRoomProvider } from "@100mslive/react-sdk";


const MyApp = ({ Component, pageProps }: AppProps) => {
 
  
  console.log('Rendering MyApp component'); // Example console.log statement

  // Any additional initialization or configuration logic goes here

  return (
    <HMSRoomProvider>
    <Component {...pageProps} />
    </HMSRoomProvider>
  );
};

export default MyApp;