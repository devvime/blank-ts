import express from "express";
import cors from 'cors';
import { serverError } from "@shared/errors/server.error";

import authRoutes from "@app/routes/auth.route";
import userRoutes from "@app/routes/user.route";

const app = express();
app.use(express.json());
app.use(serverError);
app.use(cors());

app.use(authRoutes);
app.use(userRoutes);

app.listen(process.env.PORT || 3333, () => {
  console.log(`Server running on port: ${process.env.PORT || '3333'}`)
});