import { BufferedDebugHandler } from "../src/debugging";

test("Test - BufferedDebugHandler", () => {
    const debugHandler = new BufferedDebugHandler();

    const debugBlockA = jest.fn();
    debugHandler.debug(() => debugBlockA());
    expect(debugBlockA).not.toHaveBeenCalled();

    const debugBlockB = jest.fn();
    debugHandler.debug(() => debugBlockB());
    expect(debugBlockB).not.toHaveBeenCalled();

    debugHandler.executeBufferedBlocks();
    expect(debugBlockA).toHaveBeenCalled();
    expect(debugBlockB).toHaveBeenCalled();
});
