import type { ErrorRequestHandler } from "express";
import { AppError } from "../lib/app-error.js";

function isParserError(
  error: unknown,
  type: string,
  status: number,
): boolean {
  return (
    error instanceof Error &&
    "type" in error &&
    error.type === type &&
    "status" in error &&
    error.status === status
  );
}

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _req,
  res,
  next,
) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  let apiError = new AppError(
    500,
    "INTERNAL_SERVER_ERROR",
    "Something went wrong. Please try again later.",
  );

  if (error instanceof AppError) {
    apiError = error;
  } else if (isParserError(error, "entity.parse.failed", 400)) {
    apiError = new AppError(
      400,
      "INVALID_JSON",
      "The request body contains invalid JSON.",
    );
  } else if (isParserError(error, "entity.too.large", 413)) {
    apiError = new AppError(
      413,
      "PAYLOAD_TOO_LARGE",
      "The request body is too large.",
    );
  } else if (
    isParserError(error, "charset.unsupported", 415) ||
    isParserError(error, "encoding.unsupported", 415)
  ) {
    apiError = new AppError(
      415,
      "UNSUPPORTED_ENCODING",
      "The request encoding is not supported.",
    );
  }

  if (apiError.statusCode >= 500) {
    // Avoid logging raw errors, request bodies or credentials.
    console.error({
      event: "api_error",
      requestId: res.locals.requestId,
      code: apiError.code,
      statusCode: apiError.statusCode,
    });
  }

  res.status(apiError.statusCode).json({
    error: {
      code: apiError.code,
      message: apiError.message,
      fields: apiError.fields,
      requestId: res.locals.requestId,
    },
  });
};