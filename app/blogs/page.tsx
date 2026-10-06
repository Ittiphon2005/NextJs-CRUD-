import Blogs from "@/app/ui/blogs";
import { BlogListSkeleton } from "@/app/ui/my-skeleton";
import { Suspense } from "react";

export default function BlogPage() {
  return (
    <main className="max-w-6xl mx-auto p-6">
      <header className="mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">ยินดีต้อนรับสู่บล็อกข่าวสาร</h1>
        <p className="text-gray-600 mt-1">บทความเทคโนโลยีและข่าวสารอัปเดตล่าสุด</p>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">รายการบทความ</h2>
        <Suspense fallback={<BlogListSkeleton />}>
          <Blogs />
        </Suspense>
      </section>
    </main>
  );
}