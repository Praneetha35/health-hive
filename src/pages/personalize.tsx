import React from "react";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import CustomGoals from "@/components/dashboard/CustomGoals";
import { Box } from "@mui/material";

const Profile = () => {
    return (
        <DashboardLayout>
            {/* Box to match Home Page Style */}
            <Box
                sx={{
                    padding: 3,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh", // Ensure it covers the screen height
                    backgroundColor: "#f0f0f0", // Match the background color of Home
                }}
            >
                <CustomGoals />
            </Box>
        </DashboardLayout>
    );
};

export default Profile;
