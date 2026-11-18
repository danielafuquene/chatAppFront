import * as SQLite from "expo-sqlite";
import type { ChatListItem } from "../types/chatList";

const DATABASE_NAME = "chats.db";

type ChatListRow = {
  id: string;
  other_participant_id: string;
  display_name: string;
  email: string;
  last_message_date: string;
};

let databasePromise: Promise<SQLite.SQLiteDatabase> | null = null;

function openChatDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!databasePromise) {
    databasePromise = SQLite.openDatabaseAsync(DATABASE_NAME)
      .then(async (db) => {
        await db.execAsync(`
          PRAGMA journal_mode = WAL;
          CREATE TABLE IF NOT EXISTS chat_list (
            position INTEGER NOT NULL,
            id TEXT PRIMARY KEY NOT NULL,
            other_participant_id TEXT NOT NULL,
            display_name TEXT NOT NULL,
            email TEXT NOT NULL,
            last_message_date TEXT NOT NULL
          );
        `);
        return db;
      })
      .catch((error: unknown) => {
        databasePromise = null;
        throw error;
      });
  }
  return databasePromise;
}

export async function readChatList(): Promise<ChatListItem[]> {
  const db = await openChatDatabase();
  const rows = await db.getAllAsync<ChatListRow>(
    `SELECT id, other_participant_id, display_name, email, last_message_date
     FROM chat_list
     ORDER BY position ASC`,
  );
  return rows.map((row) => ({
    id: row.id,
    otherParticipantId: row.other_participant_id,
    displayName: row.display_name,
    email: row.email,
    lastMessageDate: row.last_message_date,
  }));
}

export async function replaceChatList(items: readonly ChatListItem[]): Promise<void> {
  const db = await openChatDatabase();
  await db.withTransactionAsync(async () => {
    await db.runAsync("DELETE FROM chat_list");
    for (let position = 0; position < items.length; position += 1) {
      const item = items[position];
      await db.runAsync(
        `INSERT INTO chat_list (
          position,
          id,
          other_participant_id,
          display_name,
          email,
          last_message_date
        ) VALUES (?, ?, ?, ?, ?, ?)`,
        position,
        item.id,
        item.otherParticipantId,
        item.displayName,
        item.email,
        item.lastMessageDate,
      );
    }
  });
}
