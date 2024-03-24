import { useDeleteUserMutation } from "@/redux/features/slice/user.api";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { FC } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineMail } from "react-icons/md";
import { format } from "timeago.js";

type Props = {
  theme?: string;
  data: any;
  isTeam: boolean;
};
interface IRows {
  id: string;
  name: string;
  email: string;
  role: string;
  purchased: string;
  created_at: string;
}

const DisplayUserAdmin: FC<Props> = ({ theme, data, isTeam }) => {
  const [deleteUser] = useDeleteUserMutation({});

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);
      toast.success("user deleted successfully");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const colums = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.3 },
    { field: "purchased", headerName: "Course", flex: 0.3 },
    { field: "created_at", headerName: "Join", flex: 0.3 },

    {
      field: "   ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (param: any) => {
        return (
          <>
            <Button>
              <AiOutlineDelete
                className="dark:text-white text-black"
                size={20}
                onClick={() => handleDeleteUser(param.row.id)}
              />
            </Button>
          </>
        );
      },
    },
    {
      field: "  ",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (param: any) => {
        return (
          <>
            <a href={`mailto:${param.row.email}`}>
              <MdOutlineMail
                className="dark:text-white text-black cursor-pointer"
                size={20}
              />
            </a>
          </>
        );
      },
    },
  ];
  const rows: IRows[] = [];

  {
    if (isTeam) {
      const team =
        data && data.data.filter((item: IRows) => item.role === "admin");
      team &&
        team.forEach((item: any) => {
          rows.push({
            id: item._id,
            name: item.name,
            email: item.email,
            role: item.role,
            purchased: item.courses.length,
            created_at: format(item.createdAt),
          });
        });
    } else {
      data &&
        data.data.forEach((item: any) => {
          rows.push({
            id: item._id,
            name: item.name,
            email: item.email,
            role: item.role,
            purchased: item.courses.length,
            created_at: format(item.createdAt),
          });
        });
    }
  }

  return (
    <Box m={isTeam ? "0" : "10px"}>
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
            background:
              theme === "dark"
                ? "rgb(22 163 74 / var(--tw-bg-opacity))"
                : "#A4A9FC",
          },
          "& .MuiCheckbox-root": {
            color: theme === "dark" ? "#b7ebde !important" : "#000 !important",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: "#fff !important",
          },
        }}
      >
        <DataGrid checkboxSelection rows={rows} columns={colums} />
      </Box>
    </Box>
  );
};

export default DisplayUserAdmin;
