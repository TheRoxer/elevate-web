import { supabase } from "@/lib/supabase";
import {
  ChartDataSchema,
  validateData,
  type ChartDataPoint,
} from "@/types/schemas";

export class ChartServiceError extends Error {
  constructor(message: string, public code?: string, public details?: unknown) {
    super(message);
    this.name = "ChartServiceError";
  }
}

export class ChartDataService {
  static async fetchWeeklyChartData(): Promise<ChartDataPoint[]> {
    try {
      const { data, error } = await supabase
        .from("chart_data")
        .select("name, average, today")
        .order("date", { ascending: true })
        .limit(7);

      if (error) {
        throw new ChartServiceError(
          "Failed to fetch chart data",
          error.code,
          error.message
        );
      }

      if (!data || data.length === 0) {
        return [
          { name: "Mon", average: 400, today: 240 },
          { name: "Tue", average: 300, today: 139 },
          { name: "Wed", average: 200, today: 980 },
          { name: "Thu", average: 278, today: 390 },
          { name: "Fri", average: 189, today: 480 },
          { name: "Sat", average: 239, today: 380 },
          { name: "Sun", average: 349, today: 430 },
        ];
      }

      type ChartDataRow = { name: string; average: number; today: number };
      const chartData = (data as unknown as ChartDataRow[]).map((item) => ({
        name: item.name,
        average: Number(item.average),
        today: Number(item.today),
      }));

      return validateData(ChartDataSchema, chartData, "chart data");
    } catch (error) {
      if (error instanceof ChartServiceError) {
        throw error;
      }
      throw new ChartServiceError(
        "Unexpected error fetching chart data",
        "UNKNOWN_ERROR",
        error
      );
    }
  }
}

export const chartDataService = ChartDataService;
