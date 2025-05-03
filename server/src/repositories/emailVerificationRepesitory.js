import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createOtp(email, otp, ttlSeconds = 1000) {
  return prisma.emailVerification.create({
    data: {
      email,
      otp,
      expiresAt: new Date(Date.now() + ttlSeconds * 1000)
    }
  });
}

export async function verifyOtp(email, otp) {
  const record = await prisma.emailVerification.findFirst({
    where: {
      email,
      otp,
      used: false,
      expiresAt: { gt: new Date() }
    }
  });
  if (!record) throw new Error('Invalid or expired OTP');
  await prisma.emailVerification.update({
    where: { id: record.id },
    data: { used: true }
  });
}
