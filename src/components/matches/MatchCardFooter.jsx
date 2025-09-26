import { MessageButton } from "/src/components/ui/ButtonCustom";
import { SubmitButton } from "/src/components/ui/SubmitButton";

export const MatchCardFooter = ({
  onPlan = () => {},
  onChat = () => {},
  unread = 0,
}) => {
  return (
    <div className="pointer-events-auto mt-4 flex items-center justify-between gap-3">
      <SubmitButton text="Plan Date" withIcon/>
      <div className="bg-white rounded-full flex p-2.5">
          <MessageButton unread={unread}  />
      </div>
    </div>
  );
}
