import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;

import colors from "colors";

import { app } from ".";

app.listen(PORT, () => {
  console.log(colors.cyan(`Server started on port: ${PORT}`));
});
