import { useParams } from "react-router-dom";
import Profile from "/src/pages/Profile";
import { useAuth } from "/src/hooks/useAuth"; 
import { PROFILE_MOCK } from "/src/constants";

function getProfileById(id) {
  return PROFILE_MOCK; 
}

export default function ProfileRoute() {
  const { profileId } = useParams();        
  const { user } = useAuth();         

  const isSelf =
    !profileId || profileId === "me" || String(user?.id) === String(profileId);

  const person = PROFILE_MOCK;

  return <Profile person={person} isSelf={isSelf} />;
}
