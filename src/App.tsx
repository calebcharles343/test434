import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./lib/react-query";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Router from "./Router";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router />
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
