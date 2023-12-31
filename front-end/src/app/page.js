"use client";
import Head from "next/head";
import { useEffect } from "react";
import SignIn from "./auth/sign-in/page";
import EmployeeListing from "./employee-listing/page";

export default function Home() {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;700&display=swap"
        />
      </Head>
      {typeof window !== "undefined" && localStorage.getItem("token") ? <EmployeeListing /> : <SignIn />}
    </>
  );
}
