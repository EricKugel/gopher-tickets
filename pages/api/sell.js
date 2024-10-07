import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { connectDB } from "../../helpers/mongohelper";
import User from "../../models/user";
import Ticket from "../../models/ticket";

export default async function handler(req, res) {
    if (req.method == "POST") {
        const session = await getServerSession(req, res, authOptions);
        if (session) {
            try {
                await connectDB();
                const user_id = (await User.findOne({email: session.user.email}))._id;
                await Ticket.create({ user_id, ...req.body.data })
                res.status(200).json("Ticket posted");
            } catch (e) {
                console.error(e);
                res.status(500);
            }
        } else {
            res.status(401).json({ message: "Not signed in"});
        }
    }
}