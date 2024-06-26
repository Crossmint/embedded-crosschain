"use client";

import React, { useState } from "react";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import {
  arbitrumSepolia,
  baseSepolia,
  optimismSepolia,
  sepolia,
} from "wagmi/chains";
import "@rainbow-me/rainbowkit/styles.css";
import Navigation from "./components/Navigation";
import CollectionInfo from "./components/CollectionInfo";
import Crossmint from "./components/Crossmint";

const config = getDefaultConfig({
  appName: "Crossmint Crosschain Demo",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || "",
  chains: [arbitrumSepolia, baseSepolia, optimismSepolia, sepolia],
  ssr: true,
});

const queryClient = new QueryClient();

const Page: React.FC = () => {
  const [minting, setMinting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"ETH" | "fiat">("ETH");

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact">
          <div className="container mx-auto max-w-2xl bg-white rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-8 p-8">
              <Navigation />
              <CollectionInfo />
              <Crossmint
                minting={minting}
                setMinting={setMinting}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />
            </div>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Page;
