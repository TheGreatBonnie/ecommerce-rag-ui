"use client";

import ProductGrid from "@/components/product-grid";
import SearchBar from "@/components/search-bar";
import { products } from "@/lib/mock-data";
import { CopilotSidebar } from "@copilotkit/react-ui";
import { AgentState } from "@/lib/types";
import {
  useCoAgent,
  useCoAgentStateRender,
  useCopilotAction,
} from "@copilotkit/react-core";
import { Progress } from "@/components/Progress";

export default function Home() {
  const { state, setState } = useCoAgent<AgentState>({
    name: "ecommerce_agent",
    initialState: {
      // last_search_results: [],
      logs: [],
      processing_status: "idle",
      current_query: "",
      search_stage: "",
      progress_percentage: 0,
      active_filters: {},
      matched_products_count: 0,
      filtered_products_count: 0,
      processing_time: 0,
      search_history: [],
      error_message: "",
    },
  });

  useCoAgentStateRender({
    name: "ecommerce_agent",
    render: ({ state, nodeName, status }) => {
      if (
        !state.logs ||
        (state.logs.length === 0 && state.progress_percentage === 0)
      ) {
        return null;
      }
      return <Progress logs={state.logs} state={state} />;
    },
  });

  return (
    <CopilotSidebar
      defaultOpen={false}
      instructions={
        "You are assisting the user as best as you can. Answer in the best way possible given the data you have."
      }
      onSubmitMessage={async (message) => {
        // clear the logs before starting the new research
        setState({ ...state, logs: [] });
        await new Promise((resolve) => setTimeout(resolve, 30));
      }}
      labels={{
        title: "Sidebar Assistant",
        initial: "How can I help you today?",
      }}>
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <SearchBar />
        </div>
        <h1 className="text-3xl font-bold mb-6">Featured Products</h1>
        <ProductGrid products={products} />
      </main>
    </CopilotSidebar>
  );
}
