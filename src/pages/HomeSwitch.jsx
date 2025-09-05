// import { useSelector } from "react-redux";
import HomeAuthed from "/src/pages/home/HomeAuthed";
import Home from "/src/pages/home/Home";                 

export default function HomeSwitch() {
  const isAuthed = true;
  return isAuthed ? <HomeAuthed /> : <Home />;
}
