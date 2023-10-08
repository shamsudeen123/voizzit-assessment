"use client";
import Head from "next/head";
import { useEffect } from "react";
import SignIn from "./auth/sign-in/page";
import EmployeeListing from "./employee-listing/page";

export default function Home() {
  // useEffect(() => {
  //   localStorage.getItem('token') ? window.location.href = "/employee-listing" : window.location.href = "/"
  // }, [])

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;700&display=swap"
        />
      </Head>
      {localStorage.getItem("token") ? <EmployeeListing /> : <SignIn />}
    </>
  );
}
