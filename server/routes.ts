import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { teacherLoginSchema, insertSlotSchema, insertBookingSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Teacher authentication
  app.post("/api/teacher/login", async (req, res) => {
    try {
      const { email, password } = teacherLoginSchema.parse(req.body);
      const teacher = await storage.getTeacherByEmail(email);
      
      if (!teacher || teacher.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      res.json({ teacher: { ...teacher, password: undefined } });
    } catch (error) {
      res.status(400).json({ message: "Invalid request data" });
    }
  });

  // Get all teachers with their slots
  app.get("/api/teachers", async (req, res) => {
    try {
      const teachers = await storage.getAllTeachers();
      const teachersWithSlots = await Promise.all(
        teachers.map(async (teacher) => {
          const slots = await storage.getSlotsByTeacher(teacher.id);
          const availableSlots = slots.filter(slot => !slot.isBooked);
          return {
            ...teacher,
            password: undefined,
            availableSlots,
            totalSlots: slots.length,
          };
        })
      );
      res.json(teachersWithSlots);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch teachers" });
    }
  });

  // Get teacher slots
  app.get("/api/teacher/:teacherId/slots", async (req, res) => {
    try {
      const { teacherId } = req.params;
      const slots = await storage.getSlotsByTeacher(teacherId);
      
      const slotsWithBookings = await Promise.all(
        slots.map(async (slot) => {
          const bookings = await storage.getBookingsBySlot(slot.id);
          return {
            ...slot,
            booking: bookings[0] || null,
          };
        })
      );
      
      res.json(slotsWithBookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch slots" });
    }
  });

  // Create slot
  app.post("/api/slots", async (req, res) => {
    try {
      const slotData = insertSlotSchema.parse(req.body);
      const slot = await storage.createSlot(slotData);
      res.status(201).json(slot);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid slot data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create slot" });
    }
  });

  // Delete slot
  app.delete("/api/slots/:slotId", async (req, res) => {
    try {
      const { slotId } = req.params;
      const deleted = await storage.deleteSlot(slotId);
      
      if (!deleted) {
        return res.status(404).json({ message: "Slot not found" });
      }
      
      res.json({ message: "Slot deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete slot" });
    }
  });

  // Book slot
  app.post("/api/bookings", async (req, res) => {
    try {
      const bookingData = insertBookingSchema.parse(req.body);
      
      // Check if slot exists and is available
      const slot = await storage.getSlot(bookingData.slotId);
      if (!slot) {
        return res.status(404).json({ message: "Slot not found" });
      }
      
      if (slot.isBooked) {
        return res.status(409).json({ message: "Slot is already booked" });
      }
      
      const booking = await storage.createBooking(bookingData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create booking" });
    }
  });

  // Get all available slots for students
  app.get("/api/slots/available", async (req, res) => {
    try {
      const availableSlots = await storage.getAllAvailableSlots();
      const teachers = await storage.getAllTeachers();
      
      const slotsWithTeachers = availableSlots.map(slot => {
        const teacher = teachers.find(t => t.id === slot.teacherId);
        return {
          ...slot,
          teacher: teacher ? { ...teacher, password: undefined } : null,
        };
      });
      
      res.json(slotsWithTeachers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch available slots" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
