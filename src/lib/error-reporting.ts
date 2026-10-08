export function reportError(error: unknown, context: Record<string, unknown> = {}) {
  // In development, error reporting is forwarded to diagnostic tools if present.
  if (typeof window !== "undefined") {
    const win = window as any;
    win.__events?.captureException?.(
      error,
      {
        source: "react_error_boundary",
        route: win.location.pathname,
        ...context,
      },
      {
        mechanism: "react_error_boundary",
        handled: false,
        severity: "error",
      },
    );

    const message =
      error instanceof Response
        ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`
        : error instanceof Error
          ? error.message
          : String(error);

    win.__reportRuntimeError?.({
      message,
      stack: error instanceof Error ? error.stack : undefined,
      filename: win.location.pathname,
    });
  }
}
