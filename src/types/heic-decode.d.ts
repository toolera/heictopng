declare module 'heic-decode' {
  function decode(options: { buffer: ArrayBuffer }): Promise<{
    data: ArrayBuffer;
    width: number;
    height: number;
  }>;
  
  export default decode;
  export { decode };
}