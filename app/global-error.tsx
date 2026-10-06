"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="th">
      <body className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="p-8 bg-white rounded-lg shadow-md border text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Global Error</h1>
          <p className="text-gray-600 mb-6">
            เกิดข้อผิดพลาดร้ายแรงของระบบแอปพลิเคชัน
          </p>
          <button
            onClick={() => reset()}
            className="px-5 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      </body>
    </html>
  );
}