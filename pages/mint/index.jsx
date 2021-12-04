import Uploader from "./interface";

const index = () => {
  /* TODO: import style as modules https://nextjs.org/blog/styling-next-with-styled-jsx */
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
