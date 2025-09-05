import ProfileCardShell from "/src/components/profile/ProfileCardShell";
import { MatchCardFooter } from "/src/components/matches/MatchCardFooter";
import { Link } from "react-router-dom";

export const MatchCard = ({ person, onPlan, onChat, unread, className }) => {
  return (
    <Link to={`/profile/${person.id}`}>
      <ProfileCardShell
        person={person}
        className={className}
        footer={<MatchCardFooter onPlan={onPlan} onChat={onChat} unread={unread} />}
      />
    </Link>
  );
}
