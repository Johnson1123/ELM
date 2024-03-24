import React, { FC } from "react";
import useAuth from "./useAuth";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function Protected({ children }: Props) {
  const user = useAuth();
  return user ? children : redirect("/");
}
