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

const config = getDefaultConfig({
  appName: "Crossmint Crosschain Demo",
  projectId: "0ba14b99010e8e22edb5b53ce5372a17",
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
              <h2 className="text-black">This is our app</h2>
            </div>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Page;
