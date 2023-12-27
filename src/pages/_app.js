import '@/styles/globals.css';
import { ContextProvider } from '@/contexts/ContextProvider';
require('@solana/wallet-adapter-react-ui/styles.css');

export default function App({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
}
