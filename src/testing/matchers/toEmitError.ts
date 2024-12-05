import type { MatcherFunction } from "expect";
import type { ObservableStream } from "../internal/index.js";
import type { TakeOptions } from "../internal/ObservableStream.js";

export const toEmitError: MatcherFunction<
  [value?: any, options?: TakeOptions]
> = async function (actual, expected, options) {
  const stream = actual as ObservableStream<any>;
  const hint = this.utils.matcherHint(
    this.isNot ? ".not.toEmitError" : "toEmitError",
    "stream",
    "error"
  );

  try {
    const error = await stream.takeError(options);
    const pass =
      expected === undefined ? true : (
        this.equals(expected, error, this.customTesters)
      );

    return {
      pass,
      message: () => {
        if (pass) {
          return (
            hint +
            "\n\nExpected stream not to emit error but it did." +
            `\n\nReceived:` +
            `\n` +
            this.utils.printReceived(error)
          );
        }

        return (
          hint +
          "\n\n" +
          this.utils.printDiffOrStringify(
            expected,
            error,
            "Expected",
            "Recieved",
            true
          )
        );
      },
    };
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Timeout waiting for next event"
    ) {
      return {
        pass: false,
        message: () =>
          hint + "\n\nExpected stream to emit an error but it did not.",
      };
    } else {
      throw error;
    }
  }
};
