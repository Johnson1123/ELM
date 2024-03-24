import React from "react";
import { HiAcademicCap } from "react-icons/hi2";
import DBICONS from "./Export.Icon";

import DbNavBox from "./Db.NavBox";
import { btnPrimary, darkBg } from "@/utils/style";

type Props = {};
const Dbsidebar = (props: Props) => {
  return (
    <div className="w-full h-full ">
      <CompanyLogo />
    </div>
  );
};

function CompanyLogo() {
  return (
    <div className={``}>
      <div className="w-full flex justify-center flex-col items-center">
        <div className="bg-[var(--bg-primary)] p-3 rounded-full">
          <HiAcademicCap size="50" fill="var(--color-red)" />
        </div>
        <h3 className="font-Poppins mt-1">Delight Academia</h3>
      </div>
      <div className="flex gap-5 w-full justify-center mt-5 py-5">
        <div className="flex flex-col gap-5 ">
          <DbNavBox
            path={"dashboard"}
            name={"Dashboard"}
            Icon={DBICONS.dashboard}
          />
          <DbNavBox path={"all-user"} name={"Users"} Icon={DBICONS.courses} />
          <DbNavBox path={"all-admin"} name={"Admin"} Icon={DBICONS.courses} />
          <DbNavBox path={"payment"} name={"Payment"} Icon={DBICONS.courses} />
          <DbNavBox
            path={"all-course"}
            name={"Courses"}
            Icon={DBICONS.resources}
          />
          <DbNavBox
            path={"createcourse"}
            name={"Create Course"}
            Icon={DBICONS.MdOutlineCreateNewFolder}
          />
          <h4>Layout</h4>
          <DbNavBox path={"layout/faq"} name={"FAQ"} Icon={DBICONS.courses} />
          <DbNavBox
            path={"layout/banner"}
            name={"Banner"}
            Icon={DBICONS.courses}
          />
          <DbNavBox
            path={"layout/category"}
            name={"Category"}
            Icon={DBICONS.courses}
          />

          <h3>Analytics</h3>
          <DbNavBox
            path={"user-analytics"}
            name={"Users"}
            Icon={DBICONS.FaBuildingUser}
          />
          <DbNavBox
            path={"order-analytics"}
            name={"Order"}
            Icon={DBICONS.BiSolidPurchaseTag}
          />
          <DbNavBox
            path={"course-analytics"}
            name={"Course"}
            Icon={DBICONS.IoMdAnalytics}
          />

          <DbNavBox path={"chat"} name={"Chat"} Icon={DBICONS.chat} />
          <DbNavBox path={"profile"} name={"Profile"} Icon={DBICONS.profile} />
          <DbNavBox path={"settings"} name={"Setting"} Icon={DBICONS.setting} />
        </div>
      </div>

      <div className="flex justify-center">
        <button className={`${btnPrimary} mt-5 mx-auto px-5`}>
          Upgrade Now
        </button>
      </div>
    </div>
  );
}

export default Dbsidebar;
