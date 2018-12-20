
type primitive = string | boolean | number | null

declare function queryEach(query: {
  [key: string]: undefined | primitive | {
    [op: string]: primitive | primitive[]
  }
}, fn: (this: {
  pop(op: string): undefined | primitive | primitive[]
}, key: string, value: undefined | primitive | primitive[], op: string) => void): void

export = queryEach
