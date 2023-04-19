import express from "express";
import cors from "cors";

import { configure } from "./routes.js";

class App {
  constructor() {
    this.app = express();
  }
  setup() {
    this.app.use(cors());
    this.app.use(express.json());
    configure(this.app);
  }
  start() {
    this.app.listen(process.env.PORT, function () {
      console.log(`Servidor rodando na porta ${process.env.PORT}`);
    });
  }
}

export default App;
