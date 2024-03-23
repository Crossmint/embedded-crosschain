"use client";

import {
  CrossmintPaymentElement,
  CrossmintEvent,
} from "@crossmint/client-sdk-react-ui";
import { EVMBlockchainIncludingTestnet as Blockchain } from "@crossmint/common-sdk-base";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useChainId,
  useSwitchChain,
  useSendTransaction,
} from "wagmi";

interface CryptoProps {
  paymentHandler: (event: CrossmintEvent) => any;
}

const CryptoCheckout: React.FC<CryptoProps> = ({ paymentHandler }) => {
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
  const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID as string;
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT as string;

  const account = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { sendTransactionAsync } = useSendTransaction();

  const chainIdMap = {
    "arbitrum-sepolia": 421614,
    "base-sepolia": 84532,
    "ethereum-sepolia": 11155111,
    "optimism-sepolia": 11155420,
  };

  return (
    <>
      <div className="connect-wrapper my-3">
        <ConnectButton
          showBalance={false}
          chainStatus="none"
          accountStatus="full"
        />
      </div>
      {account.address ? (
        <div className="loading-bg">
          <div className="loading-message">Loading Checkout...</div>
          <div className="loading-spinner" />
          <div className="payment-wrapper">
            <CrossmintPaymentElement
              projectId={projectId}
              collectionId={collectionId}
              environment={environment}
              recipient={{
                wallet: account.address,
              }}
              paymentMethod="ETH"
              signer={{
                address: account?.address || "",
                signAndSendTransaction: async (transaction) => {
                  const result = await sendTransactionAsync({
                    to: transaction.to as `0x${string}`,
                    value: BigInt(transaction.value.toString()),
                    data: transaction.data as `0x${string}`,
                    chainId: transaction.chainId,
                  });

                  return result;
                },
                handleChainSwitch: async (chain) => {
                  switchChain({
                    chainId: chainIdMap[chain as keyof typeof chainIdMap],
                  });
                },
                supportedChains: [
                  "arbitrum-sepolia",
                  "base-sepolia",
                  "ethereum-sepolia",
                  "optimism-sepolia",
                ],
                chain: Object.keys(chainIdMap).find(
                  (key) =>
                    chainIdMap[key as keyof typeof chainIdMap] === chainId
                ) as Blockchain | undefined,
              }}
              mintConfig={{
                totalPrice: "0.0001",
              }}
              onEvent={paymentHandler}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CryptoCheckout;
