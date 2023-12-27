import { useLocalStorage } from '@solana/wallet-adapter-react';
import { createContext, useContext } from 'react';

export const NetworkConfigurationContext = createContext({});

export function useNetworkConfiguration() {
  return useContext(NetworkConfigurationContext);
}

export const NetworkConfigurationProvider = ({ children }) => {
  const [networkConfiguration, setNetworkConfiguration] = useLocalStorage(
    'network',
    process.env.NEXT_PUBLIC_NETWORK
  );

  return (
    <NetworkConfigurationContext.Provider
      value={{ networkConfiguration, setNetworkConfiguration }}
    >
      {children}
    </NetworkConfigurationContext.Provider>
  );
};
