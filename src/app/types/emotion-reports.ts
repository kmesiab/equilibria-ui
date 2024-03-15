export interface DailyAverage {
  day: string;
  averages: Record<string, number>;
}

export interface HighestEmotion {
  day: string;
  emotion: string;
  value: number;
}
