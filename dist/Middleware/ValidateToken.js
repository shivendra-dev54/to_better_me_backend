"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../Models/UserModel"));
const validateTokens = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        const token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (err || !(decoded === null || decoded === void 0 ? void 0 : decoded.username)) {
                return res.status(403).json({ message: 'Invalid or expired token' });
            }
            try {
                // Fetch full user from DB, exclude password
                const user = yield UserModel_1.default.findOne({ username: decoded.username }).select('-password');
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                // Assign full user object to req.user
                req.user = user;
                next();
            }
            catch (error) {
                return res.status(500).json({ message: 'Error retrieving user' });
            }
        }));
    }
    else {
        res.status(401).json({ message: 'Authorization token is required' });
    }
});
exports.default = validateTokens;
