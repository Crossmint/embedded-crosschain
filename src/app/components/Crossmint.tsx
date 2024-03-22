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

        {paymentMethod === "ETH" ? (
          <h2 className="text-black">Crypto Checkout</h2>
        ) : paymentMethod === "fiat" ? (
          <h2 className="text-black">Fiat Checkout</h2>
        ) : null}
      </div>
    </>
  );
};

export default Crossmint;
