import { PrismaClient } from '@prisma/client';

// Note: Prisma v7 requires adapter configuration for SQLite
// This is temporarily disabled. For production, install @prisma/adapter-sqlite
// and configure it properly.

const globalForPrisma = globalThis as unknown as { prisma: any };

export const prisma = globalForPrisma.prisma ?? {
  doctor: { findMany: async () => [], upsert: async () => ({}) },
  appointment: { findMany: async () => [], create: async () => ({}) },
  chatMessage: { create: async () => ({}) },
  contact: { create: async () => ({}) },
};
