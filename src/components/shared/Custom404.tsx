import * as React from "react";

import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { Button } from "@components/ui/button";
import Container from "@components/common/Container";
import Title from "@components/common/Title";

export default function Custom404() {
  return (
    <React.Fragment>
      <Container
        as={"main"}
        className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8"
      >
        <div className="text-center">
          <p className="text-primary text-base font-semibold">404</p>
          <Title
            level="h1"
            ariaLevel={1}
            className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl"
          >
            Page not found
          </Title>

          <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Sorry, we couldn't find the page you're looking for.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild>
              <Link href="/" className="flex items-center gap-3 text-balance text-gray-900">
                <ArrowLeftIcon />
                Go back home
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}
