export const showBreadCrumb = (pathname: string) => {
  return (
    !pathname.split("/").find((path) => path === "clients") &&
    !pathname.split("/").find((path) => path === "familiar") &&
    pathname !== "/" &&
    !pathname.split("/").find((path) => path === "profile")
  );
};
