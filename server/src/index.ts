import express, {
    type Express,
    type Request,
    type Response
} from "express";
import cors from "cors";
import { authRouter } from "./routes/authRoutes";
import { userRouter } from "./routes/userRoutes";
import { bookRouter } from "./routes/bookRoutes";

const app: Express = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true 
}));

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/books', bookRouter)

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello nodejs" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});