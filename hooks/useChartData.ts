"use client";

import { useState, useEffect, useCallback } from "react";
import {
  chartDataService,
  ChartServiceError,
} from "@/services/chartDataService";
import type { ChartDataPoint } from "@/types/schemas";

interface UseChartDataState {
  data: ChartDataPoint[];
  loading: boolean;
  error: string | null;
}

interface UseChartDataReturn extends UseChartDataState {
  refetch: () => Promise<void>;
}

export const useChartData = (): UseChartDataReturn => {
  const [state, setState] = useState<UseChartDataState>({
    data: [],
    loading: true,
    error: null,
  });

  const fetchChartData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const data = await chartDataService.fetchWeeklyChartData();
      setState({ data, loading: false, error: null });
    } catch (error) {
      const errorMessage =
        error instanceof ChartServiceError
          ? error.message
          : "Failed to fetch chart data";
      setState((prev) => ({ ...prev, loading: false, error: errorMessage }));
      console.error("Error fetching chart data:", error);
    }
  }, []);

  useEffect(() => {
    fetchChartData();
  }, [fetchChartData]);

  return {
    ...state,
    refetch: fetchChartData,
  };
};
