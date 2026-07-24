import type { Metadata } from "next";
import Portfolio from "./components/Portfolio";

export const metadata: Metadata = {
  title: "Serhii Kharyponchuk — Frontend & Full Stack JavaScript Developer",
  description:
    "Frontend and full-stack JavaScript developer in the Netherlands building clean, responsive, high-performance web applications.",
};

export default function Home() {
  return <Portfolio />;
}
