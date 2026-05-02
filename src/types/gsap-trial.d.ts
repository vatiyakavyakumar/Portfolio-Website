declare module 'gsap-trial/SplitText' {
  // Minimal typing to satisfy TypeScript for the GSAP SplitText trial plugin
  interface SplitTextOptions {
    type?: string;
    wordsClass?: string;
    charsClass?: string;
    linesClass?: string;
  }

  export class SplitText {
    constructor(targets: any, vars?: SplitTextOptions);
    lines: any[];
    words: any[];
    chars: any[];
    revert(vars?: { clearAll?: boolean }): void;
  }

  export default SplitText;
}
