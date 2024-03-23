import { useState } from "react";
import CryptoCheckout from "./CryptoCheckout";
import FiatCheckout from "./FiatCheckout";
import Minting from "./Minting";

interface CrossmintProps {
  minting: boolean;
  setMinting: Function;
  paymentMethod: string;
  setPaymentMethod: Function;
}

const Crossmint: React.FC<CrossmintProps> = ({
  minting,
  setMinting,
  paymentMethod,
  setPaymentMethod,
}) => {
  const [orderIdentifier, setOrderIdentifier] = useState("");

  const handlePaymentEvent = (event: any) => {
    switch (event.type) {
      case "crypto-payment:user-accepted":
        // If you want to add a message about crypto payment being confirmed
        // this is the place to do it.
        console.log("crypto-payment:user-accepted", event);
        break;

      case "payment:process.started":
        console.log("payment:process.started", event);
        setMinting(true);
        break;

      case "payment:process.succeeded":
        console.log(event);
        setOrderIdentifier(event.payload.orderIdentifier);
        break;
      default:
        console.log(event);
        break;
    }
  };

  type PaymentMethod = "ETH" | "fiat";
  const getButtonClass = (method: PaymentMethod) => {
    let baseClass =
      "flex items-center justify-center bg-gray-100 px-5 py-2 shadow-sm hover:shadow-lg rounded cursor-pointer transition-shadow duration-200 border-solid border-2 text-black";
    if (method === paymentMethod) {
      baseClass += " border-indigo-500";
    }
    if (minting) {
      baseClass += " opacity-50 cursor-not-allowed";
    }
    return baseClass;
  };

  return (
    <>
      <div className="sm:col-span-1">
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={() => setPaymentMethod("ETH")}
            className={getButtonClass("ETH")}
            disabled={minting}
          >
            ETH
          </button>
          <button
            onClick={() => setPaymentMethod("fiat")}
            className={getButtonClass("fiat")}
            disabled={minting}
          >
            Credit Card
          </button>
        </div>

        {!orderIdentifier ? (
          paymentMethod === "ETH" ? (
            <CryptoCheckout paymentHandler={handlePaymentEvent} />
          ) : paymentMethod === "fiat" ? (
            <FiatCheckout paymentHandler={handlePaymentEvent} />
          ) : null
        ) : (
          <Minting orderIdentifier={orderIdentifier} />
        )}
      </div>
    </>
  );
};

export default Crossmint;
