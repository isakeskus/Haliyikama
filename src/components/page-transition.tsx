import { ViewTransition } from "react";

// Must be rendered inside each page (not the layout) so enter/exit fire on navigation.
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
