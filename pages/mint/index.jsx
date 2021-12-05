import ToggleMode from "../../src/components/toggleMode";
import Uploader from "/src/components/uploader";

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
      <div>
        <ToggleMode />
      </div>
      <div className="WTF">
        <Uploader />
      </div>
    </>
  );
};

export default index;
