import ToggleMode from "../../src/components/toggleMode";
import Uploader from "/src/components/uploader";

const index = () => {
  /* TODO: import style as modules https://nextjs.org/blog/styling-next-with-styled-jsx */
  return (
    <>
      <style jsx>
        {`
          .div-pad {
            padding-top: 100px;
            padding-left: 550px;
            padding-right: 550px;
          }
          .div-pad-bot {
            padding-bottom: 50px;
          }
        `}
      </style>
      <div className="div-pad">
        <div className="div-pad-bot">
          <ToggleMode />
        </div>
        <Uploader />
      </div>
    </>
  );
};

export default index;
