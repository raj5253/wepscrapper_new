const cloudinary = require("cloudinary").v2;

const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

async function uploadImg(allImgLinks, mainurl) {
  // Configuration
  cloudinary.config({
    cloud_name: "ddgpjpaub",
    api_key: "532171226851372",
    api_secret: "zjY3t-B4HjZiQ362mKfHReTXAOo",
  });

  // Upload
  const allImgCloudLinks = await Promise.all(
    allImgLinks.map((item, idx) => {
      return cloudinary.uploader
        .upload(item, {
          folder: "rajtrial",
          resource_type: "image",
        })
        .then((data) => {
          return data.secure_url;
        })
        .catch((err) => {
          console.log("error in cloudinary ", err);
        });
    })
  );

  return allImgCloudLinks; //return securelinks of  present in cloud
}

export default async function extractpic(req, res) {
  if (req.method === "POST") {
    try {
      // const url = "https://www.formula1.com/en.drivers.html";
      const { enteredUrl } = req.body;

      console.log(req.body);
      const url = enteredUrl;
      let comi = url.lastIndexOf(".com") + 4;
      const mainurl = url.substring(0, comi); //the main url

      //puppeteer
      const browser = await puppeteer.launch({
        args: ["--disable-web-security"],
      });
      const page = await browser.newPage();
      await page.goto(url);
      await page.setDefaultNavigationTimeout(50000); //50 sec

      await page.waitForSelector("img"); //wait till they load

      const imgSrcs = await page.$$eval("img", (imgs) =>
        imgs.map((img) => img.getAttribute("src"))
      );
      await browser.close();

      //   modifying the links
      let allImgLinks = [];

      imgSrcs.forEach((link) => {
        let imgsrc = link;
        if (link) {
          if (imgsrc.match(/^\//)) {
            //if starts with "/" not https
            const newimgsrc = mainurl + "/" + imgsrc;
            allImgLinks.push(newimgsrc);
          } else {
            // when start with https:
            allImgLinks.push(imgsrc);
          }
        }
      });

      const allImgCloudLinks = await uploadImg(allImgLinks, mainurl);

      // console.log(allImgCloudLinks);
      res.json({ allImgCloudLinks: allImgCloudLinks });
    } catch (error) {
      res.json({ msg: "error in extractpic" });
      console.error("error in extractpic.js", error);
    }
  }
}
