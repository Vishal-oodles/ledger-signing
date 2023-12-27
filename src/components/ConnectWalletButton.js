import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js';
import dynamic from 'next/dynamic';
import React, { useCallback, useEffect, useState } from 'react';

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

const ConnectWalletButton = () => {
  const { publicKey, connected, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [signature, setSignature] = useState('');

  const solanaSign = useCallback(async () => {
    const latestBlockhash = await connection.getLatestBlockhash();
    const instructions = [
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: publicKey,
        lamports: 1,
      }),
    ];

    const messageLegacy = new TransactionMessage({
      payerKey: publicKey,
      recentBlockhash: latestBlockhash.blockhash,
      instructions,
    }).compileToLegacyMessage();

    const transaction = new VersionedTransaction(messageLegacy);

    try {
      const signature = await sendTransaction(transaction, connection);
      setSignature(signature);
    } catch (error) {}
  });

  useEffect(() => {
    if (!connected) return;
    console.log('Wallet connected', publicKey);
    solanaSign();
  }, [connected]);

  return (
    <div className="flex flex-col items-center gap-5">
      <WalletMultiButtonDynamic />
      <p>{signature}</p>
    </div>
  );
};

export default ConnectWalletButton;
