import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Responsive = () => {
  const [loading, setLoading] = useState(true);
  const [ads, setAds] = useState({});

  async function getads() {
    try {
      const response = await axios.get(
        `https://skipthegame-love-backend.vercel.app/api/responsive-ads/`,
        {
          method: "GET",
        },
      );
      setLoading(false);
      setAds(response?.data?.response?.links);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  useEffect(() => {
    setLoading(true);
    getads();
  }, []);

  return (
    <div className='my-5'>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <Link href={ads?.link ?? "/"}>
            <img className='sm:w-[600px]  m-auto mt-10' src={ads?.image} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Responsive;
