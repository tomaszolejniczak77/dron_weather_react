import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.production.APP_REACT_APP_API_KEY":
      process.env.APP_REACT_APP_API_KEY,
  },
});
