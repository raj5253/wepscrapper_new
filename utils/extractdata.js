// to extract the text img from the given url
//func to extract the info and return it
import * as cheerio from "cheerio";
import { Nothing_You_Could_Do, Tilt_Neon } from "next/font/google";

export function getHiddenLinks(data) {
  const $ = cheerio.load(data);

  const links = [];
  $("a , Link").each((idx, link) => {
    const href = $(link).attr("href"); //getting attribute val
    if (href && (href.startsWith("/") || href.startsWith("http")))
      links.push(href);
  });

  //   window.document = body;
  //   console.log(window.document);

  return links;
}

export function homeWordCount(data) {
  const $ = cheerio.load(data);

  const bodytxt = $("body").text();
  const words = bodytxt.split(/\s+/);

 
  let len = 0;
  words !== null ? (len = words.length) : (len = 0);
  return { words, len };
}

export function getEmails(data) {
  //   $("email, emails").each((idx, ele) => {}); //no need of cherio

  let emailsCout;
  let contactnumCount;

  const emli = data.match(
    /([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
  );

  const contactnum = data.match(/^[0]?[789]\d{9}$/gi);

  if (emli) {
    emailsCout = emli.length;
  } else {
    //null
    emailsCout = 0; //"No emails found";
  }

  if (contactnum) {
    contactnumCount = contactnum.length;
  } else {
    contactnumCount = 0;
  }

  return { emailsCout, contactnumCount };
}

export function getMetaWordCount(data) {
  const $ = cheerio.load(data);

  let count = 0;

  $("meta").each((idx, ele) => {
    const innerTxt = $(ele).text();
    const words = innerTxt.split(/\s+/);
    count += words.length;
  });

  return count;
}

export function getTitleWordCount(data) {
  const $ = cheerio.load(data);

  const titxt = $("title").text();
  const words = titxt.split(/\s+/);

  return words.length != 0 ? words.length : 0;
}

export function getfavicon(data) {
  const $ = cheerio.load(data);
  const favico = $('link[rel~="icon"]').attr("href");
  if (favico) {
    return favico;
  } else {
    return "could not find favicon";
  }
}
