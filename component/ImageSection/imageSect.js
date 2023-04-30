import Image from "next/image";

const ImageSect = (props) => {
  const { allImgCloudLinks } = props;
  return (
    <div>
      <h2>All images - links are from cloudinary</h2>
      {allImgCloudLinks && (
        <div>
          {allImgCloudLinks.map((imglink, idx) => {
            return <Image width={100} height={100} key={idx} src={imglink} />;
          })}
        </div>
      )}
    </div>
  );
};

export default ImageSect;
