import { LogOutModal }  from "/src/components/ui/LogOutModal";
import { useUI } from "/src/hooks/useUI";

const AppShell = ({
  header,
  footer,
  children,
}) => {
  const { isLogOutModalOpen, closeLogOut } = useUI();

  return (
    <>
      {header}
        <main className="flex-1">{children}</main>
      {footer}
      <LogOutModal
        open={isLogOutModalOpen}
        onClose={closeLogOut}
      />
    </>
  );
}

export default AppShell;
