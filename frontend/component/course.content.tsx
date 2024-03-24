import React, { FC, useEffect, useReducer, useState } from "react";
import { AngleDowwn, AngleUp, MedalOutline, VideoIcon } from "../asset/Icons";

type Props = {
  courseData: any;
};

const Coursecontent: FC<Props> = ({ courseData }) => {
  const [sectionVisible, setSectionVisible] = useState<Set<string>>(
    new Set<string>()
  );

  const sections: string[] = [
    ...new Set<string>(courseData.map((item: any) => item.videoSection)),
  ];

  const [visible, setVisible] = useState<Set<string>>();

  const toggle = (section: string) => {
    const newVisible = new Set(visible);

    if (newVisible.has(section)) {
      newVisible.delete(section);
    } else {
      newVisible.add(section);
    }
    setVisible(newVisible);
  };

  const videoInSection = (section: string) => {
    return courseData.filter((item: any) => item.videoSection === section);
  };

  let totalCount = 0;
  return (
    <div>
      <div>
        {sections.map((item: any, index: number) => {
          const isVisibleSection = visible?.has(item);
          const sectionVideos = videoInSection(item);

          const sectionLength = sectionVideos.length as number;

          const sectiontime = sectionVideos.reduce(
            (totalLength: number, len: any) => totalLength + len.videoLength,
            0
          );
          const startNextStart = totalCount;
          totalCount += sectionLength;
          return (
            <>
              <div className="flex my-3 items-end justify-between" key={index}>
                <div className="flex flex-col">
                  <h2 className="text-[16px] py-2 font-bold">{item}</h2>
                  <div className="flex">
                    <p className="text-[16px]">{sectionLength} lessons - </p>
                    <p className="ml-1 text-[16px]"> 4hrs duration</p>
                  </div>
                </div>
                <div className="mt-4 cursor-pointer">
                  {visible?.has(item) ? (
                    <span className="" onClick={() => toggle(item)}>
                      <AngleUp />
                    </span>
                  ) : (
                    <span className="-3" onClick={() => toggle(item)}>
                      <AngleDowwn />
                    </span>
                  )}
                </div>
              </div>
              {isVisibleSection && (
                <div className="">
                  {sectionVideos.map((item: any, index: number) => {
                    return (
                      <div
                        className="p-3 bg-[#fff] rounded-md my-3 flex justify-between items-center shadow-sm"
                        key={index}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <VideoIcon className={"text-green-700 font-bold"} />
                            <h3 className="text-[16px] text-green-700 font-bold">
                              {item.title}
                            </h3>
                          </div>
                          <div className="mt-2 flex">
                            <p className="text-[16px] text-green-700 font-semibold">
                              3hrs -
                            </p>
                            <p className="text-[16px] pl-2 text-green-700 font-semibold">
                              43mins -
                            </p>
                            <p className="text-[16px]  pl-2 text-green-700 font-semibold">
                              23seconds
                            </p>
                          </div>
                        </div>
                        <div className="">
                          {false ? (
                            <MedalOutline
                              size={25}
                              className="text-slate-200"
                            />
                          ) : (
                            <MedalOutline
                              size={25}
                              color={false ? "#d3d3d3" : ""}
                              className="text-green-600"
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Coursecontent;
