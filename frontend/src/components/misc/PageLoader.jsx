import { Center } from "@mantine/core";
import { Hourglass } from "react-loader-spinner";

export default function PageLoader() {
  return (
    <Center>
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={["#306cce", "#72a1ed"]}
      />
    </Center>
  );
}
