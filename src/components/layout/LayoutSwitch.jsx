// import { useSelector } from "react-redux";
import PublicLayout from "@/components/layout/PublicLayout";
import AuthedLayout from "@/components/layout/AuthedLayout"; 

export default function LayoutSwitch() {
  const isAuthed = true;
  return isAuthed ? <AuthedLayout /> : <PublicLayout />;
}
