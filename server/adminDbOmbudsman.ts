import { eq } from "drizzle-orm";
import { getDb } from "./db";
import { ombudsmanMessages } from "../drizzle/schema";

export async function getAllOmbudsmanMessages() {
  const db = await getDb();
  if (!db) throw new Error("Database not initialized");
  return db.select().from(ombudsmanMessages).orderBy(ombudsmanMessages.createdAt);
}

export async function createOmbudsmanMessage(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not initialized");
  const [result] = await db.insert(ombudsmanMessages).values(data);
  return result;
}

export async function updateOmbudsmanMessage(
  id: number,
  data: {
    status?: "pending" | "in_review" | "resolved" | "closed";
    response?: string;
    notes?: string;
  }
) {
  const db = await getDb();
  if (!db) throw new Error("Database not initialized");
  await db.update(ombudsmanMessages).set(data).where(eq(ombudsmanMessages.id, id));
}

export async function deleteOmbudsmanMessage(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not initialized");
  await db.delete(ombudsmanMessages).where(eq(ombudsmanMessages.id, id));
}
