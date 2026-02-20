import React from "react";
import Link from "next/link";
import { BsCheck2Circle } from "react-icons/bs";

const PaymentSuccess = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6'>
      <div className='bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center'>
        <BsCheck2Circle className='w-16 h-16 text-green-500' />
        <h1 className='text-2xl font-bold text-gray-800 mt-4'>
          Payment Successful!
        </h1>
        <p className='text-gray-600 mt-2'>
          Your payment has been processed successfully.
        </p>

        <Link
          href='/'
          className='mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition'
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
