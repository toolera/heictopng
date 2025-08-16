declare module 'heic-decode' {
  export function decode(options: { buffer: ArrayBuffer }): Promise<{
    data: ArrayBuffer;
    width: number;
    height: number;
  }>;
}