import { auth } from "@/app/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();

  // 1. ถ้ายังไม่ได้ Login ให้ไปหน้า /login
  if (!session?.user) {
    redirect("/login");
  }

  // 2. ถ้า Role ไม่ใช่ ADMIN ให้ไปหน้า /unauthorized
  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  return (
    <main className="mx-auto max-w-4xl p-8">
      <div className="rounded-xl bg-white p-8 shadow-md border border-gray-200">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mb-6">
          ยินดีต้อนรับคุณ <span className="font-semibold text-blue-600">{session.user.name || session.user.email}</span> (เฉพาะสิทธิ์ ADMIN เท่านั้น)
        </p>

        <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>ข้อมูลระบบ:</strong> บัญชีนี้ได้รับสิทธิ์สูงสุดในการจัดการระบบ
          </p>
        </div>
      </div>
    </main>
  );
}