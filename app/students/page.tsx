import prisma from "@/app/lib/prisma";
import DeleteButton from "./delete-button";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function StudentsPage() {
  const students = await prisma.student.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
          <p className="mt-2 text-gray-600">
            จำนวนนักศึกษา: <strong>{students.length}</strong> คน
          </p>
        </div>
        <Link
          href="/students/create"
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 transition"
        >
          + เพิ่มนักศึกษา
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 font-semibold">ID</th>
              <th className="px-4 py-3 font-semibold">รหัสนักศึกษา</th>
              <th className="px-4 py-3 font-semibold">ชื่อ</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">สาขา</th>
              <th className="px-4 py-3 font-semibold">ชั้นปี</th>
              <th className="px-4 py-3 font-semibold">สถานะ</th>
              <th className="px-4 py-3 font-semibold text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                  ยังไม่มีข้อมูลนักศึกษา
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3">{student.id}</td>
                  <td className="px-4 py-3 font-mono">{student.studentCode}</td>
                  <td className="px-4 py-3 font-medium">{student.name}</td>
                  <td className="px-4 py-3">{student.email ?? "-"}</td>
                  <td className="px-4 py-3">{student.major}</td>
                  <td className="px-4 py-3">{student.year}</td>
                  <td className="px-4 py-3">
                    {student.status ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        กำลังศึกษา
                      </span>
                    ) : (
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                        ไม่ใช้งาน
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/students/${student.id}/edit`}
                        className="rounded-md bg-amber-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-amber-600 transition"
                      >
                        แก้ไข
                      </Link>
                      <DeleteButton id={student.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}