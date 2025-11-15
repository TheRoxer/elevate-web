/**
 * React Query Hook for Chart Data
 *
 * This file contains the React Query hook for fetching chart data.
 */

import { useQuery } from "@tanstack/react-query";
import { chartDataService } from "@/services/chartDataService";
import { queryKeys } from "@/lib/queryKeys";

/**
 * Fetch chart data
 */
export const useChartDataQuery = () => {
  return useQuery({
    queryKey: queryKeys.chartData.all,
    queryFn: () => chartDataService.fetchWeeklyChartData(),
    staleTime: 5 * 60 * 1000, // 5 minutes (chart data changes slowly)
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
