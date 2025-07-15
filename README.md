

---

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