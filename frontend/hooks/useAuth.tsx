"use client";
import { useSelector } from "react-redux";

const useAuth = () => {
  const user = useSelector((state: any) => state.auth.user);
  if (user) {
    return true;
  } else {
    return false;
  }
};

export default useAuth;
