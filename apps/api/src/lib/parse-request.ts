import { z } from "zod";
import { AppError, type ErrorFields } from "./app-error.js";

type RequestLocation = "body" | "query" | "params" | "headers";

export function parseRequest<S extends z.ZodType>(
  schema: S,
  input: unknown,
  location: RequestLocation,
): z.output<S> {
  const result = schema.safeParse(input);

  if (!result.success) {
    const fields: ErrorFields = Object.create(null);

    for (const issue of result.error.issues) {
      const path = [location, ...issue.path.map(String)].join(".");

      // Fixed messages avoid echoing submitted values.
      const message =
        issue.code === "unrecognized_keys"
          ? "Unrecognized fields."
          : "Invalid value.";

      const messages = fields[path] ?? [];
      messages.push(message);
      fields[path] = messages;
    }

    throw new AppError(
      422,
      "VALIDATION_ERROR",
      "Please check the submitted fields.",
      fields,
    );
  }

  return result.data;
}