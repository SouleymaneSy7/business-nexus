import Link from "next/link";

import Title from "@components/common/Title";
import Container from "@components/common/Container";

import { Button } from "@components/ui/button";
import { Ripple } from "@components/magicui/ripple";
import { ChevronRightIcon } from "lucide-react";

function Home() {
  return (
    <div className="bg-background relative flex h-svh w-full flex-col items-center justify-center overflow-hidden rounded-lg border p-5">
      <Container className="z-10 flex h-full w-full flex-col items-center justify-center">
        <Title
          level="h1"
          ariaLevel={1}
          className="text-card-foreground mb-6 text-center text-3xl font-semibold tracking-tight md:text-6xl"
        >
          Connect{" "}
          <span className="text-animate-colors header-bg-gradient-1 bg-clip-text text-3xl font-black whitespace-pre-wrap text-transparent drop-shadow-lg md:text-7xl">
            <i>entrepreneurs</i>
          </span>{" "}
          <br />
          and{" "}
          <span className="text-animate-colors bg-gradient-to-r from-indigo-500 via-green-500 to-pink-500 bg-clip-text text-3xl font-black whitespace-pre-wrap text-transparent italic drop-shadow-lg md:text-7xl">
            investors.
          </span>
        </Title>

        <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-center text-xl leading-relaxed">
          Unlock new opportunities, expand your network, and transform bold ideas into thriving
          ventures. Join our collaborative platform where entrepreneurs and investors connect to
          shape the future together.
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-4.5"
          >
            <Link href="/login">Login </Link>
          </Button>

          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-4.5"
          >
            <Link href="/dashboard/entrepreneur">
              Go to Dashboard
              <ChevronRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>

      <Ripple mainCircleSize={300} numCircles={14} />
    </div>
  );
}

export default Home;
