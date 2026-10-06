import { notFound } from "next/navigation";

interface Blog {
  id: string;
  title: string;
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch("https://api.vercel.app/blog");
  const blogs: Blog[] = await res.json();

  const blog = blogs.find((x) => String(x.id) === id);

  if (!blog) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h1>
      <p className="text-gray-700 leading-relaxed">
        เนื้อหาบทความ รหัสอ้างอิง: {blog.id}
      </p>
    </main>
  );
}