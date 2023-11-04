import { Autocomplete, Image } from "@mantine/core";
import logo from "../../../assets/NewWebSiteLogo.png";

export function AppLogo({ size }) {
  return (
    <div style={{ cursor: "pointer" }}>
      <Image src={logo} style={{ width: size + "%", height: "auto" }}></Image>
    </div>
  );
}
