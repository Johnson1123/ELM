import CourseRating from "@/app/components/Course.Rating";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import VideoPlayer from "@/utils/Video.Player";
import { useSelector } from "react-redux";
import { btnPrimary } from "@/utils/style";
import Coursecontent from "./course.content";
import { Elements } from "@stripe/react-stripe-js";
import { Close } from "@/asset/Icons";
import {
  useCreatePaymentMutation,
  useGetPublishableKeyQuery,
} from "@/redux/features/slice/order";

import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./Checkout.Form";
import { useLoadUserQuery } from "@/redux/features/api/api.slice";

type Props = {
  course: any;
};

type itemProps = {
  title: string;
  _id: string;
};

const Coursedetails: FC<Props> = ({ course }) => {
  const { data: user } = useLoadUserQuery({});
  const percentagePrice =
    ((course.estimatedPrice - course.price) / course.estimatedPrice) * 100;
  const [openPayment, setOpenPayment] = useState(false);
  const { data: publishableKey } = useGetPublishableKeyQuery({});
  const [createPayment, { data: intentsData }] = useCreatePaymentMutation();
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState<string>("");

  const percentage = Math.floor(percentagePrice);

  const isPurchase =
    user && user?.data.courses.find((item: any) => item !== course._id);
  useEffect(() => {
    if (publishableKey) {
      const pKey: string = publishableKey.publishablekey;
      setStripePromise(loadStripe(pKey));
    }
    if (course) {
      const amount = Math.round(course.price * 100);
      createPayment(amount);
    }
  }, [course, publishableKey]);

  useEffect(() => {
    if (intentsData) {
      setClientSecret(intentsData.client_secret);
    }
  }, [intentsData]);

  const handleOpenPayment = () => {
    setOpenPayment(true);
  };
  return (
    <div className="w-[95%] md:w-[75%] mx-auto justify-between">
      <div className="w-full flex flex-col-reverse md:flex-row">
        <div className="w-full md:w-[65%]">
          <div className="py-5 text-[20px] font-semibold">{course?.name}</div>
          <div className="flex gap-2 items-center">
            <CourseRating rating={4.3} />
            <p className="mt-1">{`${course.review.length} Review`}</p>
          </div>
          <div className="mt-5">
            <p className="text-[20px] py-3 ">Take Home from this course</p>
            <div className="">
              {course.benefits.map((item: itemProps, index: number) => {
                return (
                  <div key={index} className="flex items-center gap-4 my-2">
                    <IoCheckmarkDoneOutline />
                    <p>{item.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-5">
            <p className="text-[20px] py-3">Take Home from this course</p>
            <div className="">
              {course.benefits.map((item: itemProps, index: number) => {
                return (
                  <div key={index} className="flex items-center gap-4 my-2">
                    <IoCheckmarkDoneOutline />
                    <p>{item.title}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-[20px] py-3">
            <h4>Course Content</h4>
            <Coursecontent courseData={course.courseData} />
          </div>
          <div className="mt-5">
            <p className="text-[20px] py-3">Course Overview</p>
            <p className="">{course.description}</p>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <p className="text-[20px] mt-3">Support IconiumTech</p>
            <p className="">
              <span>Buy Me</span>: <Link href={"/"}>buymecoffe</Link>
            </p>
            <p className="">
              <span>Sponsorship: </span>:{" "}
              <Link href={"/"}>Support Contact</Link>
            </p>
            <p className="">
              <span>Pathnership:</span>: <Link href={"/"}>Contact Support</Link>
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[20px] mt-3">Content Me</p>
            <p className="">
              <span>Buy Me</span>: <Link href={"/"}>buymecoffe</Link>
            </p>
            <p className="">
              <span>Sponsorship: </span>:{" "}
              <Link href={"/"}>Support Contact</Link>
            </p>
            <p className="">
              <span>Pathnership:</span>: <Link href={"/"}>Contact Support</Link>
            </p>
          </div>
        </div>
        <div className="w-full md:w-[35%]">
          <div className="w-[100%]">
            <VideoPlayer videoUrl={course?.demoUrl} title={course?.title} />
            <div className="mt-7 flex">
              <p className="text-[18px]">
                {`$${course.price} `}

                <sup className="ml-1">
                  <del>{course.estimatedPrice}$</del>
                </sup>
              </p>
              <p className="text-[16px] ml-4">{percentage}% off</p>
            </div>
            <div className="mt-5">
              {isPurchase ? (
                <>
                  <Link
                    className={`${btnPrimary} hover:text-slate-700`}
                    href={`/course/access/${course._id}`}
                  >
                    Go to course
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    className={`${btnPrimary} hover:text-red-500`}
                    href=""
                    onClick={handleOpenPayment}
                  >
                    Buy Course {`$${course.price}`}
                  </Link>
                </>
              )}
            </div>
            <div className="">
              <div className="flex items-center gap-4 my-2">
                <IoCheckmarkDoneOutline />
                <p>Source Code</p>
              </div>
              <div className="flex items-center gap-4 my-2">
                <IoCheckmarkDoneOutline />
                <p>Lifetime Access to the course</p>
              </div>
              <div className="flex items-center gap-4 my-2">
                <IoCheckmarkDoneOutline />
                <p>Cash Back</p>
              </div>
              <div className="flex items-center gap-4 my-2">
                <IoCheckmarkDoneOutline />
                <p>Premium Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <>
        {openPayment && stripePromise && (
          <div className="h-full w-[100%] fixed top-0 left-0 z-50 bg-[#00000034] flex justify-center items-center">
            <div
              className="w-[50%] h-[500px] bg-white rounded-md shadow-lg p-5 relative"
              style={{ height: 400 }}
            >
              <div
                className="absolute top-2 cursor-pointer"
                onClick={() => setOpenPayment(false)}
                style={{ right: 12, top: 8 }}
              >
                <Close size={25} color={"#111"} />
              </div>
              <div className="">
                {stripePromise && clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm data={course} />
                  </Elements>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default Coursedetails;
