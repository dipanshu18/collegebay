import type { Config } from "tailwindcss";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      container: {
        center: true,
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dracula"],
    darkTheme: "dracula",
  },
};
export default config;
