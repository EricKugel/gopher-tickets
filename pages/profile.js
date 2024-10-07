import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { connectDB } from "../helpers/mongohelper";
import { useState } from "react";
import { toast } from "react-hot-toast";

import User from "../models/user";

const Profile = ({ user }) => {
    const router = useRouter();
    
    const [data, setData] = useState({
        phone: user.phone ? user.phone : "",
        snap: user.snap ? user.snap : "",
        venmo: user.venmo,
        zelle: user.zelle,
        cashapp: user.cashapp,
        apple_pay: user.apple_pay
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/profile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({data}),
        });

        if (response.ok) {
            toast.success("Profile Updated");
            router.push("/");
        } else {
            toast.error("Something went wrong");
        }
    };

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="Phone number"
                        id="phone"
                        name="phone"
                        type="text"
                        value={data.country}
                        onChange={(e) => setData({...data, phone: e.target.value})}
                    />
                    {/**https://stackoverflow.com/questions/28645772/snapchat-qr-code-from-snapchat-username-php */}
                    <input
                        placeholder="Snap"
                        id="snap"
                        name="snap"
                        type="text"
                        value={data.country}
                        onChange={(e) => setData({...data, snap: e.target.value})}
                    />
                    Do you take...<br/>
                    Venmo? 
                    <input
                        id="venmo"
                        name="venmo"
                        type="checkbox"
                        checked={data.venmo}
                        onChange={(e) => setData({...data, venmo: e.target.checked})}
                    />
                    Zelle?
                    <input
                        id="zelle"
                        name="zelle"
                        type="checkbox"
                        checked={data.zelle}
                        onChange={(e) => setData({...data, zelle: e.target.checked})}
                    />
                    Cashapp?                    
                    <input
                        id="cashapp"
                        name="cashapp"
                        type="checkbox"
                        checked={data.cashapp}
                        onChange={(e) => setData({...data, cashapp: e.target.checked})}
                    />
                    Apple Pay?
                    <input
                        id="apple_pay"
                        name="apple_pay"
                        type="checkbox"
                        checked={data.apple_pay}
                        onChange={(e) => setData({...data, apple_pay: e.target.checked})}
                    />
                    <button type="submit">
                        Done!
                    </button>
                </form>
            </div>
        </div>
    )
}


export const getServerSideProps = async (context) => {
    const session = await getSession(context);

    if (session) {
        try {
            await connectDB();
            const user = await User.findOne({email: JSON.parse(JSON.stringify(session.user)).email});
            return {props: {user: JSON.parse(JSON.stringify(user))}};
        } catch(e) {
            console.error(e);
        }
    } else {
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        };
    }
};

export default Profile;