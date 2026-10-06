# StudentSphere — Next.js Student Management & Auth System

ระบบบริหารจัดการข้อมูลนักศึกษา (Student Management System) ควบคู่กับระบบยืนยันตัวตนและจัดการสิทธิ์ผู้ใช้งาน (RBAC) พัฒนาด้วย Next.js (App Router), Prisma ORM, SQLite, Zod Validation และ NextAuth.js (v5)

---

## 🛠 Tech Stack

* **Framework:** Next.js (App Router)
* **Database:** SQLite
* **ORM:** Prisma ORM
* **Data Validation:** Zod
* **Authentication & RBAC:** NextAuth.js (v5 / `@beta`) & Bcrypt.js
* **Styling:** Tailwind CSS

---

## 📂 Project Structure

```text
my-app/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   ├── actions.ts
│   │   │   └── page.tsx
│   │   └── unauthorized/
│   │       └── page.tsx
│   ├── admin/
│   │   └── page.tsx
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts
│   ├── blogs/
│   │   ├── [id]/
│   │   │   └── page.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── students/
│   │   ├── [id]/
│   │   │   └── edit/
│   │   │       └── page.tsx
│   │   ├── create/
│   │   │   ├── create-student-form.tsx
│   │   │   └── page.tsx
│   │   ├── actions.ts
│   │   ├── delete-button.tsx
│   │   ├── page.tsx
│   │   └── validation.ts
│   ├── ui/
│   │   ├── blogs.tsx
│   │   ├── my-fallback.tsx
│   │   └── my-skeleton.tsx
│   ├── auth.ts
│   ├── error.tsx
│   ├── global-error.tsx
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   └── prisma.ts
├── prisma/
│   └── schema.prisma
├── .env
├── package.json
└── tsconfig.json

```

---

## ⚡ ขั้นตอนการติดตั้งและตั้งค่าโปรเจกต์ (Installation Setup)

### 1. Clone Repository & Install Dependencies

```bash
git clone https://github.com/Ittiphon2005/NextJs-CRUD-.git
cd NextJs-CRUD-
npm install

```

### 2. ติดตั้ง Packages สำหรับ Validation & Authentication

```bash
npm install zod next-auth@beta bcryptjs
npm install -D @types/bcryptjs

```

### 3. กำหนดค่า Environment Variables (`.env`)

สร้างไฟล์ `.env` ที่โฟลเดอร์ Root ของโปรเจกต์:

```env
DATABASE_URL="file:./dev.db"
AUTH_SECRET="your-generated-auth-secret"

# GitHub OAuth Credentials
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"

```

> **คำแนะนำ:** สร้าง `AUTH_SECRET` สุ่มได้ง่ายๆ ผ่านคำสั่ง: `npx auth secret`

### 4. ยืนยัน Schema & Migrate Database

```bash
# ตรวจสอบความถูกต้องของ Schema
npx prisma validate

# ซิงก์ฐานข้อมูลและสร้าง Prisma Client
npx prisma migrate dev --name init
npx prisma generate

```

### 5. รันโปรเจกต์ใน Development Mode

```bash
npm run dev

```

เปิดเบราว์เซอร์ไปที่: `http://localhost:3000`

---

## 🧪 คู่มือการใช้งานและการทดสอบระบบ (Testing Guide)

### ส่วนที่ 1: ระบบจัดการนักศึกษา (Student CRUD)

1. **READ (ดึงข้อมูล):** เข้าหน้า `/students` เพื่อดูตารางรายการนักศึกษาและจำนวนนักศึกษาทั้งหมดที่ดึงมาจาก SQLite
2. **CREATE (เพิ่มข้อมูล):** เข้าหน้า `/students/create` กรอกข้อมูลนักศึกษา แล้วกด **"บันทึก"** ระบบจะบันทึกลง Database และ Redirect กลับมาหน้ารายการ
3. **UPDATE (แก้ไขข้อมูล):** กดปุ่ม **"แก้ไข"** ในตารางรายการนักศึกษา (`/students/[id]/edit`) แก้ไขข้อมูลเดิม แล้วกดบันทึก
4. **DELETE (ลบข้อมูล):** กดปุ่ม **"ลบ"** ในตาราง ยืนยันการลบผ่าน Pop-up ระบบจะทำการลบข้อมูลและรีเฟรชหน้าด้วย `revalidatePath`

---

### ส่วนที่ 2: Data Validation, Loading/Suspense & Error Handling

1. **Zod Validation ใน Form:**
* ทดลองกดบันทึกฟอร์มเปล่า หรือพิมพ์ Email ผิดรูปแบบที่หน้า `/students/create`
* ระบบจะขึ้นเตือนสีแดงใต้ Input ช่องนั้นๆ
* หากกรอกรหัสนักศึกษาซ้ำ Server Action จะดึง Error จาก Prisma มาเตือนว่า *"รหัสนักศึกษานี้มีอยู่แล้ว"*


2. **Loading & Suspense (Skeleton UI):**
* เข้าหน้า `/blogs` ขณะรอดึงข้อมูล API ระบบจะแสดง **Skeleton UI** (การ์ดกะพริบสีเทา) จาก `BlogListSkeleton` ก่อนเปลี่ยนเป็นเนื้อหาจริง


3. **Custom 404 Not Found Page:**
* ทดลองเข้า URL ที่ไม่มีข้อมูลจริง เช่น `/blogs/99999`
* ระบบจะเรียกใช้คำสั่ง `notFound()` และนำทางไปยังหน้า **`not-found.tsx`** ที่ออกแบบไว้พร้อมปุ่มย้อนกลับ



---

### ส่วนที่ 3: ระบบยืนยันตัวตนและการจัดการสิทธิ์ (Authentication & RBAC)

1. **Sign Up (สมัครสมาชิก):**
* เข้าหน้า `/signup` สมัครสมาชิกใหม่ (มี Validation ตรวจสอบความยาวรหัสผ่านเกิน 6 ตัว และตรวจสอบ Confirm Password)


2. **Login ด้วย Email & Password:**
* เข้าหน้า `/login` ล็อกอินด้วยบัญชีที่เพิ่งสมัคร หากใส่รหัสผ่านผิดจะเตือน error หากถูกต้องจะนำทางไปหน้า `/admin`


3. **Login ด้วย GitHub OAuth:**
* กดปุ่ม **"Sign in with Github"** บนหน้า `/login` เพื่อเข้าสู่ระบบผ่าน OAuth ของ GitHub


4. **Role-Based Access Control (RBAC):**
* **ยังไม่ Login:** พยายามเข้าหน้า `/admin` ➔ ถูก Redirect ไปหน้า `/login`
* **สิทธิ์ USER:** ล็อกอินด้วยบัญชีสิทธิ์ `USER` แล้วเข้าหน้า `/admin` ➔ ถูก Redirect ไปหน้า `/unauthorized`
* **สิทธิ์ ADMIN:** ล็อกอินด้วยบัญชีสิทธิ์ `ADMIN` ➔ เข้าใช้งานหน้า `/admin` (Admin Dashboard) ได้ปกติ
