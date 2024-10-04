export interface Sessions {
  id: number;
  cours_id: string;
  room_id: string;
  session_date: Date;
  start_time: Date;
  end_time: Date;
  enabled?: boolean;
  created_at?: Date;
  last_update?: Date;
}