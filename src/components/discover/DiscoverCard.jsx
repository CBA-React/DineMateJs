import ProfileCardShell from "/src/components/profile/ProfileCardShell";
import { DiscoverCardFooter } from "/src/components/discover/DiscoverFooter";

export const DiscoverCard = (props) => {
  const { person, onLike, onPass } = props;
  return (
    <ProfileCardShell
      person={person}
      footer={<DiscoverCardFooter onLike={onLike} onPass={onPass} />}
    />
  );
}
