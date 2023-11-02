import React from "react";
import { Container } from "@mantine/core";
import PageLoader from "./PageLoader";
import { Await } from "react-router-dom";

export default function PageContent({ promise, children }) {
  return (
    <Container my="md">
      <React.Suspense fallback={<PageLoader />}>
        <Await
          resolve={promise}
          errorElement={<h1>Error in loading the Post details....</h1>}
        >
          {children}
        </Await>
      </React.Suspense>
    </Container>
  );
}
