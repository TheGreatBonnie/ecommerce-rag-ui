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
  /**
   * Initialize and manage the AI assistant agent state
   * useCoAgent hook creates and manages state for the CopilotKit assistant
   *
   * @property {string} name - Unique identifier for this agent instance
   * @property {AgentState} initialState - Initial values for all agent state properties
   */
  const { state, setState } = useCoAgent<AgentState>({
    name: "ecommerce_agent",
    initialState: {
      logs: [], // Logs of agent actions for displaying progress
      processing_status: "idle", // Current processing status of the agent
      current_query: "", // The user's current search query
      search_stage: "", // Current stage of the search process
      progress_percentage: 0, // Progress indicator for current operation
      active_filters: {}, // Applied filters for product search
      matched_products_count: 0, // Number of products matching the search criteria
      filtered_products_count: 0, // Number of products after applying filters
      processing_time: 0, // Time taken to process the request
      search_history: [], // History of previous searches
      error_message: "", // Error message if something goes wrong
    },
  });

  /**
   * Configure how the agent state should be rendered in the UI
   * This callback determines when and how to show the Progress component
   *
   * @property {string} name - Must match the agent name from useCoAgent
   * @property {Function} render - Callback that returns JSX based on agent state
   */
  useCoAgentStateRender({
    name: "ecommerce_agent",
    render: ({ state, nodeName, status }) => {
      // Only show progress if there are logs or progress has started
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
