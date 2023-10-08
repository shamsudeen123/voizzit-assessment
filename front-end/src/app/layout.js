"use client";
import SignIn from "./auth/sign-in/page";
import "./globals.css";
import Head from "next/head";

export default function RootLayout({ children }) {
  const currentURL = typeof window !== "undefined" && window.location.href;
  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("token");
  console.log(currentURL, "currentURL");

  return (
    <html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;700&display=swap"
        />
      </Head>
      <body>
        {!accessToken &&
        (currentURL === "http://localhost:3001/employee-listing" ||
          currentURL === "http://localhost:3001/add-employee") ? (
          <SignIn />
        ) : (
          <>{children}</>
        )}
      </body>
    </html>
  );
}
