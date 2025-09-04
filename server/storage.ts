import { type Teacher, type InsertTeacher, type Slot, type InsertSlot, type Booking, type InsertBooking } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Teachers
  getTeacher(id: string): Promise<Teacher | undefined>;
  getTeacherByEmail(email: string): Promise<Teacher | undefined>;
  createTeacher(teacher: InsertTeacher): Promise<Teacher>;
  getAllTeachers(): Promise<Teacher[]>;
  
  // Slots
  getSlot(id: string): Promise<Slot | undefined>;
  getSlotsByTeacher(teacherId: string): Promise<Slot[]>;
  getAllAvailableSlots(): Promise<Slot[]>;
  createSlot(slot: InsertSlot): Promise<Slot>;
  updateSlotBookingStatus(slotId: string, isBooked: boolean): Promise<Slot | undefined>;
  deleteSlot(slotId: string): Promise<boolean>;
  
  // Bookings
  getBooking(id: string): Promise<Booking | undefined>;
  getBookingsBySlot(slotId: string): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  getAllBookings(): Promise<Booking[]>;
}

export class MemStorage implements IStorage {
  private teachers: Map<string, Teacher> = new Map();
  private slots: Map<string, Slot> = new Map();
  private bookings: Map<string, Booking> = new Map();

  constructor() {
    // Initialize with sample teachers
    this.initializeSampleData();
  }

  private async initializeSampleData() {
    // Sample teachers
    const sampleTeachers = [
      { name: "Prof. Mathur", email: "mathur@college.edu", password: "teacher123", subject: "Mathematics", department: "Mathematics Department" },
      { name: "Prof. Singh", email: "singh@college.edu", password: "teacher123", subject: "Data Structures & Algorithms", department: "Computer Science Department" },
      { name: "Prof. Verma", email: "verma@college.edu", password: "teacher123", subject: "Machine Learning", department: "Computer Science Department" },
    ];

    for (const teacher of sampleTeachers) {
      await this.createTeacher(teacher);
    }

    // Sample slots
    const teacherIds = Array.from(this.teachers.values()).map(t => t.id);
    const sampleSlots = [
      { teacherId: teacherIds[0], date: "2024-01-15", time: "9:00 - 10:00" },
      { teacherId: teacherIds[0], date: "2024-01-15", time: "11:00 - 12:00" },
      { teacherId: teacherIds[0], date: "2024-01-16", time: "2:00 - 3:00" },
      { teacherId: teacherIds[1], date: "2024-01-15", time: "10:00 - 11:00" },
      { teacherId: teacherIds[1], date: "2024-01-16", time: "1:00 - 2:00" },
      { teacherId: teacherIds[2], date: "2024-01-15", time: "9:30 - 10:30" },
      { teacherId: teacherIds[2], date: "2024-01-16", time: "12:00 - 1:00" },
    ];

    for (const slot of sampleSlots) {
      await this.createSlot(slot);
    }

    // Sample bookings
    const slots = Array.from(this.slots.values());
    const sampleBookings = [
      { slotId: slots[1].id, studentName: "John Doe", collegeId: "CS2023001" },
      { slotId: slots[6].id, studentName: "Jane Smith", collegeId: "AI2023005" },
    ];

    for (const booking of sampleBookings) {
      await this.createBooking(booking);
    }
  }

  // Teachers
  async getTeacher(id: string): Promise<Teacher | undefined> {
    return this.teachers.get(id);
  }

  async getTeacherByEmail(email: string): Promise<Teacher | undefined> {
    return Array.from(this.teachers.values()).find(teacher => teacher.email === email);
  }

  async createTeacher(insertTeacher: InsertTeacher): Promise<Teacher> {
    const id = randomUUID();
    const teacher: Teacher = { ...insertTeacher, id };
    this.teachers.set(id, teacher);
    return teacher;
  }

  async getAllTeachers(): Promise<Teacher[]> {
    return Array.from(this.teachers.values());
  }

  // Slots
  async getSlot(id: string): Promise<Slot | undefined> {
    return this.slots.get(id);
  }

  async getSlotsByTeacher(teacherId: string): Promise<Slot[]> {
    return Array.from(this.slots.values()).filter(slot => slot.teacherId === teacherId);
  }

  async getAllAvailableSlots(): Promise<Slot[]> {
    return Array.from(this.slots.values()).filter(slot => !slot.isBooked);
  }

  async createSlot(insertSlot: InsertSlot): Promise<Slot> {
    const id = randomUUID();
    const slot: Slot = { 
      ...insertSlot, 
      id, 
      isBooked: false, 
      createdAt: new Date() 
    };
    this.slots.set(id, slot);
    return slot;
  }

  async updateSlotBookingStatus(slotId: string, isBooked: boolean): Promise<Slot | undefined> {
    const slot = this.slots.get(slotId);
    if (slot) {
      slot.isBooked = isBooked;
      this.slots.set(slotId, slot);
      return slot;
    }
    return undefined;
  }

  async deleteSlot(slotId: string): Promise<boolean> {
    return this.slots.delete(slotId);
  }

  // Bookings
  async getBooking(id: string): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async getBookingsBySlot(slotId: string): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(booking => booking.slotId === slotId);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const booking: Booking = { 
      ...insertBooking, 
      id, 
      createdAt: new Date() 
    };
    this.bookings.set(id, booking);
    
    // Update slot booking status
    await this.updateSlotBookingStatus(insertBooking.slotId, true);
    
    return booking;
  }

  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }
}

export const storage = new MemStorage();
