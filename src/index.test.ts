import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { prepare } from "../src/index";
import type { PrepareContext } from "semantic-release";

describe("prepare", () => {
  let mockLogger: { info: ReturnType<typeof vi.fn> };
  let mockContext: PrepareContext;
  let processExitSpy: any;

  beforeEach(() => {
    mockLogger = {
      info: vi.fn(),
    };

    mockContext = {
      logger: mockLogger,
    } as PrepareContext;

    // Mock process.exit to prevent it from actually exiting the test process
    processExitSpy = vi.spyOn(process, "exit").mockImplementation((() => {
      throw new Error("process.exit called");
    }) as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should log a message and exit", () => {
    expect(() => prepare({}, mockContext)).toThrow("process.exit called");

    expect(mockLogger.info).toHaveBeenCalledTimes(1);
    expect(mockLogger.info).toHaveBeenCalledWith(
      "Stopping the release process."
    );

    expect(processExitSpy).toHaveBeenCalledWith(0);
    expect(processExitSpy).toHaveBeenCalledTimes(1);
  });
});
