import { useGetLayoutQuery } from "@/redux/features/slice/layout";
import React, { useEffect, useState } from "react";
import HomeFaqCard from "./Home.FaqCard";
import { darkBg } from "@/utils/style";

function HomeFaq() {
  const { data } = useGetLayoutQuery("Faq", {});
  const [faq, setFaq] = useState<any[]>([]);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (data) {
      setFaq(data.data.faq);
    }
  }, [data]);
  return (
    <div
      className={`${darkBg} py-5 flex md:items-center  md:min-h-[80vh] flex-col`}
    >
      <h3 className="font-Poppins text-lg md:text-2xl font-[900] leading-[1.6] md:leading-[1.7] dark:text-white text-center my-5">
        Frequence Ask Question
      </h3>
      <div className="w-[92%] md:w-[75%] mx-auto py-10">
        {faq &&
          faq.length > 0 &&
          faq.map((item, index) => {
            return (
              <HomeFaqCard
                faq={item}
                setActive={setActive}
                active={active}
                index={index}
              />
            );
          })}
      </div>
    </div>
  );
}

export default HomeFaq;
