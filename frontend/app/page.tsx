"use client";

import Header from "@/app/components/Header";
import Heading from "../utils/Heading";
import { FC, useState } from "react";
import Hero from "./components/Herosection";
import { ThemeSwitcher } from "@/utils/ToggleButton";
import WorkFlow from "./components/WorkFlow";
import HomeAbout from "./components/Home.About";
import HomeCourse from "./components/Home.Course";
import HomeFeedback from "./components/Home.Feedback";
import HomeNewletter from "./components/Home.Newletter";
import HomeFaq from "./components/Home.Faq";

interface IProps {}

const Page: FC<IProps> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  return (
    <div>
      <Heading
        title="Online Education Platform"
        description="Reliable and relevant platform"
        keywords="Education, easy learning"
      />
      <Hero />
      <WorkFlow />
      <HomeAbout />
      <HomeCourse />
      <HomeFeedback />
      <HomeFaq />
      <HomeNewletter />
    </div>
  );
};

export default Page;
