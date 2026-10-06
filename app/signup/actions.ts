"use server";

import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

// ใช้ Singleton Prisma เพื่อป้องกัน Memory Leak
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export type SignUpState = {
  error?: string;
  success?: boolean;
};

export async function signUp(
  prevState: SignUpState,
  formData: FormData
): Promise<SignUpState> {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();

  // 1. ตรวจสอบว่ากรอกข้อมูลครบถ้วนหรือไม่
  if (!name || !email || !password || !confirmPassword) {
    return { error: "กรุณากรอกข้อมูลให้ครบถ้วน" };
  }

  // 2. ตรวจสอบความยาวรหัสผ่าน
  if (password.length < 6) {
    return { error: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" };
  }

  // 3. ตรวจสอบว่ารหัสผ่านตรงกันหรือไม่
  if (password !== confirmPassword) {
    return { error: "รหัสผ่านไม่ตรงกัน" };
  }

  // 4. ตรวจสอบรูปแบบ Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: "รูปแบบ Email ไม่ถูกต้อง" };
  }

  // 5. เช็กว่า Email นี้เคยสมัครไปแล้วหรือยัง
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "Email นี้ถูกใช้งานแล้ว" };
  }

  // 6. เข้ารหัส password ด้วย bcrypt
  const passwordHash = await bcrypt.hash(password, 12);

  // 7. บันทึกผู้ใช้ใหม่ลง Database โดยกำหนด Role เป็น "USER" เสมอ
  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: "USER",
    },
  });

  return { success: true };
}