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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const DailyEntryModel_1 = __importDefault(require("../Models/DailyEntryModel"));
const UserModel_1 = __importDefault(require("../Models/UserModel"));
//@desc POST to add daily entries 
//@route /api/user/daily_entry
//@access private
const daily_entry = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, sleepHours, summary } = req.body;
    if (!date || !sleepHours || !summary) {
        res.status(400);
        throw new Error("Please provide date, sleepHours, and summary.");
    }
    const entry = yield DailyEntryModel_1.default.create({
        userId: req.user.id,
        date: new Date(date),
        sleepHours,
        summary,
    });
    res.status(201).json(entry);
}));
//@desc GET to get all entries of a user
//@route /api/user/get_all_entries
//@access private
const get_all_entries = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const entries = yield DailyEntryModel_1.default.find({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json(entries);
}));
//@desc DELETE to delete any entry
//@route /api/user/delete_entry/:id
//@access private
const delete_entry = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const entry = yield DailyEntryModel_1.default.findById(id);
    if (!entry) {
        res.status(404);
        throw new Error("Entry not found");
    }
    if (entry.userId !== req.user.id) {
        res.status(403);
        throw new Error("Not authorized to delete this entry");
    }
    yield entry.deleteOne();
    res.status(200).json({ message: "Entry deleted", id });
}));
//@desc GET to get signed in user info
//@route /api/user/get_current
//@access private
const get_current = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Delete all users where isSpecial is false
    const nonSpecialUsers = yield UserModel_1.default.find({ isSpecial: false });
    const userIdsToDelete = nonSpecialUsers.map(user => user._id);
    // Delete their corresponding daily entries
    yield DailyEntryModel_1.default.deleteMany({ userId: { $in: userIdsToDelete } });
    // Delete the users themselves
    yield UserModel_1.default.deleteMany({ _id: { $in: userIdsToDelete } });
    res.status(200).json({
        message: "Deleted all non-special users and their entries",
        deletedUsersCount: userIdsToDelete.length,
        currentUser: req.user
    });
}));
exports.default = {
    get_all_entries,
    get_current,
    daily_entry,
    delete_entry
};
