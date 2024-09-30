import React from "react";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import Chatbot from "@/components/BotFriend/ChatbotL";

const Chatbotpage = () => {
    return (
        <>
            <DashboardLayout>
                <Chatbot />
            </DashboardLayout>
        </>
    );
};

export default Chatbotpage;
