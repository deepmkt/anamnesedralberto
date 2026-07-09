import Script from "next/script";
import { Suspense } from "react";
import PixelPageView from "./PixelPageView";
import "./globals.css";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1699926681212647";

export const metadata = {
  title: "Descubra Seu Nível de Preparo para o Parto | Dr. Alberto Guimarães",
  description:
    "Teste gratuito de 2 minutos criado pelo Dr. Alberto Guimarães, obstetra com mais de 3.000 partos. Descubra o que falta para você chegar preparada no dia do parto.",
  openGraph: {
    title: "Descubra Seu Nível de Preparo para o Parto",
    description: "Teste gratuito de 2 minutos. Resultado na hora.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FAF5F0",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-cream text-ink font-sans antialiased">
        {PIXEL_ID && (
          <>
            <Script id="fb-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window,document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${PIXEL_ID}');
              `}
            </Script>
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                alt=""
                src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
              />
            </noscript>
            <Suspense fallback={null}>
              <PixelPageView />
            </Suspense>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
