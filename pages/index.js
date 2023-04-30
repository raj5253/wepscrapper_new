import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

import Inputcomp from "@/component/inputurl/inputcomp";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  { console.log(process.env.VERCEL_URL); }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <h1 className={styles.heading}>Web scrapping</h1>
          <div>
            <Inputcomp />
          </div>
        </div>
      </main>
    </div>
  );
}
