import React from "react";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";

interface Props {
  faq: { question: string; answer: string };
  index: number;
  active: number;
  setActive: (active: number) => void;
}

function HomeFaqCard({ faq, index, active, setActive }: Props) {
  const handleOpen = (number: number, index: number) => {
    if (number !== index) {
      setActive(index);
    } else {
      setActive(-1);
    }
  };
  return (
    <>
      <div className="flex justify-between py-4 items-center">
        <p className="text-[20px] font-bold">{faq.question}</p>
        <div
          className="cursor-pointer"
          onClick={() => handleOpen(active, index)}
        >
          {active !== index ? <FaPlus /> : <FiMinus />}
        </div>
      </div>
      {index != active ? null : (
        <div className="content md:w-[60%] ml-5  mb-3 mt-2 text-[18px]">
          {faq.answer}
        </div>
      )}
    </>
  );
}

export default HomeFaqCard;
