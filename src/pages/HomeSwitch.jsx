import HomeAuthed from "/src/pages/home/HomeAuthed";
import Home from "/src/pages/home/Home";              
import { useAuth } from "/src/hooks/useAuth"  

export default function HomeSwitch() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <HomeAuthed /> : <Home />;
}
