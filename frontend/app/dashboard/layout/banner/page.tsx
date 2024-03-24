"use client";
import { btn, darkBg } from "@/utils/style";
import React, { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import style from "../../../../utils/style.module.css";
import {
  useGetLayoutQuery,
  useInsertLayoutMutation,
  usePutLayoutMutation,
} from "@/redux/features/slice/layout";
import toast from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

type Props = {};

const page = (props: Props) => {
  // const [formData, setFormData] = useState({
  //   image: "",
  //   title: "",
  //   subTitle: "",
  // });

  const [bannerImage, setBannerImage] = useState("");
  const [bannerTitle, setbannerTitle] = useState("");
  const [bannerSubTitle, setBannerSubTitle] = useState("");

  const handleFile = (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState == 2) {
          setBannerImage(reader.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const [putLayout, { isLoading, error, data, isSuccess }] =
    usePutLayoutMutation();

  const { data: bannerData, refetch } = useGetLayoutQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  const handleSubmit = async () => {
    if (
      bannerData.data.banner.image !== bannerImage ||
      bannerData.data.banner.title !== bannerTitle ||
      bannerData.data.banner.subTitle ||
      bannerSubTitle
    ) {
      await putLayout({
        type: "Banner",
        image: bannerImage,
        title: bannerTitle,
        subTitle: bannerSubTitle,
      });
    }
  };
  useEffect(() => {
    if (bannerData) {
      setBannerImage(bannerData?.data.banner.image.url);
      setbannerTitle(bannerData?.data.banner.title);
      setBannerSubTitle(bannerData?.data.banner.subTitle);
      // setFormData(bannerData.data.banner);
    }
    if (isSuccess) {
      refetch();
      const message = data.message || "Banner Layout Inserted successfully";
      toast.success(message);
    }
    if (error) {
      if ("data" in error) {
        const errData = error as any;
        toast.error(errData.data.message);
      }
    }
  }, [isSuccess, error, bannerData]);

  return (
    <div className={`${darkBg} w-full pb-5`}>
      <div className="mt-5 b w-[100%] md:w-[80%]">
        <p className="p-3 mx-3 font-bold text-lg">FAQ Layout</p>
        <div className="">
          <div className="flex flex-col lg:flex-row gap-5 justify-between">
            <div
              className={`${style.roundedImageShadow} h-[250px] w-[250px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] rounded-full bg-slate-800 flex justify-center items-center overflow-hidden p-2`}
            >
              <label htmlFor="image" className="h-full w-full">
                <img
                  src={bannerImage}
                  className="h-full w-full rounded-full object-contain"
                />

                {/* <FiUser /> */}
              </label>
              <input
                type="file"
                name=""
                id="image"
                hidden
                onChange={(e) => handleFile(e)}
              />
            </div>
            <div className="flex flex-col w-50% gap-4">
              <label htmlFor="title"></label>
              <textarea
                rows={4}
                id="title"
                name="title"
                className="focus:outline-none resize-none bg-transparent md:!w-[75%]  mt-7 text-4xl no-scrollbar text-bold"
                value={bannerTitle}
                onChange={(e: any) => setbannerTitle(e.target.value)}
                autoFocus
              ></textarea>
              <div className="">
                <textarea
                  rows={4}
                  id="subTitle"
                  name="subTitle"
                  value={bannerSubTitle}
                  onChange={(e: any) => setBannerSubTitle(e.target.value)}
                  className="focus:outline-none resize-none md:!w-[75%] bg-transparent mt-7 text-sm no-scrollbar text-bold"
                ></textarea>
              </div>
              <button className={`${btn} mt-5`} onClick={handleSubmit}>
                {isLoading ? (
                  <ThreeDots height="24" color="#fff" radius="5" />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
