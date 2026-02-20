import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class WebDocument extends Document {
  render() {
    return (
      <Html lang='en-US'>
        <Head>
          <Script
            async
            src='https://www.googletagmanager.com/gtag/js?id=G-S5SPEY3G38'
            strategy='afterInteractive'
          />
          <Script id='google-analytics' strategy='afterInteractive'>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-S5SPEY3G38');
            `}
          </Script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default WebDocument;
