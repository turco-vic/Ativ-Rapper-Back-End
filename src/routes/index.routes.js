import { Router } from "express";

import rappersRoutes from "./rappers.routes.js";

const routes = Router ();

routes.get("/", (req, res) => {
    return res.status(200).send({ message: "Servidor Insano!" });
  });

  routes.use("/rappers", rappersRoutes);

export default routes;