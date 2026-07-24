import { renderToString } from "react-dom/server";
import Portfolio from "../app/components/Portfolio";

export function render() {
  return renderToString(<Portfolio />);
}
