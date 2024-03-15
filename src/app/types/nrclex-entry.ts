export interface NrcLexEntry {
  id: number;
  user_id: number;
  message_id: number;
  anger: number;
  anticipation: number;
  disgust: number;
  fear: number;
  trust: number;
  joy: number;
  negative: number;
  positive: number;
  sadness: number;
  surprise: number;
  vader_compound: number;
  vader_neg: number;
  vader_neu: number;
  vader_pos: number;
  created_at: string;
  updated_at: string;
}
