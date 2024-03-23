"use client";

import {
  CrossmintPaymentElement,
  CrossmintEvent,
} from "@crossmint/client-sdk-react-ui";

interface FiatProps {
  paymentHandler: (event: CrossmintEvent) => any;
}

const FiatCheckout: React.FC<FiatProps> = ({ paymentHandler }) => {
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
  const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID as string;
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT as string;

  return (
    <div className="loading-bg">
      <div className="loading-message">Loading Checkout...</div>
      <div className="loading-spinner" />
      <div className="payment-wrapper">
        <CrossmintPaymentElement
          projectId={projectId}
          collectionId={collectionId}
          environment={environment}
          emailInputOptions={{
            show: true,
          }}
          paymentMethod="fiat"
          mintConfig={{
            totalPrice: "0.0001",
          }}
          onEvent={paymentHandler}
        />
      </div>
    </div>
  );
};

export default FiatCheckout;
