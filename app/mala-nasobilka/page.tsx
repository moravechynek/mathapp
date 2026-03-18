"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

import KatexSpan from "@/components/KatexSpan";
import useKeyPress from "@/components/useKeyPress";

// Utility to get random int in range
const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateProblem = () => {
  const a = rand(1, 10);
  const b = rand(1, 10);
  const signA = Math.random() < 0.5 ? -1 : 1;
  const signB = Math.random() < 0.5 ? -1 : 1;

  const valueA = a * signA;
  const valueB = b * signB;

  const result = valueA * valueB;

  let latex = '';
  if (valueB >= 0){
    latex = `\$${valueA} \\cdot ${valueB}=\$`;
  }else{
    latex = `\$${valueA} \\cdot (${valueB})=\$`;
  }

  return {
    a: valueA,
    b: valueB,
    result,
    latex,
  };
};

const buttons = [
  "",
  "Zpět", // "Back", "⌫"
  "Smazat", // "Clear"
  "7",
  "8",
  "9",
  "4","5","6", "1", "2", "3", "0", "-",
  "Potvrdit", // "Enter",
];

export default function Page() {
  const [problem, setProblem] = useState<ReturnType<
    typeof generateProblem
  > | null>(null);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    setProblem(generateProblem());
  }, []);

  /* useKeyPress('Escape', () => {
    console.log('Escape key pressed');
  }); */

  const checkAnswer = useCallback(() => {
    if (input === "") return;
    if (problem === null) return;

    const numeric = Number(input);

    if (numeric === problem.result) {
      setFeedback("Správně ✅");
      setTimeout(() => {
        setProblem(generateProblem());
        setInput("");
        setFeedback(null);
      }, 800);
    } else {
      setFeedback("Špatně ❌");
    }
  }, [input, problem]);

  const handleInput = (value: string) => {
    if (value === "Back" || value === "Zpět") {
      setInput((prev) => prev.slice(0, -1));
    } else if (value === "Clear" || value === "Smazat") {
      setInput("");
    } else if (value === "Enter" || value === "Potvrdit") {
      checkAnswer();
    } else {
      setInput((prev) => prev + value);
    }
  };

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        setInput((prev) => prev + e.key);
      } else if (e.key === "-") {
        setInput((prev) => prev + "-");
      } else if (e.key === "Backspace" || e.key === "Zpět") {
        setInput((prev) => prev.slice(0, -1));
      } else if (e.key === "Enter" || e.key === "Potvrdit") {
        checkAnswer();
      } else if (e.key === "Escape" || e.key === "Smazat") {
        setInput("");
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [checkAnswer]);

  return (
    <div className="min-h-screen  flex flex-col items-center justify-between p-6">
      <Link href="/" className="self-start text-lg font-medium hover:underline">
        Domů
      </Link>
      {/* Problem */}

      {problem && (
        <div className="flex items-center gap-4 text-4xl font-bold mt-10">
        <KatexSpan text={`$${problem.latex}$`} />
        <KatexSpan text={input ? `$${input}$` : '$\\_$'} />
        </div>
      )}

      {/* Feedback */}
      {feedback && <div className="mt-2 text-lg font-semibold">{feedback}</div>}

      {/* Buttons */}
      <div className="grid grid-cols-3 gap-3 mt-10 w-full max-w-sm">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => handleInput(btn)}
            className="bg-gray-300 dark:bg-gray-600 shadow rounded-2xl p-4 text-xl font-medium dark:hover:bg-gray-700 active:scale-95 transition"
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}
