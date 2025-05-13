var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_express4 = __toESM(require("express"), 1);
var import_cors = __toESM(require("cors"), 1);

// src/routes/authRoutes.ts
var import_express = require("express");

// src/services/AuthService.ts
var import_bcrypt = __toESM(require("bcrypt"), 1);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);

// src/config/jwt.ts
var jwt_default = {
  secret: process.env.JWT_SECRET || "segredo",
  expiresIn: 60 * 60 * 2
};

// src/dto/user.ts
var import_zod = __toESM(require("zod"), 1);
var createUserSchema = import_zod.default.object({
  name: import_zod.default.string().min(3, "Name must have at least 3 characters"),
  email: import_zod.default.string().email("Digite um email v\xE1lido"),
  password: import_zod.default.string().min(8, "Password must have at least 8 characters")
});
var loginUserSchema = import_zod.default.object({
  email: import_zod.default.string().email("Digite um email v\xE1lido"),
  password: import_zod.default.string().min(8, "Password must have at least 8 characters")
});

// src/db/index.ts
var import_config = require("dotenv/config");
var import_node_postgres = require("drizzle-orm/node-postgres");
var db = (0, import_node_postgres.drizzle)(process.env.DATABASE_URL, { casing: "snake_case" });
var db_default = db;

// src/db/schema.ts
var import_pg_core = require("drizzle-orm/pg-core");
var usersTable = (0, import_pg_core.pgTable)("users", {
  id: (0, import_pg_core.integer)().primaryKey().generatedAlwaysAsIdentity(),
  name: (0, import_pg_core.varchar)({ length: 255 }).notNull(),
  email: (0, import_pg_core.varchar)({ length: 255 }).notNull().unique(),
  password: (0, import_pg_core.varchar)({ length: 255 }).notNull()
});
var bookTable = (0, import_pg_core.pgTable)("books", {
  id: (0, import_pg_core.integer)().primaryKey().generatedAlwaysAsIdentity(),
  user_id: (0, import_pg_core.integer)().notNull().references(() => usersTable.id),
  title: (0, import_pg_core.varchar)({ length: 255 }).notNull(),
  author: (0, import_pg_core.varchar)({ length: 255 }),
  status: (0, import_pg_core.varchar)({ length: 255 }).notNull(),
  rating: (0, import_pg_core.integer)(),
  conclusion_date: (0, import_pg_core.varchar)({ length: 255 })
});

// src/repositories/userRepository.ts
var import_drizzle_orm = require("drizzle-orm");
function getUserByEmail(email) {
  return db_default.select().from(usersTable).where((0, import_drizzle_orm.eq)(usersTable.email, email));
}
function insertUser(name, email, password) {
  return db_default.insert(usersTable).values({ name, email, password });
}
function getUserById(id) {
  return db_default.select().from(usersTable).where((0, import_drizzle_orm.eq)(usersTable.id, id));
}
function getAllUsers() {
  return db_default.select().from(usersTable);
}
function deleteUserById(id) {
  return db_default.delete(usersTable).where((0, import_drizzle_orm.eq)(usersTable.id, id));
}

// src/services/AuthService.ts
async function validateUserRegister({ name, email, password }) {
  const result = createUserSchema.safeParse({ name, email, password });
  if (!result.success) {
    return { code: 400, message: result.error.format() };
  }
  const user = await getUserByEmail(email);
  if (user.length > 0) {
    return { code: 400, message: "User already exists" };
  }
  const hashedPassword = await import_bcrypt.default.hash(password, 10);
  await insertUser(name, email, hashedPassword);
  return {
    code: 201,
    message: "User created successfully"
  };
}
async function validateUserLogin({ email, password }) {
  const user = await getUserByEmail(email);
  loginUserSchema.parse({ email, password });
  if (user.length == 0 || !await import_bcrypt.default.compare(password, user[0].password)) {
    return { code: 400, message: "wrong email or password" };
  }
  const token = import_jsonwebtoken.default.sign(
    { id: user[0].id, name: user[0].name, email: user[0].email },
    jwt_default.secret,
    { expiresIn: jwt_default.expiresIn }
  );
  return {
    code: 200,
    message: "User logged in successfully",
    token
  };
}

// src/controllers/authController.ts
async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    const result = await validateUserRegister({ name, email, password });
    res.status(result.code).json({ message: result.message });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const result = await validateUserLogin({ email, password });
    res.status(result.code).json({ message: result.message, token: result.token });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// src/routes/authRoutes.ts
var authRouter = (0, import_express.Router)();
authRouter.post("/register", register);
authRouter.post("/login", login);

// src/routes/userRoutes.ts
var import_express2 = require("express");

// src/services/userService.ts
function getAllUsersService() {
  return getAllUsers();
}
function getUserByIdService(id) {
  return getUserById(id);
}
function deleteUserByIdService(id) {
  return deleteUserById(id);
}

// src/controllers/userController.ts
async function getAllUsersController(req, res) {
  try {
    const user = await getAllUsersService();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function getUserByIdController(req, res) {
  try {
    const user = await getUserByIdService(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function deleteUserByIdController(req, res) {
  try {
    const user = await deleteUserByIdService(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// src/middlewares/authMiddleware.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"), 1);
var authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(401).json({ message: "Token is required" });
    return;
  }
  try {
    const decode = import_jsonwebtoken2.default.decode(token, jwt_default.secret);
    req.user = decode;
    console.log(req.user);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Token is invalid" });
  }
};

// src/routes/userRoutes.ts
var userRouter = (0, import_express2.Router)();
userRouter.get("/", authenticateToken, getAllUsersController);
userRouter.get("/:id", authenticateToken, getUserByIdController);
userRouter.delete("/delete/:id", authenticateToken, deleteUserByIdController);

// src/routes/bookRoutes.ts
var import_express3 = require("express");

// src/dto/book.ts
var import_zod2 = require("zod");
var StatusEnum = import_zod2.z.enum(["Quero Ler", "Lendo", "Lido"]);
var bookSchema = import_zod2.z.object({
  title: import_zod2.z.string().min(3, "T\xEDtulo deve ter no m\xEDnimo 3 caracteres").max(100, "T\xEDtulo deve ter no m\xE1ximo 100 caracteres"),
  author: import_zod2.z.string().optional(),
  status: StatusEnum,
  rating: import_zod2.z.number().int().min(1, "Avalia\xE7\xE3o deve ser no m\xEDnimo 1").max(5, "Avalia\xE7\xE3o deve ser no m\xE1ximo 5").optional().nullable()
}).superRefine((data, ctx) => {
  const isRead = data.status === "Lido";
  const hasRating = data.rating !== null;
  if (hasRating && !isRead) {
    ctx.addIssue({
      path: ["rating"],
      message: "S\xF3 \xE9 poss\xEDvel avaliar livros com status 'Lido'",
      code: import_zod2.z.ZodIssueCode.custom
    });
  }
});

// src/repositories/bookRepository.ts
var import_drizzle_orm2 = require("drizzle-orm");
async function createBookRepository({ title, author, status, rating }, user_id, conclusion_date) {
  await db_default.insert(bookTable).values({
    title,
    author,
    status,
    rating,
    user_id: Number(user_id),
    conclusion_date
  });
}
async function getBooksRepository() {
  const books = await db_default.select().from(bookTable);
  return books;
}
async function getBookByIdRepository(id) {
  const book = await db_default.select().from(bookTable).where((0, import_drizzle_orm2.eq)(bookTable.id, Number(id)));
  return book[0];
}
async function deleteBookRepository(id) {
  const result = await db_default.delete(bookTable).where((0, import_drizzle_orm2.eq)(bookTable.id, Number(id)));
  return result;
}
async function updateBookRepository(id, { title, author, status, rating }, conclusion_date) {
  const result = await db_default.update(bookTable).set({ title, author, status, rating, conclusion_date }).where((0, import_drizzle_orm2.eq)(bookTable.id, Number(id)));
  return result;
}

// src/services/bookService.ts
var import_json2csv = require("json2csv");
async function createBookService({ title, author, status, rating }, user_id) {
  const result = bookSchema.safeParse({
    title,
    author,
    status,
    rating
  });
  if (!result.success) {
    return { status: 400, message: result.error.format() };
  }
  let conclusion_date = null;
  if (status == "Lido" /* LIDO */) {
    conclusion_date = (/* @__PURE__ */ new Date()).toISOString();
  }
  console.log(result.data);
  const book = await createBookRepository(
    result.data,
    user_id,
    conclusion_date
  );
  return { status: 201, message: "Livro criado com sucesso" };
}
async function getBooksService() {
  return await getBooksRepository();
}
async function getBookByIdService(id) {
  return await getBookByIdRepository(id);
}
async function deleteBookService(id, user_id) {
  const book = await getBookByIdRepository(id);
  if (!book) {
    return { status: 404, message: "Livro n\xE3o encontrado" };
  }
  if (+user_id != book.user_id) {
    return {
      status: 401,
      message: "Voc\xEA n\xE3o tem permiss\xE3o para deletar este livro"
    };
  }
  await deleteBookRepository(id);
  return { status: 200, message: "Livro deletado com sucesso" };
}
async function updateBookService(id, { title, author, status, rating }, user_id) {
  const book = await getBookByIdService(id);
  if (!book) {
    return { status: 404, message: "Livro n\xE3o encontrado" };
  }
  if (+user_id != book.user_id) {
    return {
      status: 401,
      message: "Voc\xEA n\xE3o tem permiss\xE3o para atualizar este livro"
    };
  }
  if (book.status == "Lido" /* LIDO */) {
    return { status: 400, message: "N\xE3o \xE9 poss\xEDvel atualizar um livro lido" };
  }
  const result = bookSchema.safeParse({
    title,
    author,
    status,
    rating
  });
  if (!result.success) {
    return { status: 400, message: result.error.format() };
  }
  let conclusion_date = null;
  if (status == "Lido" /* LIDO */) {
    conclusion_date = (/* @__PURE__ */ new Date()).toISOString();
  }
  await updateBookRepository(id, result.data, conclusion_date);
  return { status: 200, message: "Livro atualizado com sucesso" };
}
async function getBooksByUserIdService(user_id) {
  const user = await getUserById(user_id);
  if (!user) {
    return { status: 404, message: "Usu\xE1rio n\xE3o encontrado" };
  }
  const books = await getBooksRepository();
  const userBooks = books.filter((book) => book.user_id == user_id);
  return userBooks;
}
async function exportBooksService(user_id) {
  const user = await getUserById(user_id);
  if (!user) {
    return { status: 404, message: "Usu\xE1rio n\xE3o encontrado" };
  }
  const books = await getBooksByUserIdService(user_id);
  const fields = ["title", "author", "status", "rating", "conclusion_date"];
  const json2csv = new import_json2csv.Parser({ fields, header: true });
  const csv = json2csv.parse(books);
  return csv;
}

// src/controllers/bookController.ts
async function createBookController(req, res) {
  try {
    const { title, author, status, rating } = req.body;
    const user_id = req.user.id;
    const result = await createBookService(
      { title, author, status, rating },
      user_id
    );
    res.status(result.status).json({ message: result.message });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function getBooksController(req, res) {
  try {
    const books = await getBooksService();
    res.json({ message: "Livros encontrados", books });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function getBookByIdController(req, res) {
  try {
    const book = await getBookByIdService(req.params.id);
    res.json({ message: "Livro encontrado", book });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function deleteBookController(req, res) {
  try {
    const result = await deleteBookService(req.params.id, req.user.id);
    res.status(result.status).json({ message: result.message });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function updateBookController(req, res) {
  try {
    const { title, author, status, rating } = req.body;
    const user_id = req.user.id;
    console.log(user_id);
    const result = await updateBookService(
      req.params.id,
      {
        title,
        author,
        status,
        rating
      },
      user_id
    );
    res.status(result.status).json({ message: result.message });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function getBooksByUserIdController(req, res) {
  try {
    const books = await getBooksByUserIdService(req.params.id);
    res.json({ message: "Livros encontrados", books });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function exportBooksController(req, res) {
  try {
    const booksCsv = await exportBooksService(req.params.id);
    res.header("Content-Type", "text/csv");
    res.attachment("meus_livros.csv");
    res.send(booksCsv);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// src/routes/bookRoutes.ts
var bookRouter = (0, import_express3.Router)();
bookRouter.post("/create", authenticateToken, createBookController);
bookRouter.get("/", authenticateToken, getBooksController);
bookRouter.get("/:id", authenticateToken, getBookByIdController);
bookRouter.delete("/delete/:id", authenticateToken, deleteBookController);
bookRouter.put("/update/:id", authenticateToken, updateBookController);
bookRouter.get("/user/:id", authenticateToken, getBooksByUserIdController);
bookRouter.get("/export_csv/:id", authenticateToken, exportBooksController);

// src/index.ts
var app = (0, import_express4.default)();
app.use(import_express4.default.json());
app.use(
  (0, import_cors.default)({
    origin: process.env.CORS_ORIGIN,
    credentials: true
  })
);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/books", bookRouter);
app.get("/", (req, res) => {
  res.json({ message: "Hello nodejs" });
});
app.listen(process.env.PORT || 3e3, () => {
  console.log("Server is running on port 3000");
});
