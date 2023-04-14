import { BufferedDebugHandler } from "../src/debugging";

test("Test - BufferedDebugHandler", () => {
    const debugHandler = new BufferedDebugHandler();

    const debugBlockA = jest.fn();
    debugHandler.debug(() => debugBlockA());
    expect(debugBlockA).not.toBeCalled();

    const debugBlockB = jest.fn();
    debugHandler.debug(() => debugBlockB());
    expect(debugBlockB).not.toBeCalled();

    debugHandler.executeBufferedBlocks();
    expect(debugBlockA).toBeCalled();
    expect(debugBlockB).toBeCalled();
});
