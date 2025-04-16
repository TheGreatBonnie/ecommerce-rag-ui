export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  inStock: boolean;
}

export type AgentState = {
  // last_search_results: any[];
  logs: any[];
  processing_status: string;
  current_query: string;
  search_stage: string;
  progress_percentage: number;
  active_filters: Record<string, any>;
  matched_products_count: number;
  filtered_products_count: number;
  processing_time: number;
  search_history: Array<{
    query: string;
    timestamp: string;
    result_count: number;
    filters: Record<string, any>;
    products: Product[];
  }>;
  error_message: string;
};
