export interface TodoItemDB {
  key?: string;
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  syncUp: boolean;
  dateSyncUp: Date | null;
  dateI: Date;
  dateU: Date;
}
export interface TodoSendItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

