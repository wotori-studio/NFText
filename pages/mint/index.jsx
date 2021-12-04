import Uploader from "./interface";

const index = () => {
  return (
    <>
      <style jsx>
        {`
          .WTF {
            margin: 50px;
          }
        `}
      </style>
      <div className="WTF">
        <Uploader />
      </div>
    </>
  );
};

export default index;
