"use client";
import React, { useState } from "react";
import {
  ProfileColumnsBox,
  ProfileEditInput,
  ProfileColumnsTitle,
} from "@/app/components/dashboard/profile";
import { useSelector } from "react-redux";
import { userTypeProps } from "@/constant/data";

type Props = {};

const Page = (props: Props) => {
  const userProfile = useSelector((state: any) => state.auth.user.data);
  const [toggle, setToggle] = useState(true);

  const [profileData, setProfileData] = useState<userTypeProps>({
    name: userProfile?.name,
    email: userProfile?.email,
    role: userProfile?.role,
    password: userProfile?.password,
    courses: userProfile?.courses,
  });
  return (
    <div className="bg-transparent w-full h-full">
      <div className="py-5">
        <ProfileColumnsBox>
          <ProfileColumnsTitle
            text="Profile Page"
            para="You can edit your Profile here"
          />
        </ProfileColumnsBox>
        <ProfileColumnsBox>
          <ProfileColumnsTitle text="Name" />
          <ProfileEditInput
            inputText="text"
            toggle={toggle}
            valueText={userProfile.name}
            userProfile={userProfile}
            field="name"
            setToggle={setToggle}
            setUserProfile={setProfileData}
          />
        </ProfileColumnsBox>
        <ProfileColumnsBox>
          <ProfileColumnsTitle text="Email" />
          <ProfileEditInput
            inputText="text"
            toggle={toggle}
            valueText={userProfile.email}
            userProfile={userProfile}
            field="email"
            setToggle={setToggle}
            setUserProfile={setProfileData}
          />
        </ProfileColumnsBox>
        <ProfileColumnsBox>
          <ProfileColumnsTitle text="Role" />
          <p className="w-full">{userProfile.role}</p>
        </ProfileColumnsBox>
        <ProfileColumnsBox>
          <ProfileColumnsTitle
            text="Profile Picture"
            para="This will display in your profile"
          />
        </ProfileColumnsBox>
        <ProfileColumnsBox>
          <ProfileColumnsTitle text="Level" />
          <p className="w-full">Advance</p>
        </ProfileColumnsBox>
        <ProfileColumnsBox>
          <ProfileColumnsTitle text="Awards" />
          <p className="text-yellow-800 w-full">GOLD</p>
        </ProfileColumnsBox>
        <ProfileColumnsBox>
          <ProfileColumnsTitle text="Password" />
          <ProfileEditInput
            inputText="password"
            toggle={toggle}
            valueText={userProfile.password}
            userProfile={userProfile}
            field="name"
            setToggle={setToggle}
            setUserProfile={setProfileData}
          />
        </ProfileColumnsBox>
      </div>
      <div className=""></div>
    </div>
  );
};

export default Page;
