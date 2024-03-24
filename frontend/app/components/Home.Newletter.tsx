import { btnPrimary, darkBg } from "@/utils/style";
import React from "react";

type Props = {};

const HomeNewletter = (props: Props) => {
  return (
    <div className={`${darkBg} py-5 flex md:items-center  md:min-h-[50vh]`}>
      <div className="w-[92%] md:w-[75%] mx-auto">
        <h3 className="font-Poppins text-lg md:text-2xl font-[900] leading-[1.6] md:leading-[1.7] dark:text-white text-center my-5">
          Sign Up To Our Newsletter
        </h3>
        <p className="text-center mt-3 text-xl font-thin md:w-[50%] md:mt-5 md:mx-auto">
          Subscribe to our newsletter and get many interesting things every week
        </p>
        <div className="mt-3 flex-col items-center">
          <form
            action=""
            className="md:rounded-md md:gap-2 p-2 flex flex-col items-center md:flex-row md:w-[50%] md:justify-center md:mx-auto md:bg-white"
          >
            <input
              type="text"
              className="h-[55px] md:h-[55px] px-2 w-full mt-3 md:mt-0 rounded-lg focus:outline-none bg-[#f3f3f3]"
            />
            <button
              type="submit"
              className={`${btnPrimary} w-[150px] mt-3 md:h-[55px] md:mt-0 rounded-md`}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomeNewletter;
