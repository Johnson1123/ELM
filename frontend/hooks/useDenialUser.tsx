import React, { FC } from "react";
import useAuth from "./useAuth";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function NotForUser({ children }: Props) {
  const user = useAuth();
  return user ? redirect("/") : children;
}
