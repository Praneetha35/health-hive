import { z } from "zod";
import { ObjectId } from "bson";

// Define the schema for an individual goal
const TaskSchema = z.object({
    name: z.string().min(1).max(1000),
    isCompleted: z.boolean(),
});

// Define the schema for an individual goal
const GoalSchema = z.object({
    goalName: z.string().min(1).max(100), // Goal name must be between 1 and 100 characters
    progress: z.number().min(0).max(100), // Progress should be between 0 and 100 percent
    startDate: z.string(), // Start date as a string (could be ISO date)
    endDate: z.string(), // End date as a string (could be ISO date)
    tasks: z.array(TaskSchema).optional(),
});

export const UserRegistrationSchema = z.object({
    name: z.string().min(1).max(50),
    email: z.string().email(),
    password: z.string().min(1).max(100),
    goals: z.array(GoalSchema).optional(),
});

export const UserModelSchema = UserRegistrationSchema.extend({
    _id: z.custom<ObjectId>().transform((id) => id.toString()),
    about: z.string().min(1).max(2000).default(" "),
    emailVerified: z.boolean().default(false),
    createdAt: z.date().default(new Date()),
});

export type UserRegistrationSchemaType = z.infer<typeof UserRegistrationSchema>;

export type UserModelSchemaType = z.infer<typeof UserModelSchema>;
