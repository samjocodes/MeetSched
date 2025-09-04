import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const teachers = pgTable("teachers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  subject: text("subject").notNull(),
  department: text("department"),
});

export const slots = pgTable("slots", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  teacherId: varchar("teacher_id").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  isBooked: boolean("is_booked").default(false),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slotId: varchar("slot_id").notNull(),
  studentName: text("student_name").notNull(),
  collegeId: text("college_id").notNull(),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const insertTeacherSchema = createInsertSchema(teachers).pick({
  name: true,
  email: true,
  password: true,
  subject: true,
  department: true,
});

export const insertSlotSchema = createInsertSchema(slots).pick({
  teacherId: true,
  date: true,
  time: true,
});

export const insertBookingSchema = createInsertSchema(bookings).pick({
  slotId: true,
  studentName: true,
  collegeId: true,
});

export const teacherLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type Teacher = typeof teachers.$inferSelect;
export type InsertTeacher = z.infer<typeof insertTeacherSchema>;
export type Slot = typeof slots.$inferSelect;
export type InsertSlot = z.infer<typeof insertSlotSchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type TeacherLogin = z.infer<typeof teacherLoginSchema>;
