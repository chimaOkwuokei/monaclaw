import { PrivyProvider } from '@privy-io/react-auth';
import { monadTestnet } from 'viem/chains';

const PrivyProviders = ({ children }: { children: React.ReactNode }) => {
  const appId = import.meta.env.VITE_PRIVY_APP_ID;

  return (
    <PrivyProvider
      appId={appId}
      config={{
        supportedChains: [monadTestnet],
        defaultChain: monadTestnet,
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          ethereum: {
            createOnLogin: 'users-without-wallets'
          }
        },
        appearance: {
          theme: 'dark',
          accentColor: '#3b82f6',
          logo: '/logo-square.png',
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
};

export default PrivyProviders;