"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./config/index");
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const exampleRoutes_1 = __importDefault(require("./routes/exampleRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const errorHandler_1 = require("./middleware/errorHandler");
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", exampleRoutes_1.default);
app.use((0, morgan_1.default)("dev"));
app.get("/", (req, res) => {
    res.json({
        message: "hello world",
    });
});
app.use(() => {
    throw (0, http_errors_1.default)(404, "Route Not Found");
});
mongoose_1.default.set('strictQuery', true);
mongoose_1.default
    .connect(index_1.DB_URL)
    .then(() => {
    console.log("Connected to DB");
    app.listen(index_1.PORT, () => {
        console.log(`Server Started on Port ${index_1.PORT}`);
    });
})
    .catch(() => {
    throw (0, http_errors_1.default)(501, "Unable to connect database");
});
app.use(errorHandler_1.errorHandler);
