import React, { useEffect, useState } from "react";
import Small from "./Small.circle";
import { btnPrimary, darkBg } from "@/utils/style";
import NextIcon from "./Animation/NextIcon";
import FaceIcon from "./Animation/FaceIcon";
import BooksICon from "./Animation/Books";
import HeroMan from "./Animation/Hero.Man";
import { useGetLayoutQuery } from "@/redux/features/slice/layout";
import Loading from "@/utils/Loading/Loading";
import { useSelector } from "react-redux";

type Props = {};

const Hero = (props: Props) => {
  const [layout, setLayout] = useState<any>();
  const user = useSelector((state: any) => state.auth.user);
  console.log(user);
  const { data, isLoading } = useGetLayoutQuery("Banner");

  useEffect(() => {
    if (data) {
      setLayout(data.data.banner);
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div
          className={`w-full mt-[80px] ${darkBg} relative`}
          style={{ height: "calc(100vh - 80px)" }}
        >
          <div className="h-full hero-container flex flex-col md:flex-row w-[95%] md:w-[75%] mx-auto">
            <div className="w-[95%] md:w-[40%] h-auto md:h-full">
              <div className="flex flex-col justify-center items-center md:items-start md:h-full mt-5">
                <h3 className="font-Poppins text-2xl text-center md:text-left md:text-3xl font-[900] leading-[1.6] md:leading-[1.7]">
                  {/* Learn Anywhere <br />
              Anytime Time and Season <br />
              At your own Schelude */}
                  {layout?.title}
                </h3>
                <p className="text-[14px] font-Poppins font-[300] mt-5 md:w-[300px]">
                  {/* Online learning is not just Awesome <br /> but also A great way to
              learn */}
                  {layout?.subTitle}
                </p>
                <button className={`mt-7 w-[150px] ${btnPrimary}`}>
                  Get Started
                </button>
              </div>
            </div>
            <div className="w-[92%] h-full md:w-[60%] relative">
              <NextIcon />
              <FaceIcon />
              <BooksICon />
              <HeroMan url={layout?.image.url} />
            </div>
          </div>
          {/* .content-container {
  height: calc(100vh - theme('spacing.7'));
} */}
          <Small />
        </div>
      )}
    </>
  );
};
export default Hero;
