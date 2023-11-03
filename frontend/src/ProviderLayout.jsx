import {
  DEFAULT_THEME,
  mergeMantineTheme,
  MantineProvider,
  createTheme,
  rem,
} from "@mantine/core";
import DrawerProvider from "./Contexts/drawerContext";
import { ModalsProvider } from "@mantine/modals";

const themeOverride = createTheme({
  fontFamily: "Verdana, sans-serif",
  white: "#FAFAFA",
  spacing: {
    xs: rem(4),
    sm: rem(8),
    md: rem(16),
    lg: rem(24),
    xl: rem(32),
  },
  titleFontSize: rem(32),
  cardHeight: rem(440),
});
const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);
export default ({ children }) => {
  return (
    <>
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <ModalsProvider>
          <DrawerProvider>{children}</DrawerProvider>
        </ModalsProvider>
      </MantineProvider>
    </>
  );
};
