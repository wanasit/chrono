export type AsyncDebugBlock = () => any
export type DebugConsume = (debugLog: AsyncDebugBlock) => void

export interface DebugHandler {
    debug: DebugConsume;
}

export class BufferedDebugHandler implements DebugHandler {
    private buffer: Array<AsyncDebugBlock>
    constructor() {
        this.buffer = []
    }

    debug(debugMsg: AsyncDebugBlock): void {
        this.buffer.push(debugMsg)
    }

    executeBufferedBlocks(): Array<any> {
        const logs = this.buffer.map(block => block())
        this.buffer = []
        return logs
    }
}
