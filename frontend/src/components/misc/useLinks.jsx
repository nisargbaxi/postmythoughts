import useBoundStore from "../../store/Store";
import React from "react";
import { DrawerContext } from "../../Contexts/drawerContext";
export default () => {
  const { logoutService, user } = useBoundStore((state) => state);
  const { close } = React.useContext(DrawerContext);

  const handleClick = (action) => {
    close();
    if (action) action();
  };

  const links = !user
    ? [
        { link: "/", label: "Home", clickHandler: handleClick() },
        { link: "/About", label: "About", clickHandler: handleClick() },
      ]
    : [
        { link: "/posts", label: "Your Thoughts", clickHandler: handleClick() },
        {
          link: "/posts/create",
          label: "Create Thoughts",
          clickHandler: handleClick(),
        },
        user.role == "admin"
          ? {
              link: "/allusers",
              label: "All Users",
              clickHandler: handleClick(),
            }
          : {},
      ];
  return links;
};
