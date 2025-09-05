const AppShell = ({
  header,
  footer,
  children,
}) => {
  return (
    <>
      {header}
        <main className="flex-1">{children}</main>
      {footer}
    </>
  );
}

export default AppShell;
