import * as React from "react";

import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { Button } from "@components/ui/button";
import Container from "@components/common/Container";
import Title from "@components/common/Title";
import VisuallyHidden from "@components/common/VisuallyHidden";

export default function Custom404() {
  return (
    <React.Fragment>
      <Container
        as={"main"}
        className="bg-background grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8"
      >
        <div className="text-center">
          <p className="text-primary text-base font-semibold">404</p>
          <Title
            level="h1"
            ariaLevel={1}
            className="text-foreground mt-4 text-5xl font-semibold tracking-tight text-balance sm:text-7xl"
          >
            Page not found
          </Title>

          <p className="text-muted-foreground mt-6 text-lg font-medium text-pretty sm:text-xl/8">
            Sorry, we couldn &apos;t find the page you &apos;re looking for.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild>
              <Link
                href="/"
                title="Go back to Homepage"
                className="flex items-center gap-3 text-balance"
              >
                <ArrowLeftIcon />
                Go back home
                <VisuallyHidden>Go back to Homepage</VisuallyHidden>
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}
