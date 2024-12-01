import { createApp } from "./app";
import { config } from "./config/config";

createApp()
  .then((app) => {
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start the server:", error);
  });
