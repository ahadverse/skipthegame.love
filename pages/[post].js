import { findMeta } from "@/component/categorymeta";
import { findCityMeta } from "@/component/cityMeta";
import Footer from "@/component/footer/footer";
import Gallery from "@/component/gallery/gallery";
import Header from "@/component/header/header";
import List from "@/component/list/list";
import OnlyTextList from "@/component/onlyTextList/OnlyTextList";
import { Pagination } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const myLink = process.env.NEXT_PUBLIC_OFFERLINK;

const PostList = () => {
  const router = useRouter();
  const [layout, setLayout] = useState("list");
  const [freeCityPost, setFreeCityPost] = useState([]);
  const [premiumCityPost, setPremiumCityPost] = useState([]);
  const [page, setPage] = useState(1);
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(true);
  const [gallery, setGallery] = useState([]);
  const [links, setLinks] = useState();
  const [age, setAge] = useState("");
  const [category, setCategory] = useState("Adult Jobs");
  const [reload, setReload] = useState(false);

  async function getPosts() {
    try {
      const response = await axios.get(
        `https://skipthegame-love-backend.vercel.app/api/products/all?page=${current}&category=${category}&state=${router?.query?.post}`,
      );

      // let userGroup = Cookies.get("userGroup");
      // if (!userGroup) {
      //   userGroup = Math.random() < 0.7 ? "0" : "1";
      //   Cookies.set("userGroup", userGroup);
      // }

      // if (userGroup === "0") {
      //   setLinks({
      //     shemale: myLink,
      //     meet: myLink,
      //     live: myLink,
      //   });
      // } else {
      //   setLinks(response.data.links?.[0]);
      // }
      setLinks(response.data.links?.[0]);
      setPage(response.data.pages);
      setGallery(response.data.data.products);
      const premiumPost = response.data.data.products?.filter(
        (a) => a.isPremium == true,
      );
      setPremiumCityPost(premiumPost);
      const freePost = response.data.data.products?.filter(
        (a) => a.isPremium == false,
      );
      setFreeCityPost(freePost);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setPage(0);
      setGallery([]);
      setPremiumCityPost([]);
      setFreeCityPost([]);
    }
  }

  function groupByDate(objects) {
    const groupedByDate = {};
    objects.forEach((obj) => {
      const date = new Date(obj.createdAt).toDateString();
      if (!groupedByDate[date]) {
        groupedByDate[date] = [];
      }
      groupedByDate[date].push(obj);
    });

    return Object.entries(groupedByDate).map(([date, objects]) => ({
      date,
      objects,
    }));
  }
  const groupedData = groupByDate(freeCityPost);
  const groupedData2 = groupByDate(premiumCityPost);
  useEffect(() => {
    setLoading(true);
    if (!router?.query?.post) {
      return;
    } else {
      getPosts();
    }
  }, [router?.query?.post, current, reload, category]);

  const onChange = (pageNumber) => {
    setCurrent(pageNumber);
  };

  let content;
  if (layout == "list") {
    content = (
      <List data1={groupedData} data2={groupedData2} category={category} />
    );
  }
  if (layout == "text") {
    content = (
      <OnlyTextList
        data1={groupedData}
        data2={groupedData2}
        category={category}
      />
    );
  }
  if (layout == "gallery") {
    content = <Gallery data1={gallery} category={category} />;
  }

  const setAdult = (e) => {
    Cookies.set("age", e);
    setReload(!reload);
  };

  useEffect(() => {
    const useOld = Cookies.get("age");
    setAge(useOld);
  }, [reload]);

  const meta = findCityMeta({
    city: router?.query?.post,
    state: router?.query?.state,
  });

  const catChange = (e) => {
    setCategory(e);
  };

  return (
    <div className='bg-gray-200'>
      <Head>
        <title>{meta?.title}</title>
        <link rel='icon' href='/logo.png' />
        <meta name='title' content={`${meta?.title}`} />
        <meta name='description' content={`${meta?.description}`} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='keywords' content={`${meta?.keywords}`} />
        <link
          name='canonical'
          rel='canonical'
          href={`https://skipthegames.love${router?.asPath}`}
        />{" "}
        <meta name='robots' content='index,follow' />
      </Head>
      <Header />
      <div>
        {links ? (
          <div className='flex justify-around bg-white sm:text-xl text-sm p-2 text-blue-600'>
            <Link
              target='_blank'
              rel='noopener noreferrer'
              href={`${links?.shemale}`}
            >
              Shemale Escorts
            </Link>{" "}
            <Link
              target='_blank'
              rel='noopener noreferrer'
              href={`${links?.meet}`}
            >
              Meet & Fuck
            </Link>{" "}
            <Link
              target='_blank'
              rel='noopener noreferrer'
              href={`${links?.live}`}
            >
              Live Escorts
            </Link>{" "}
          </div>
        ) : (
          <div className='flex justify-around text-xl p-2 text-blue-600'>
            <Link href={`#`}>Shemale Escorts</Link>{" "}
            <Link href={`#`}>Meet & Fuck</Link>{" "}
            <Link href={`#`}>Live Escorts</Link>{" "}
          </div>
        )}
      </div>
      <div className='w-[300px] gap-5 flex m-auto my-3'>
        <button
          className={`border-cyan-500 px-3 text-black border-2 ${
            layout == "list" ? "bg-cyan-500 text-white font-bold" : ""
          }`}
          onClick={() => setLayout("list")}
        >
          Ads List
        </button>
        <button
          className={`border-cyan-500 px-3 text-black border-2 ${
            layout == "text" ? "bg-cyan-500 text-white font-bold" : ""
          }`}
          onClick={() => setLayout("text")}
        >
          Only Text
        </button>
        <button
          className={`border-cyan-500 px-3 text-black border-2 ${
            layout == "gallery" ? "bg-cyan-500 text-white font-bold" : ""
          }`}
          onClick={() => setLayout("gallery")}
        >
          Gallery
        </button>
      </div>

      {loading ? (
        <div
          style={{ height: "700px" }}
          className='flex justify-center items-center'
        >
          <img
            className=''
            width={100}
            src='/loader.gif'
            alt='skipthegames.love'
          />
        </div>
      ) : (
        <div className='sm:w-9/12 m-auto my-5 bg-white p-3 rounded text-black'>
          {age == undefined ? (
            <div className=''>
              <h1 className='text-3xl font-bold'>Disclaimer</h1>
              <p className='text-xl'>
                This section contains sexual containt.including pictorial nudity
                adult language. It is to be accessed only by persons who are 21
                years of age or older (and is not considered to be a minor in
                his/her state of residence) and who live in a community or local
                jurisdiction where nude pictures and explicit adult materials
                are not prohibited by law. By accessing this website, you are
                representing to us that you meet the above qualifications.
              </p>
              <div>
                <button
                  className='bg-green-600 text-white px-3 py-2 mt-5'
                  onClick={() => setAdult("Adult")}
                >
                  I am over 18
                </button>
                <Link href={"/"}>
                  <button className='bg-red-600 ml-5 text-white px-3 py-2 mt-5'>
                    Exit
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <ul className='flex gap-2 justify-between sm:flex-row flex-col mb-5'>
                <div className='flex gap-2'>
                  <li className='hover:text-blue-600'>
                    <Link href={`/`}>Home</Link>
                  </li>
                  &#62;
                  <li className='hover:text-blue-600'>
                    <Link href={`/${router?.query?.post}`}>
                      {router?.query?.post}
                    </Link>
                  </li>
                  &#62;
                  <li className='hover:text-blue-600 font-bold'>
                    {category ?? "Adult"}
                  </li>
                  &#62;
                  <li className='hover:text-blue-600 font-bold'>
                    {router?.query?.names?.[2]} ({page} results)
                  </li>
                </div>
                <div>
                  <select
                    onChange={(e) => catChange(e.target.value)}
                    className='border border-green-500'
                  >
                    {category ? (
                      <option>{category}</option>
                    ) : (
                      <option>-- Select Category --</option>
                    )}
                    <option value='Adult Jobs'>Adult Jobs</option>
                    <option value={"Bodyrubs"}>Bodyrubs</option>
                    <option value={"Dom-Fetish"}>Dom-Fetish</option>
                    <option value={"Female Escorts"}>Female Escorts</option>
                    <option value={"Male Escorts"}>Male Escorts</option>
                    <option value={"Strip Clubs"}>Strip Clubs</option>
                    <option value={"Sugar Babies"}>Sugar Babies</option>
                    <option value={"Women-Men"}>Women to Men</option>
                    <option value={"Men-Men"}>Men to Men</option>
                    <option value={"Men-Women"}>Men to Women</option>
                    <option value={"Transgender"}> Transgender</option>
                    <option value={"Women-Women"}>Women to Women</option>
                    <option value={"Hookup Tonight"}>Hookup Tonight</option>
                  </select>
                </div>
              </ul>
              {content}
              <div className='mt-10 m-auto'>
                <Pagination
                  showSizeChanger={false}
                  pageSize={35}
                  defaultCurrent={current}
                  onChange={onChange}
                  total={page}
                />
              </div>
            </>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PostList;
