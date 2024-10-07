import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation"
import User from "../models/user";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { connectDB } from "../helpers/mongohelper"

const Sell = ({ user }) => {
    const router = useRouter();

    const [data, setData] = useState({
        title: "",
        date: new Date(),
        time: "",
        location: "Huntington Bank Stadium",
        seat: "",
        price: 0,
        obo: true
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/sell", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data })
        });

        if (response.ok) {
            toast.success("Ticket posted");
            router.push("/my-tickets");
        } else {
            toast.error("Something went wrong");
        }
    };

    return (
        <div>
            <div>
                <form onSubmit = {handleSubmit}>
                    <input
                        placeholder="Event Name"
                        id="title"
                        name="title"
                        type="text"
                        value = {data.title}
                        onChange={(e) => setData({...data, title: e.target.value})}
                    />
                    Event Date:
                    <input
                        id="date"
                        name="date"
                        type="date"
                        value={data.date.toISOString().split('T')[0]}
                        onChange={(e) => setData({...data, date: new Date(e.target.value)})}
                    />
                    <input
                        placeholder="Event Time"
                        id="time"
                        name="time"
                        type="text"
                        value = {data.time}
                        onChange={(e) => setData({...data, time: e.target.value})}
                    />
                    <input
                        placeholder="Event Location"
                        id="location"
                        name="location"
                        type="text"
                        value = {data.location}
                        onChange={(e) => setData({...data, location: e.target.value})}
                    />
                    <input
                        placeholder="Event Seat"
                        id="seat"
                        name="seat"
                        type="text"
                        value = {data.seat}
                        onChange={(e) => setData({...data, seat: e.target.value})}
                    />
                    <input 
                        placeholder="Price"
                        id = "price"
                        name="price"
                        type="number"
                        value={data.price}
                        onChange={(e) => setData({...data, price: e.target.value})}
                    />
                    Or best offer?
                    <input 
                        id = "obo"
                        name="obo"
                        type="checkbox"
                        checked={data.obo}
                        onChange={(e) => setData({...data, obo: e.target.checked})}
                    />
                    <button type="submit">
                        Sell
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Sell;
export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    if (session) {
        try {
            await connectDB();
            const user = await User.findOne({
                email: JSON.parse(JSON.stringify(session.user)).email
            });
            return {props: {user: JSON.parse(JSON.stringify(user))}};
        } catch (e) {
            console.error(e);
        }
    } else {
        return {
            redirect: {
                destination: "/login",
                permanent: false
            },
        };
    }
};
