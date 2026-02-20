import Footer from "@/component/footer/footer";
import Header from "@/component/header/header";
import User from "@/component/user";
import Link from "next/link";
import style from "../../styles/moduleCss/credit.module.css";
import { useRouter } from "next/router";
import React, { useState } from "react";
import axios from "axios";

const TestingRecharge = () => {
  const [amount, setAmount] = useState(10);
  const [loading, setLoading] = useState(false);
  const { users } = User();
  const router = useRouter();

  const id = router?.query?.id;

  const recharge = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!users._id || !id) {
      alert("Something is wrong");
      setLoading(false);
      return;
    }
    const data = {
      amount,
      user_id: users._id || id,
      currency: e.target.currency.value,
    };

    try {
      const response = await axios.post(
        `https://skipthegame-love-backend.vercel.app/api/btc-pay`,
        data,
      );

      setLoading(false);
      if (response.data?.checkoutLink) {
        location.href = response.data?.checkoutLink;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className='bg-gray-200 h-screen'>
        <Header></Header>
        <div>
          <div className=''>
            {" "}
            <div className='bg-black mx-auto text-white w-4/5 mt-10 p-2 rounded  shadow-lg shadow-blue-500/50 flex justify-between'>
              <span className='m-auto'>
                <li className='hover:text-blue-400 text-gray-300 font-bold hover:underline list-none inline'>
                  Buy Credits
                </li>

                <Link
                  href={"/dashboard/profile"}
                  className='ml-5 sm:ml-16 hover:text-blue-400 font-bold hover:underline'
                >
                  My Account
                </Link>
                <Link
                  href={"/support"}
                  className='ml-5 sm:ml-16  hover:text-blue-400  font-bold hover:underline'
                >
                  Support
                </Link>
                <Link
                  href={"/verify"}
                  className='ml-5 sm:ml-16  hover:text-blue-400  font-bold hover:underline'
                >
                  Verify
                </Link>
              </span>
            </div>
            <div className='w-4/5 mx-auto mt-5'>
              <h1 className='text-2xl font-bold'>
                Your Current Account Balance : ${" "}
                {users?.credit?.toFixed(2) || 0}
              </h1>
              <p>
                Add Credits in your Skipthegames account to post & upgrade your
                Ad. <br />
                After one ads promotion, remaining credits will be still
                available in your account for feature ads promotions!
              </p>
            </div>
            <form onSubmit={recharge}>
              <div className={style.container}>
                <h1 className='text-2xl text-black font-bold mb-5'>
                  Recharge Credits -
                </h1>
                <div>
                  <h1 className='text-lg text-black'>Select Currency</h1>
                  <select
                    name='currency'
                    className='p-1 mb-5 bg-gray-50 text-black border rounded select-info w-full'
                  >
                    <option value={"USD"}>USD</option>
                    <option value={"BTC"} disabled>
                      BTC
                    </option>
                  </select>
                </div>
                <div>
                  <h1 className='text-lg text-black'>Select Amount</h1>
                  <input
                    className='p-1 bg-gray-50 text-black border rounded select-info w-full'
                    placeholder='Input Amount'
                    required
                    type='number'
                    min={10}
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                  />
                </div>

                <small className='text-red-400'>
                  Minimum deposit amount is $10
                </small>

                <div>
                  <label className='cursor-pointer label flex gap-2 justify-start items-center '>
                    <input
                      type='checkbox'
                      className='checkbox checkbox-info'
                      required
                    />
                    <Link
                      href='/terms'
                      className='sm:text-lg  text-sm hover:underline hover:text-blue-600'
                    >
                      I agree to Terms and Conditions
                    </Link>
                  </label>
                </div>
                {loading ? (
                  <button className='px-10 bg-red-600 p-2 text-white font-bold rounded hover:bg-blue-400'>
                    Submitting...
                  </button>
                ) : (
                  <button className='px-10 bg-red-600 p-2 text-white font-bold rounded hover:bg-blue-400'>
                    Submit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default TestingRecharge;
