"use client";
// import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
type Props = {};

const page = (props: Props) => {
  const config = {
    public_key: "FLWPUBK_TEST-ff88c3331f1b3eeac9b4315511ea8768-X",
    tx_ref: Date.now().toString(),
    amount: 100,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: "user@gmail.com",
      phone_number: "070********",
      name: "john doe",
    },
    customizations: {
      title: "my Payment Title",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  // const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className="min-h-[70vh] flex justify-center items-center flex-col">
      <h1>Hello Test user</h1>

      {/* <button
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
              console.log(response);
              closePaymentModal(); // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }}
      >
        Payment with React hooks
      </button> */}
    </div>
  );
};

export default page;
