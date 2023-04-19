import { notes, categories } from "./services.js";

export function configure(app) {
  app.get("/notes", notes.list);
  app.get("/notes/:id", notes.get);
  app.post("/notes", notes.insert);
  app.delete("/notes/:id", notes.delete);
  app.put("/notes/:id", notes.update);
  app.get("/categories", categories.list);
  app.get("/categories/:id", categories.get);
  app.post("/categories", categories.insert);
  app.delete("/categories/:id", categories.delete);
  app.put("/categories/:id", categories.update);
}
