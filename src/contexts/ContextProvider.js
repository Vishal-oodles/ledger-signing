import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { useCallback, useMemo } from 'react';
import { AutoConnectProvider, useAutoConnect } from './AutoConnectProvider';
import { NetworkConfigurationProvider } from './NetworkConfigurationProvider';
import dynamic from 'next/dynamic';
import React from 'react';

const ReactUIWalletModalProviderDynamic = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletModalProvider,
  { ssr: false }
);

const WalletContextProvider = ({ children }) => {
  const { autoConnect } = useAutoConnect();
  const network = process.env.NEXT_PUBLIC_NETWORK;
  const endpoint = process.env.NEXT_PUBLIC_SOLANA_RPC_HOST;

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    [network]
  );

  const onError = useCallback((error) => {
    console.error(error);
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint ?? ''}>
      <WalletProvider
        wallets={wallets}
        onError={onError}
        autoConnect={autoConnect}
      >
        <ReactUIWalletModalProviderDynamic>
          {children}
        </ReactUIWalletModalProviderDynamic>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export const ContextProvider = ({ children }) => {
  return (
    <>
      <NetworkConfigurationProvider>
        <AutoConnectProvider>
          <WalletContextProvider>{children}</WalletContextProvider>
        </AutoConnectProvider>
      </NetworkConfigurationProvider>
    </>
  );
};
