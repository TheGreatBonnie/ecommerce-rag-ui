import { cn } from "@/lib/utils";
import {
  CheckIcon,
  LoaderCircle,
  FilterIcon,
  Clock,
  Search,
} from "lucide-react";
import { AgentState } from "@/lib/types";
// import { truncateUrl } from "@/lib/utils";

export function Progress({
  logs,
  state,
}: {
  logs: {
    message: string;
    done: boolean;
  }[];
  state?: Partial<AgentState>;
}) {
  if (logs.length === 0 && (!state || state.progress_percentage === 0)) {
    return null;
  }

  return (
    <div data-test-id="progress-steps" className="mb-4">
      {/* Search Progress Info */}
      {state && state.current_query && (
        <div className="mb-3 border border-slate-200 bg-slate-100/30 shadow-md rounded-lg p-3 text-sm">
          <div className="flex items-center gap-2 font-medium mb-2">
            <Search className="w-4 h-4" />
            <span>Searching: {state.current_query}</span>
          </div>

          {/* Progress bar */}
          {(state.progress_percentage ?? 0) > 0 && (
            <div className="mb-2">
              <div className="text-xs text-slate-600 mb-1 flex justify-between">
                <span>{state.search_stage || "Processing"}</span>
                <span>{state.progress_percentage}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${state.progress_percentage}%` }}></div>
              </div>
            </div>
          )}

          {/* Search stats */}
          <div className="grid grid-cols-2 gap-2 text-xs mt-3">
            {(state.matched_products_count ?? 0) > 0 && (
              <div className="flex items-center gap-1">
                <span className="text-slate-600">Products found:</span>
                <span className="font-medium">
                  {state.matched_products_count}
                </span>
              </div>
            )}

            {(state.filtered_products_count ?? 0) > 0 &&
              state.filtered_products_count !==
                state.matched_products_count && (
                <div className="flex items-center gap-1">
                  <span className="text-slate-600">After filtering:</span>
                  <span className="font-medium">
                    {state.filtered_products_count}
                  </span>
                </div>
              )}

            {(state?.processing_time ?? 0) > 0 && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-600" />
                <span className="text-slate-600">Time:</span>
                <span className="font-medium">
                  {(state.processing_time ?? 0).toFixed(2)}s
                </span>
              </div>
            )}

            {state.active_filters &&
              Object.keys(state.active_filters).length > 0 && (
                <div className="col-span-2 mt-1">
                  <div className="flex items-center gap-1 mb-1">
                    <FilterIcon className="w-3 h-3 text-slate-600" />
                    <span className="text-slate-600">Active filters:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(state.active_filters).map(
                      ([key, value]) => (
                        <span
                          key={key}
                          className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md text-xs">
                          {key.replace(/_/g, " ")}: {value}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}
          </div>

          {/* Error message */}
          {state.error_message && (
            <div className="mt-2 text-red-500 text-xs bg-red-50 p-2 rounded">
              {state.error_message}
            </div>
          )}
        </div>
      )}

      {/* Individual log steps */}
      <div className="border border-slate-200 bg-slate-100/30 shadow-md rounded-lg overflow-hidden text-sm py-2">
        {logs.map((log, index) => (
          <div
            key={index}
            data-test-id="progress-step-item"
            className={`flex ${
              log.done || index === logs.findIndex((log) => !log.done)
                ? ""
                : "opacity-50"
            }`}>
            <div className="w-8">
              <div
                className="w-4 h-4 bg-slate-700 flex items-center justify-center rounded-full mt-[10px] ml-[12px]"
                data-test-id={
                  log.done
                    ? "progress-step-item_done"
                    : "progress-step-item_loading"
                }>
                {log.done ? (
                  <CheckIcon className="w-3 h-3 text-white" />
                ) : (
                  <LoaderCircle className="w-3 h-3 text-white animate-spin" />
                )}
              </div>
              {index < logs.length - 1 && (
                <div
                  className={cn("h-full w-[1px] bg-slate-200 ml-[20px]")}></div>
              )}
            </div>
            <div className="flex-1 flex justify-center py-2 pl-2 pr-4">
              <div className="flex-1 flex items-center text-xs">
                {log.message}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
