"use client";
import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useTheme } from "next-themes";
import { useGetAllCourseQuery } from "@/redux/features/slice/course.api";
import { Rings } from "react-loader-spinner";
import { format } from "timeago.js";
import Link from "next/link";

type Props = {};

const Allcourse = (props: Props) => {
  const { theme, setTheme } = useTheme();

  const { isLoading, data, error } = useGetAllCourseQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const colums = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "Purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created Date", flex: 0.5 },
    {
      field: "   ",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (param: any) => {
        return (
          <>
            <Link href={`/dashboard/edit-course/${param.row.id}`}>
              <AiOutlineEdit className="dark:text-white text-black" size={20} />
            </Link>
          </>
        );
      },
    },
    {
      field: "  ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (param: any) => {
        return (
          <>
            <Button>
              <AiOutlineDelete
                className="dark:text-white text-black"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
  ];

  const rows: any = [];

  {
    data &&
      data.data.forEach((item: any) => {
        rows.push({
          id: item._id,
          title: item.name,
          Purchased: item.purchase,
          ratings: item.rating,
          created_at: format("12/12/12"),
        });
      });
  }
  return (
    <div className={` w-full mt-[20px]`}>
      {data ? (
        <Box m="20px">
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffff30!important"
                    : "1px solid #ccc!important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none!important",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                background: theme === "dark" ? "#3e4396" : "#A4A9FC",
                borderBottom: "none",
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-virtualScroller": {
                background: theme === "dark" ? "1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                background: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? "#b7ebde !important" : "#000 !important",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: "#fff !important",
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={colums} />
          </Box>
        </Box>
      ) : (
        <Rings />
      )}
    </div>
  );
};

export default Allcourse;
