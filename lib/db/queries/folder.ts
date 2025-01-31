"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { validate } from "uuid";

import type { DBResponse } from ".";
import type { Folder } from "@/types/db";

import { db } from "..";
import { folders } from "../schema";

/**
 * Get workspace folders
 * @param workspaceId Workspace ID
 * @returns Workspace folders
 */
export const getFolders = async (
  workspaceId: string
): Promise<DBResponse<Folder[]>> => {
  const isValid = validate(workspaceId);

  if (!isValid) return { error: "Invalid workspace ID", data: null };

  try {
    const data = await db
      .select()
      .from(folders)
      .orderBy(folders.createdAt)
      .where(eq(folders.workspaceId, workspaceId));

    return { data, error: null };
  } catch (error) {
    return { error: (error as Error).message, data: null };
  }
};

/**
 * Create a new folder
 * @param folder Folder
 * @returns Created folder
 */
export const createFolder = async (
  folder: Folder
): Promise<DBResponse<Folder>> => {
  try {
    const [data] = await db.insert(folders).values(folder).returning();

    return { data, error: null };
  } catch (error) {
    return { error: (error as Error).message, data: null };
  } finally {
    revalidatePath(`/dashboard/${folder.workspaceId}`);
  }
};

/**
 * Delete folder by ID
 * @param folderId Folder ID
 * @returns Deleted folder
 */
export const deleteFolder = async (
  folderId: string
): Promise<DBResponse<Folder>> => {
  try {
    const [deletedFolder] = await db
      .delete(folders)
      .where(eq(folders.id, folderId))
      .returning();

    return { data: deletedFolder, error: null };
  } catch (error) {
    return { error: (error as Error).message, data: null };
  }
};
