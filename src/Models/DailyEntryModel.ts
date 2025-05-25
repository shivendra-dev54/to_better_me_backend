import mongoose, { Schema } from "mongoose";

interface DailyEntry {
    userId: string;
    date: Date;
    sleepHours: {
        start: Date;
        end: Date;
        isExtra: boolean;
    }[];
    summary: string;
}

const DailyEntryModel: Schema<DailyEntry> = new mongoose.Schema({
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

const DailyEntrySchema =
    (mongoose.models.DailyEntry as mongoose.Model<DailyEntry>) ||
    mongoose.model<DailyEntry>("dailyEntry", DailyEntryModel);

export default DailyEntrySchema;
