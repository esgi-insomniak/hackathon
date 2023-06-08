import { authMiddleware } from "@clerk/nextjs";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const userIsInDatabase = (handler: NextApiHandler) => async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        const userId = req.headers["x-clerk-user-id"];
        if (!userId) {
            throw new Error("No user ID found");
        }
        return await handler(req, res);
    }
    catch (error) {
        res.status(401).json('Unauthorized');
        return;
    }
}

export default authMiddleware();

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};