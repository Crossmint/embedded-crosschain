import Image from "next/image";

const CollectionInfo: React.FC = () => {
  return (
    <>
      <Image
        src="/collection-image.jpg"
        width={500}
        height={500}
        className="rounded-lg shrink"
        alt="nft collection image"
        priority={true}
      />
    </>
  );
};

export default CollectionInfo;
