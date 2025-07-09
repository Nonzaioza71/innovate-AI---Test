

---

```markdown
# 📚 Innovate Book Management System

ระบบจัดการหนังสือ (Full-Stack) ที่พัฒนาเพื่อให้ผู้ใช้สามารถจัดการข้อมูลหนังสือได้อย่างสะดวก รวดเร็ว และมีประสิทธิภาพ  
พร้อมระบบล็อกอิน, สมัครสมาชิก, และฟีเจอร์นำเข้าหนังสือจำนวนมากผ่านไฟล์ Excel!

---

## 🚀 Features

### ✅ ฝั่งผู้ใช้ (Frontend - Nuxt 3 + Tailwind CSS)
- 🔐 **ล็อกอิน / สมัครสมาชิก**
- 📖 **เพิ่ม / ลบ / แก้ไข / ดูรายละเอียดหนังสือ**
- 📥 **นำเข้าหนังสือหลายเล่มพร้อมกันผ่าน Excel**
- 🌈 UI สวยงาม เร็วลื่นด้วย Tailwind CSS + Vite + Nuxt 3

### 🛠️ ฝั่งเซิร์ฟเวอร์ (Backend - Node.js + Express + MySQL)
- ⚙️ RESTful API (Documented with Swagger)
- 🗃️ ฐานข้อมูล MySQL พร้อม script SQL ใน `/backend/backup/database`
- 🧪 ไฟล์ Excel สำหรับทดสอบระบบ import (อยู่ใน `/backend/for-test`)
- 🔐 แยก controller ตามหมวด: หนังสือ / ผู้ใช้
- 🌍 CORS-ready และรองรับ .env config

---

## 🗂️ โครงสร้างโปรเจกต์
```

innovate-system/
├── backend/                  # REST API + MySQL
│   ├── index.js              # Main Express app
│   ├── package.json          # Backend dependencies
│   ├── swagger.yaml          # API documentation
│   ├── controllers/          # Book & User controllers
│   ├── configs/              # DB connection config
│   ├── backup/database/      # SQL script สำหรับ import
│   └── for-test/             # Excel test data
│
├── frontend/                 # Nuxt 3 web interface
│   ├── app.vue               # Main app layout
│   ├── nuxt.config.ts        # Nuxt config
│   ├── tailwind.config.js    # Tailwind settings
│   └── pages/                # (เช่น login, book list)

````

---

## 📦 วิธีติดตั้งและรันระบบ

### 🔧 1. Clone โปรเจกต์
```bash
git clone https://github.com/your-username/innovate-system.git
cd innovate-system
````

### 🛠️ 2. ติดตั้ง Backend

```bash
cd backend
npm install
```

🗄️ จากนั้น import ฐานข้อมูลจากไฟล์:

```bash
# เช่นใช้ phpMyAdmin หรือ CLI
mysql -u root -p innovate_ai_test < backup/database/innovate_ai_test.sql
```

🚀 เริ่มรัน Backend:

```bash
npm start or nodemon
```

### 🎨 3. ติดตั้ง Frontend

```bash
cd ../frontend
npm install
npm run dev
```

---

## 📄 API Document

เข้าดูและทดสอบ API ได้ที่:
📍 `http://localhost:3302/api-docs` (หลังจากรัน backend)

---

## 📊 ตัวอย่างไฟล์สำหรับทดสอบ Import

* `/backend/for-test/100books.xlsx`
* `/backend/for-test/300books.xlsx`

---

## 💡 Roadmap & ไอเดียต่อยอด

* ✅ ระบบ login/signup ด้วย JWT
* 🔍 ค้นหา / จัดหมวดหมู่หนังสือ
* ⬆️ Drag & Drop Upload
* 🧠 รองรับ AI แนะนำหนังสือ
* 🌐 Deploy ระบบขึ้น Vercel + Render หรือ Railway

---

## 👨‍💻 ผู้พัฒนา

* \[Your Name or Team Name]
* 🌐 Project for \[Organization / Hackathon / Personal Learning]

---

## 📬 ติดต่อ/ข้อเสนอแนะ

เปิด Issue หรือ Pull Request ได้เลย 🙌
ขอบคุณที่แวะมาเยี่ยมชม ❤️

```