import Link from "next/link";

interface Blog {
  id: string;
  title: string;
}

export default async function Blogs() {
  // จำลอง Delay 3 วินาทีสำหรับการทดสอบ Suspense
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const res = await fetch("https://api.vercel.app/blog", {
    cache: "no-store", // หรือ use dynamic = 'force-dynamic'
  });
  const blogs: Blog[] = await res.json();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {blogs.map((blog) => (
        <div className="p-4 border border-gray-200 rounded-lg shadow" key={blog.id}>
          <div className="h-40 bg-blue-50 rounded-md mb-4 flex items-center justify-center font-bold text-gray-400">
            ID: {blog.id}
          </div>
          <h3 className="h-6 font-semibold mb-3 truncate">
            <Link href={`/blogs/${blog.id}`} className="hover:text-blue-600 transition">
              {blog.title}
            </Link>
          </h3>
          <p className="text-sm text-gray-500">คลิกที่หัวข้อเพื่ออ่านรายละเอียดเพิ่มเติม...</p>
        </div>
      ))}
    </div>
  );
}