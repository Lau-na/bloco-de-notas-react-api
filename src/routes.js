import { NoteService, CategoryService, LoginService, UserService } from "./services.js";

export function configure(app) {
  app.get("/notes", LoginService.authenticate, NoteService.list);
  app.get("/notes/:id", LoginService.authenticate, NoteService.get);
  app.post("/notes", LoginService.authenticate, NoteService.insert);
  app.delete("/notes/:id", LoginService.authenticate, NoteService.delete);
  app.put("/notes/:id", LoginService.authenticate, NoteService.update);
  app.get("/categories", LoginService.authenticate, CategoryService.list);
  app.get("/categories/:id", LoginService.authenticate, CategoryService.get);
  app.post("/categories", LoginService.authenticate, CategoryService.insert);
  app.delete("/categories/:id", LoginService.authenticate, CategoryService.delete);
  app.put("/categories/:id", LoginService.authenticate, CategoryService.update);
  app.post("/users/me", LoginService.authenticate, UserService.me);
  app.post("/login", LoginService.login);
  // admin only
  app.get("/users", LoginService.authenticate, LoginService.authorize, UserService.list);
}
