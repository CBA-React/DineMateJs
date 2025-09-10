import PublicLayout from "@/components/layout/PublicLayout";
import AuthedLayout from "@/components/layout/AuthedLayout"; 
import { useAuth } from '/src/hooks/useAuth';

export default function LayoutSwitch() {
  const {isAuthenticated} = useAuth();
  return isAuthenticated ? <AuthedLayout /> : <PublicLayout />;
}
