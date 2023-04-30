import clientPromise from "@/lib/mongo/mongocon";
import { storeToDB } from "@/utils/dbfucn";
import {
  getEmails,
  getHiddenLinks,
  getMetaWordCount,
  getTitleWordCount,
  getfavicon,
  homeWordCount,
} from "@/utils/extractdata";
import axios from "axios";
import * as cheerio from "cheerio";
import extractpic from "./extractpic";
// import fetch from "node-fetch";

export default async function scrap(req, res) {
  if (req.method === "POST") {
    try {
      // const enteredUrl = "https://www.formula1.com/en.drivers.html";
      const { enteredUrl } = req.body;

      const response = await fetch(enteredUrl);
      const data = await response.text();

      // const response = await axios.get(enteredUrl);
      // const data = response.data;
      // console.log(data);

      const links = getHiddenLinks(data);

      const { words, homecount } = homeWordCount(data);

      const { emailsCout, contactnumCount } = getEmails(data);

      const titleCount = getTitleWordCount(data);

      const favicoLink = getfavicon(data);

      const metaCount = getMetaWordCount(data);

      await storeToDB(words); //storing to mongodb atlas

      // console.log(enteredUrl);
      const resp = await fetch("https://wepscrapper-new.vercel.app/api/extractpic", {
        method: "POST",
        body: JSON.stringify({ enteredUrl: enteredUrl }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const datajs = await resp.json();
      // console.log(datajs);
      const { allImgCloudLinks } = datajs;
      console.log(allImgCloudLinks);

      res.json({
        msg: "done",
        homecount: homecount,
        titleCount: titleCount,
        metaCount: metaCount,
        emails: emailsCout,
        contactnumCount: contactnumCount,
        favicoLink: favicoLink,
        allImgCloudLinks: allImgCloudLinks,
      });
    } catch (error) {
      // console.log(error.code);
      res.json({ msg: "error in scrap" });
      console.error("error in scrap.js", error);
    }
  }
}

//took 30s to complete call to api call of scrap.js
