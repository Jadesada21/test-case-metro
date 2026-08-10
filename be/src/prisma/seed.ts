import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const email = process.env.SEED_ADMIN_EMAIL || 'admin@blog.com';
    const password = process.env.SEED_ADMIN_PASSWORD || 'admin1234';
    const username = process.env.SEED_ADMIN_USERNAME || 'superadmin';

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        console.log(`Super Admin (${email}) มีอยู่แล้ว ข้ามการสร้าง`);
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
            role: 'SUPER_ADMIN',
            isActive: true, // Super Admin ต้อง active ทันที ไม่ต้องรออนุมัติ
        },
    });

    console.log('สร้าง Super Admin สำเร็จ:');
    console.log(`  email: ${admin.email}`);
    console.log(`  password: ${password}`);
    console.log(`  username: ${admin.username}`);
}

main()
    .catch((err) => {
        console.error('Seed ล้มเหลว:', err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
