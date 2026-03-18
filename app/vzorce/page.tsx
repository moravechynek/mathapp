import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full h-screen">
      <div>
        <Link href="/" className="text-lg font-medium hover:underline absolute z-0 text-gray-900 m-3 sm:m-5">
          Domů
        </Link>
      </div>
      <iframe
      src="https://learningapps.org/watch?v=pnouk9r5c26"
      className="w-full h-full z-1">

      </iframe>
    </div>
  );
}
