import Image from "next/image";
import Link from "next/link";
import KatexSpan from "@/components/KatexSpan";

export default function Home() {
  return (
    <div className="mt-5 min-h-screen bg-white font-sans dark:bg-gray-950">
      <h1 className="text-3xl font-semibold text-center">Procvičování matematiky</h1>
      <main className="flex min-h-screen w-full max-w-3xl items-center gap-2 pt-10 pb-32 px-16 bg-white dark:bg-gray-950 sm:items-start">
        <Link href="/mala-nasobilka">
        <div className="flex flex-col items-center justify-center border p-5">
          <div>
            Malá násobilka s +/-
          </div>
          <div>
            <KatexSpan text={`\$-6\\cdot 7\$`}></KatexSpan>
          </div>
        </div>
        </Link>
        <Link href="/vzorce">
        <div className="flex flex-col items-center justify-center border p-5">
          <div>
            Vzorce
          </div>
          <div>
            <KatexSpan text={`\$a^2-b^2\$`}></KatexSpan>
          </div>
        </div>
        </Link>
      </main>
    </div>
  );
}
