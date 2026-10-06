"use client";

export default function LocalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-6 border border-red-200 rounded-lg bg-red-50 text-center">
      <h2 className="text-xl font-bold text-red-700">เกิดข้อผิดพลาดเฉพาะส่วน (Local Error)</h2>
      <p className="text-red-600 text-sm mt-1">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
      >
        ลองอีกครั้ง
      </button>
    </div>
  );
}