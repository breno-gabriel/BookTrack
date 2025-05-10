import express, {
    type Express,
    type Request,
    type Response
} from "express";
import cors from "cors";
import { authRouter } from "./routes/authRoutes";
import { userRouter } from "./routes/userRoutes";

const app: Express = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true 
}));

app.use('/auth', authRouter)
app.use('/user', userRouter)

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello nodejs" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});