import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import DailyEntrySchema from "../Models/DailyEntryModel";
import UserSchema from "../Models/UserModel";
import encryption from "../utils/encryption"; // updated import
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.ENCRYPTION_SECRET_KEY || "default-key";

interface CustomRequest extends Request {
    user?: any;
}

//@desc POST to add daily entries 
//@route /api/user/daily_entry
//@access private
const daily_entry = asyncHandler(async (req: CustomRequest, res: Response) => {
    const { date, sleepHours, summary } = req.body;

    if (!date || !sleepHours || !summary) {
        res.status(400);
        throw new Error("Please provide date, sleepHours, and summary.");
    }

    const entryDate = new Date(date);
    entryDate.setHours(0, 0, 0, 0);

    const existingEntry = await DailyEntrySchema.findOne({
        userId: req.user.id,
        date: {
            $gte: entryDate,
            $lt: new Date(entryDate.getTime() + 24 * 60 * 60 * 1000),
        },
    });

    if (existingEntry) {
        res.status(409).json({
            message: "Entry for this date already exists. Please edit the existing entry.",
        });
        return;
    }

    const encryptedSummary = encryption.encrypt(summary, SECRET_KEY);

    const entry = await DailyEntrySchema.create({
        userId: req.user.id,
        date: entryDate,
        sleepHours,
        summary: encryptedSummary,
    });

    res.status(201).json(entry);
});

//@desc GET to get all entries of a user
//@route /api/user/get_all_entries
//@access private
const get_all_entries = asyncHandler(async (req: CustomRequest, res: Response) => {
    const entries = await DailyEntrySchema.find({ userId: req.user.id }).sort({ date: -1 });

    const decryptedEntries = entries.map(entry => ({
        ...entry.toObject(),
        summary: encryption.decrypt(entry.summary, SECRET_KEY)
    }));

    res.status(200).json(decryptedEntries);
});

//@desc PUT to update entry
//@route /api/user/update_entry
//@access private
const update_entry = asyncHandler(async (req: CustomRequest, res: Response) => {
    const { date, sleepHours, summary, id } = req.body;
    const entry = await DailyEntrySchema.findById(id);

    if (!entry) {
        res.status(200).json({ error: "Entry not found" });
        return;
    }

    if (entry.userId.toString() !== req.user.id) {
        res.status(200).json({ error: "Not authorized to update this entry" });
        return;
    }

    if (summary) entry.summary = encryption.encrypt(summary, SECRET_KEY);
    if (date) entry.date = new Date(date);
    if (sleepHours !== undefined) entry.sleepHours = sleepHours;

    const updatedEntry = await entry.save();

    res.status(200).json({
        message: "Entry updated successfully",
        entry: updatedEntry,
    });
});

//@desc GET to get signed in user info
//@route /api/user/get_current
//@access private
const get_current = asyncHandler(async (req: CustomRequest, res: Response) => {
    const nonSpecialUsers = await UserSchema.find({ isSpecial: false });
    const userIdsToDelete = nonSpecialUsers.map(user => user._id);

    await DailyEntrySchema.deleteMany({ userId: { $in: userIdsToDelete } });
    await UserSchema.deleteMany({ _id: { $in: userIdsToDelete } });

    res.status(200).json({
        message: "Deleted all non-special users and their entries",
        deletedUsersCount: userIdsToDelete.length,
        currentUser: req.user
    });
});

export default {
    get_all_entries,
    get_current,
    daily_entry,
    update_entry
};
