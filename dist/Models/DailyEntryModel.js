"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DailyEntryModel = new mongoose_1.default.Schema({
    userId: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    sleepHours: {
        type: [
            {
                start: {
                    type: Date,
                    required: true,
                },
                end: {
                    type: Date,
                    required: true,
                },
                isExtra: {
                    type: Boolean,
                    required: true,
                },
            },
        ],
        required: true,
    },
});
const DailyEntrySchema = mongoose_1.default.models.DailyEntry ||
    mongoose_1.default.model("dailyEntry", DailyEntryModel);
exports.default = DailyEntrySchema;
