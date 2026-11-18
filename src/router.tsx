import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultErrorComponent: ({ error }) => <main role="alert"><h1>This page couldn’t load</h1><p>{error instanceof Error ? error.message : "Please try again."}</p></main>,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
