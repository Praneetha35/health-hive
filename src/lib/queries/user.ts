import bcrypt from "bcryptjs";
import { Db, ObjectId } from "mongodb";
import {
    UserModelSchema,
    type UserModelSchemaType,
} from "../../schema/UserSchema";

interface Task {
    name: string;
    isCompleted: boolean;
}

interface Goal {
    goalName: string;
    progress: number;
    startDate: string;
    endDate: string;
    tasks: Task[];
}

export const findUserForAuth = async (db: Db, userId: string) => {
    const user = await db
        .collection("users")
        .findOne(
            { _id: new ObjectId(userId) },
            { projection: { password: 0 } }
        );
    return user;
};

export const findUserById = async (db: Db, userId: string) =>
    await db
        .collection("users")
        .findOne({ _id: new ObjectId(userId) }, { projection: { password: 0 } })
        .then((user) => user || null);

export const findUserWithEmailAndPassword = async (
    db: Db,
    email: string,
    password: string
) => {
    const user = await db.collection("users").findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        return { ...user };
    }
    return null;
};

export const findUserByEmail = async (db: Db, email: string) =>
    await db
        .collection("users")
        .findOne({ email })
        .then((user) => user || null);

export const insertUser = async (
    db: Db,
    data: Pick<UserModelSchemaType, "email" | "password" | "name">
) => {
    const parsedData = UserModelSchema.omit({
        name: true,
        email: true,
        password: true,
        _id: true,
    }).safeParse(data);

    if (!parsedData.success) {
        return null;
    }

    const { email, password, name } = data;
    const user = {
        ...parsedData.data,
        email,
        password,
        name,
    };
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const insert = await db
        .collection("users")
        .insertOne({ ...user, password: hashedPassword });

    const userOutput = await db
        .collection("users")
        .findOne({ _id: insert.insertedId });

    return userOutput;
};

export const updateUserPasswordByOldPassword = async (
    db: Db,
    id: ObjectId,
    oldPassword: string,
    newPassword: string
) => {
    const user = await db.collection("users").findOne(new ObjectId(id));
    if (!user) {
        return false;
    }

    const matched = await bcrypt.compare(oldPassword, user.password);

    if (!matched) {
        return false;
    }

    const password = await bcrypt.hash(newPassword, 10);

    await db
        .collection("users")
        .updateOne({ _id: new ObjectId(id) }, { $set: { password } });
    return true;
};

export const resetUserPassword = async (
    db: Db,
    id: string,
    newPassword: string
) => {
    const password = await bcrypt.hash(newPassword, 10);
    await db
        .collection("users")
        .updateOne({ _id: new ObjectId(id) }, { $set: { password } });
};

export const deleteUser = async (db: Db, id: ObjectId) => {
    await db.collection("users").deleteOne({ _id: new ObjectId(id) });
};

export const updateUserById = async (
    db: Db,
    id: ObjectId,
    data: Partial<UserModelSchemaType>
) => {
    const updatedUser = await db
        .collection("users")
        .findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: data },
            { returnDocument: "after", projection: { password: 0 } }
        );
    return updatedUser.value;
};

export const updateUserGoals = async (
    db: Db,
    id: string,
    goals: Partial<UserModelSchemaType>
) => {
    try {
        await db
            .collection("users")
            .updateOne({ name: id }, { $set: { goals } });
    } catch (e) {
        console.log("error: ", e);
    }
};

export const updateGoalProgress = async (
    db: Db,
    userId: ObjectId
): Promise<boolean> => {
    try {
        const user = await db.collection("users").findOne({ _id: userId });
        if (!user || !user.goals) {
            console.error("No user found or user has no goals.");
            return false; // No user or no goals to update
        }

        for (const goal of user.goals as Goal[]) {
            const tasksCompleted = goal.tasks.filter(
                (task) => task.isCompleted
            ).length;
            const totalTasks = goal.tasks.length;
            const progressPercentage = (tasksCompleted / totalTasks) * 100;

            const result = await db
                .collection("users")
                .updateOne(
                    { _id: userId, "goals.goalName": goal.goalName },
                    { $set: { "goals.$.progress": progressPercentage } }
                );

            // Check result to ensure the document was updated
            if (!result.acknowledged || result.modifiedCount !== 1) {
                console.error(
                    `Failed to update progress for goal: ${goal.goalName}`
                );
                return false;
            }
        }

        return true; // Successfully updated all goals
    } catch (error) {
        console.error("Failed to update goal progress:", error);
        return false;
    }
};

export const getMatchingUsersByGoals = async (
    db: Db,
    userName: string,
    userGoals: Array<{ goalName: string }>
) => {
    try {
        // Extract goal names from the user's goals
        const goalNames = userGoals.map((goal) => goal.goalName);

        // Query the database to find users with matching goal names
        const matchingUsers = await db
            .collection("users")
            .find({
                name: { $ne: userName }, // Exclude the current user
                "goals.goalName": { $in: goalNames }, // Match users with similar goals
            })
            .toArray();

        console.log("matchingUsers: ", matchingUsers);

        return matchingUsers;
    } catch (e) {
        console.log("Error finding matching users: ", e);
        throw new Error("Could not find matching users");
    }
};

export const getAllUsers = async (db: Db, userName: string) => {
    try {
        const users = await db
            .collection("users")
            .find({ name: { $ne: userName } }) // Exclude users with the specified username
            .toArray(); // Convert the cursor to an array

        console.log("users: ", users);

        return users;
    } catch (e) {
        console.log("Error finding matching users: ", e);
        throw new Error("Could not find matching users");
    }
};
export const updateTasks = async (
    db: Db,
    id: string,
    goals: Partial<UserModelSchemaType>
) => {
    try {
        await db
            .collection("users")
            .updateOne({ name: id }, { $set: { goals } });
    } catch (e) {
        console.log("error: ", e);
    }
};
