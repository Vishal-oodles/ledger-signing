import React, {
  createContext,
  useContext,
  useMemo,
} from 'react';
import { useLocalStorage } from '@solana/wallet-adapter-react';

export const AutoConnectContext = createContext({});

export function useAutoConnect() {
  return useContext(AutoConnectContext);
}

export const AutoConnectProvider = ({ children }) => {
  const [autoConnect, setAutoConnect] = useLocalStorage('autoConnect', true);

  const ContextValues = useMemo(
    () => ({
      autoConnect,
      setAutoConnect,
    }),
    [autoConnect, setAutoConnect]
  );

  return (
    <AutoConnectContext.Provider value={ContextValues}>
      {children}
    </AutoConnectContext.Provider>
  );
};
