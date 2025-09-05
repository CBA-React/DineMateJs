import AppShell from "./AppShell";
import { Outlet } from "react-router-dom";
import { AuthedHeader } from "./headers/AuthedHeader";
import AuthedFooter from "./footers/AuthedFooter";

const AUTH_LINKS = [
  {to:"/discover", text:"Discover"},
  {to:"/matches", text:"Matches"},
  {to:"/dining", text:"Dining"},
  {to:"/events", text:"Events"},
];

export default function AuthedLayout() {
  return (
    <AppShell header={<AuthedHeader links={AUTH_LINKS} />} footer={<AuthedFooter />}>
      <Outlet />
    </AppShell>
  );
}
