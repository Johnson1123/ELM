"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/slice/user.api";
import Heading from "@/utils/Heading";
import DisplayUserAdmin from "@/app/components/Role.User.Admin";
import { RotatingTriangles, ThreeDots } from "react-loader-spinner";
import { btn } from "@/utils/style";
import CustomModal from "@/app/components/CustomModal/Custom.modal.children";
import GroupInput from "@/app/components/form/GroupInput";
import { addRoleSchemas } from "@/utils/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface IADDROLE {
  role: string;
  email: string;
}
type Props = {};
const AllUser = (props: Props) => {
  const { theme, setTheme } = useTheme();
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IADDROLE>({ resolver: yupResolver(addRoleSchemas) });

  const [updateUserRole, { isLoading: isUpdateLoading, isSuccess }] =
    useUpdateUserRoleMutation();

  const { isLoading, data, error, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const handelUpdateUserROle = async (data: IADDROLE) => {
    console.log(data);
    try {
      await updateUserRole(data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setToggle(false);
      refetch();
      toast.success("Role Updated Successfully");
    }
  }, [isUpdateLoading]);
  return (
    <div className="min-h-[70vh] flex justify-center items-center flex-col">
      {!data ? (
        <RotatingTriangles />
      ) : (
        <>
          <Heading
            title="P&JTech solution users"
            description="P&JTech solution users are fortunate people learning programming online"
            keywords="P&JTech solution users"
          />
          <div className="flex justify-between w-full">
            <p>List of Admin Users</p>
            <button className={`${btn} mt-3`} onClick={handleToggle}>
              Add as Admin
            </button>
          </div>
          <div className={` w-full mt-[5px]`}>
            <DisplayUserAdmin theme={theme} data={data} isTeam={false} />
          </div>
          {toggle && (
            <CustomModal
              openModal={toggle}
              setOpenModal={setToggle}
              width="50%"
            >
              <div className="flex justify-center items-center bg-gray-800 h-[70vh] rounded-md bg-opacity-80">
                <form
                  action=""
                  onSubmit={handleSubmit(handelUpdateUserROle)}
                  className="dark:text-black"
                >
                  <GroupInput
                    name="role"
                    label="role"
                    register={register}
                    isDashboard={true}
                  />
                  <GroupInput
                    name="email"
                    label="Email"
                    register={register}
                    isDashboard={true}
                  />
                  <button type="submit" className={`${btn} mt-5 mx-auto`}>
                    {isUpdateLoading ? (
                      <ThreeDots height="24" color="#fff" radius="5" />
                    ) : (
                      "Add Role"
                    )}
                  </button>
                </form>
              </div>
            </CustomModal>
          )}
        </>
      )}
    </div>
  );
};

export default AllUser;
