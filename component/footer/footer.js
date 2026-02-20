import React, { useEffect, useState } from "react";
import style from "../../styles/moduleCss/footer.module.css";
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillInstagram,
} from "react-icons/ai";
import { BsPinterest, BsYoutube } from "react-icons/bs";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import Link from "next/link";

const Footer = () => {
  const [user, setUser] = useState();

  const usersStringfy = Cookies.get("token");
  useEffect(() => {
    if (usersStringfy) {
      const user = jwt_decode(usersStringfy);
      setUser(user);
    }
  }, []);

  return (
    <div>
      <footer className='main-footer'>
        <div className={style.container}>
          <ul className={style.footer}>
            <li className={style.item}>
              <Link href='/' className='link text-uppercase' title='Home'>
                Home
              </Link>
            </li>
            <li className={style.item}>
              <Link
                href='/about-us'
                className='link text-uppercase'
                title='About us'
              >
                About us
              </Link>
            </li>
            {user?._id && (
              <li className={style.item}>
                <Link
                  href={`/recharge-credits/`}
                  className='link text-uppercase'
                  title='Buy Credit'
                >
                  Buy Credit
                </Link>
              </li>
            )}

            <li className={style.item}>
              <Link
                href='/contact-us'
                className='link text-uppercase'
                title='Contact'
              >
                Contact
              </Link>
            </li>
            <li className={style.item}>
              <Link href='/blogs' className='link text-uppercase' title='Blogs'>
                Blogs
              </Link>
            </li>
            <li className={style.item}>
              <Link
                href='/privacy-policy'
                className='link text-uppercase'
                title='Privacy'
              >
                Privacy
              </Link>
            </li>
            <li className={style.item}>
              <Link href='/terms' className='link text-uppercase' title='Terms'>
                Terms
              </Link>
            </li>
          </ul>
          <ul className={style.footer}>
            <li className={style.item}>
              <Link href={"/skip-the-games"}>Skip the Games</Link>
            </li>
            <li className={style.item}>
              <Link href={"/female-escort"}>Female Escort</Link>
            </li>
            <li className={style.item}>
              <Link href={"/tryst-san-antonio-escorts"}>
                Tryst San Antonio escorts
              </Link>
            </li>
            <li className={style.item}>
              <Link href={"/skipthe-games"}>Skipthe Games</Link>
            </li>
            <li className={style.item}>
              <Link href={"/skip-yhe-games"}>Skip Yhe Games</Link>
            </li>
            <li className={style.item}>
              <Link href={"#"}>Akip The Games</Link>
            </li>
            <li className={style.item}>
              <Link href={"/tescorts"}>Tescorts</Link>
            </li>
            <li className={style.item}>
              <Link href={"/skip-the-games-wv"}>Skip The Games wv</Link>
            </li>
            <li className={style.item}>
              <Link href={"/skip-the-games-hudson-valley"}>
                Skip The Games Hudson Valley
              </Link>
            </li>
            <li className={style.item}>
              <Link href={"/skip-the-games-worcester"}>
                Skip The Games Worcester
              </Link>
            </li>
            <li className={style.item}>
              <Link href={"/skip-the-games-cape-cod"}>
                Skip The Games Cape cod
              </Link>
            </li>
          </ul>
          <br />
          <br />
          <br />
          <br />
          <ul className={style.footer}>
            {/* <li className={style.item}>
              <Link
                href="https://www.youtube.com/channel/UC8vWO9MILlY-Sv9ezGaB6WQ"
                target={"_blank"}
                rel="noopener noreferrer"
                className="link text-uppercase"
                title="Youtube"
              >
                <BsYoutube className={style.insta} />
              </Link>
            </li> */}
            <li className={style.item}>
              <Link
                href='https://www.facebook.com/profile.php?id=100091135910066'
                target={"_blank"}
                rel='noopener noreferrer'
                className='link text-uppercase'
                title='Facebook'
              >
                <AiFillFacebook className={style.facebook} />
              </Link>
            </li>
            <li className={style.item}>
              <Link
                href='https://www.instagram.com/adbacklist/'
                target={"_blank"}
                rel='noopener noreferrer'
                className='link text-uppercase'
                title='Instagram'
              >
                <AiFillInstagram className={style.insta} />
              </Link>
            </li>
            <li className={style.item}>
              <Link
                href='https://twitter.com/Adbacklist'
                target={"_blank"}
                rel='noopener noreferrer'
                className='link text-uppercase'
                title='Twitter'
              >
                <AiFillTwitterSquare className={style.facebook} />
              </Link>
            </li>

            <li className={style.item}>
              <Link
                href='https://www.pinterest.com/adbacklist/'
                target={"_blank"}
                rel='noopener noreferrer'
                className='link text-uppercase'
                title='Pinterest'
              >
                <BsPinterest className={style.insta} />
              </Link>
            </li>
          </ul>
        </div>
      </footer>
      <p className='text-center mt-8'>Copyright © 2009 - 2024 </p>
    </div>
  );
};

export default Footer;
