import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md text-center rounded-xl bg-white p-8 shadow-lg border border-red-100">
        <h1 className="text-6xl font-extrabold text-red-500 mb-2">403</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
        <p className="text-gray-600 mb-6">
          คุณไม่มีสิทธิ์เข้าถึงหน้านี้ (ต้องการสิทธิ์ ADMIN)
        </p>
        <Link
          href="/login"
          className="inline-block rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white hover:bg-blue-700 transition"
        >
          กลับไปหน้า Login
        </Link>
      </div>
    </main>
  );
}