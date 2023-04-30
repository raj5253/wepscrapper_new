import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import ImageSect from "../ImageSection/imageSect";

import styles from "./inputcomp.module.css";

const Inputcomp = () => {
  const [urlentered, setUrlentered] = useState("");
  const [extdata, setExtdata] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [gotData, setGotData] = useState(false);

  // const [initial, setInitial] = useState(true);

  const handleonChangeurl = (e) => {
    setUrlentered(e.target.value);
  };

  const handleOnClick = async (e) => {
    console.log("btn clicked", urlentered);
    e.preventDefault();
    // setInitial(false);
    setIsLoading(true);
    setGotData(false);

    if (urlentered) {
      try {
        const response = await fetch("/api/scrap", {
          method: "POST",
          body: JSON.stringify({
            enteredUrl: urlentered,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const respdata = await response.json(); //i left await here.

        // setExtdata(respdata.msg);

        setExtdata(respdata);

        setIsLoading(false);
        setGotData(true);

        console.log(respdata);
      } catch (error) {
        console.log("error in fetching from /api/scrap ", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <input
          type="text"
          className={styles.urlholder}
          name="enteredurl"
          id="enteredurl"
          placeholder="Enter the url"
          onChange={handleonChangeurl}
        />
        <button className={styles.button66} onClick={handleOnClick}>
          Extract
        </button>
      </div>

      <div>
        {isLoading && (
          <div>
            <h2 className={styles.loading}>... Loading! please wait.</h2>
          </div>
        )}
        {gotData && (
          <div className={styles.content}>
            <h2 className={styles.heading}>Extracted data</h2>
            <h2>Number of words in Home page : {extdata.homecount}</h2>
            <h2>Number of words in tile tag : {extdata.titleCount}</h2>
            <h2>Number of words in meta tags: {extdata.metaCount}</h2>
            <h2>Number of email: {extdata.emails}</h2>
            <h2>Total contact found : {extdata.contactnumCount}</h2>
            <div>
              <h2 className={styles.favico}>Favicon : </h2>
              <Image
                width={25}
                height={25}
                src={extdata.favicoLink}
                alt="favicon"
              />
            </div>
            <ImageSect allImgCloudLinks={extdata.allImgCloudLinks} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Inputcomp;
