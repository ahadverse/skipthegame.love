import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";
import { createContext, useState } from "react";
import "react-quill/dist/quill.snow.css";

export const MyContext = createContext();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [blogcurrent, setBlogCurrent] = useState(1);
  const [catKey, setCatKey] = useState("");

  return (
    <SessionProvider session={session}>
      <MyContext.Provider
        value={{ blogcurrent, setBlogCurrent, catKey, setCatKey }}
      >
        <Component {...pageProps} />
      </MyContext.Provider>
    </SessionProvider>
  );
}
