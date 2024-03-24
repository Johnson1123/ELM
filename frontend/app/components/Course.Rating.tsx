import React, { FC } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

type Props = {
  rating: number;
};

const CourseRating: FC<Props> = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <AiFillStar
          className="mr-2 cursor-pointer"
          key={i}
          color="#f6b100"
          size={20}
        />
      );
    } else if (i == Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <BsStarHalf
          className="mr-2 cursor-pointer"
          key={i}
          color="#f6b100"
          size={20}
        />
      );
    } else {
      stars.push(
        <AiOutlineStar
          className="mr-2 cursor-pointer"
          key={i}
          color="#f6b100"
          size={20}
        />
      );
    }
  }
  return (
    <div className="flex mt-2 ml-1 ">{stars.map((star, index) => star)}</div>
  );
};

export default CourseRating;
