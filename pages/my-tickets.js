import { getSession } from "next-auth/react";
import { connectDB } from "../helpers/mongohelper";
import User from "../models/user";
import Ticket from "../models/ticket";

const MyTickets = ({ tickets }) => {
    return (
        <div>
            {tickets.map((ticket) => (<div key={ticket._id}>
                ONE TICKET TO {ticket.title} ON {ticket.date.split("T")[0]} AT {ticket.time} FOR {ticket.price} {ticket.obo ? " obo" : ""}
            </div>))}
        </div>
    )
};

export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    if (session) {
        try {
            await connectDB();
            const user = await User.findOne({
                email: session.user.email
            });
            const tickets = await Ticket.find({user_id: user._id});
            return { props: {tickets: JSON.parse(JSON.stringify(tickets))}}
        } catch (e) {
            // console.error(e);
        }
    } else {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            }
        };
    }
};

export default MyTickets;