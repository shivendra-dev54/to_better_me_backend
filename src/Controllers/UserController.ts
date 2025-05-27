import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import DailyEntrySchema from "../Models/DailyEntryModel";
import UserSchema from "../Models/UserModel";

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


    const entry = await DailyEntrySchema.create({
        userId: req.user.id,
        date: new Date(date),
        sleepHours,
        summary,
    });

    res.status(201).json(entry);
});





//@desc GET to get all entries of a user
//@route /api/user/get_all_entries
//@access private
const get_all_entries = asyncHandler(async (req: CustomRequest, res: Response) => {
    const entries = await DailyEntrySchema.find({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json(entries);
});




//@desc DELETE to delete any entry
//@route /api/user/delete_entry/:id
//@access private
const delete_entry = asyncHandler(async (req: CustomRequest, res: Response) => {
    const id = req.params.id;
    const entry = await DailyEntrySchema.findById(id);

    if (!entry) {
        res.status(404);
        throw new Error("Entry not found");
    }

    if (entry.userId !== req.user.id) {
        res.status(403);
        throw new Error("Not authorized to delete this entry");
    }

    await entry.deleteOne();

    res.status(200).json({ message: "Entry deleted", id });
});




//@desc GET to get signed in user info
//@route /api/user/get_current
//@access private
const get_current = asyncHandler(async (req: CustomRequest, res: Response) => {
    // Delete all users where isSpecial is false
    const nonSpecialUsers = await UserSchema.find({ isSpecial: false });

    const userIdsToDelete = nonSpecialUsers.map(user => user._id);

    // Delete their corresponding daily entries
    await DailyEntrySchema.deleteMany({ userId: { $in: userIdsToDelete } });

    // Delete the users themselves
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
    delete_entry
};
