'use client';

import { useEffect, useRef } from 'react';
import renderMathInElement from 'katex/dist/contrib/auto-render';
import 'katex/dist/katex.min.css';

type KatexSpanProps = {
  text: string;
} & React.HTMLAttributes<HTMLSpanElement>;

export default function KatexSpan({ text, ...delegated }: KatexSpanProps) {
  const katexTextRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (katexTextRef.current) {
      renderMathInElement(katexTextRef.current, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
        ],
      });
    }
  }, [text]);

  return (
    <span ref={katexTextRef} {...delegated}>
      {text}
    </span>
  );
}