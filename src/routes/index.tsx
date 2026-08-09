import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "#/components/pages/landing";

export const Route = createFileRoute("/")({
  component: LandingPage,
});
