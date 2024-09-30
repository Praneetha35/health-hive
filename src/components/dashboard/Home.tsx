import { UserModelSchemaType } from "@/schema/UserSchema";
import React, { useEffect, useState } from "react";
import { Container, Paper, Typography, Box, Grid, Button } from "@mui/material";
import axios from "axios";

// Progress bar styling
const ProgressBarSection = ({ sections }: { sections: number }) => {
    return (
        <Box sx={{ width: "100%", height: "20px" }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    height: "100%",
                }}
            >
                {[...Array(sections)].map((_, index) => (
                    <Box
                        key={index}
                        sx={{
                            backgroundColor: "#e0e0e0", // Unfilled color
                            width: `${100 / sections}%`,
                            height: "100%",
                            borderRight:
                                index < sections - 1
                                    ? "2px solid #fff"
                                    : "none", // Adds spacing between sections
                            transition: "background-color 0.3s",
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

interface IProps {
    user: Omit<UserModelSchemaType, "password">;
}

const Home = ({ user }: IProps) => {
    const [goals, setGoals] = useState(user.goals);

    // Fetch and update goals on mount
    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const response = await axios.get(`/api/goals/${user._id}`);
                setGoals(response.data.goals);
            } catch (error) {
                console.error("Error fetching goals:", error);
            }
        };

        fetchGoals();
    }, [user._id]);

    // Function to manually trigger goal progress update
    const updateGoalProgress = async () => {
        try {
            const response = await axios.post(
                `/api/update-goal-progress/${user._id}`
            );
            if (response.status === 200) {
                setGoals(response.data.goals);
            }
        } catch (error) {
            console.error("Error updating goals:", error);
        }
    };

    return (
        <Box sx={styles.dashboardContainer}>
            {/* Header Section */}
            <Typography variant="h4" sx={styles.header}>
                Good morning, {user.name}!
            </Typography>

            <Grid container spacing={3}>
                {/* Goals Section */}
                <Grid item xs={12} md={8}>
                    <Grid container spacing={3}>
                        {goals &&
                            goals.map((goal, index) => (
                                <Grid item xs={12} md={6} key={index}>
                                    <Paper elevation={3} sx={styles.goalCard}>
                                        <Typography
                                            variant="h6"
                                            sx={styles.goalTitle}
                                        >
                                            {goal.goalName}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={styles.goalStreak}
                                        >
                                            Current Progress: {goal.progress}%
                                        </Typography>
                                        {/* <Button
                                            onClick={updateGoalProgress}
                                            sx={styles.updateButton}
                                        >
                                            Update Progress
                                        </Button> */}
                                    </Paper>
                                </Grid>
                            ))}
                        {/* Daily Affirmations */}
                        <Grid item xs={12}>
                            <Paper elevation={3} sx={styles.affirmationCard}>
                                <Typography
                                    variant="h6"
                                    sx={styles.affirmationHeader}
                                >
                                    Daily Affirmations ❤️
                                </Typography>
                                <Box sx={{ paddingLeft: 2 }}>
                                    <ul style={styles.affirmationList}>
                                        <li>
                                            Every step you take moves you closer
                                            to your goals.
                                        </li>
                                        <li>
                                            Your strength shines brightest in
                                            moments of challenge.
                                        </li>
                                    </ul>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Growth Section */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={styles.growthCard}>
                        <Typography variant="h6" sx={styles.growthHeader}>
                            Your Growth
                        </Typography>
                        <Box sx={styles.growthContent}>
                            <img
                                src={process.env.NEXT_PUBLIC_PLANT}
                                alt="Your Plant"
                                style={styles.growthImage}
                            />
                            <Box sx={styles.progressBarContainer}>
                                <ProgressBarSection sections={4} />
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

// Inline Styles for Apple-Like UI
const styles = {
    dashboardContainer: {
        display: "flex",
        flexDirection: "column",
        padding: 3,
        flexGrow: 1,
        backgroundColor: "#f5f5f5", // Softer background for contrast
        minHeight: "100vh",
    },
    header: {
        fontWeight: "bold",
        marginBottom: 3,
        paddingLeft: 2,
    },
    goalCard: {
        padding: 3,
        borderRadius: "20px",
        backgroundColor: "#ffecb3",
        border: "1px solid #e0e0e0",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "box-shadow 0.3s ease",
        "&:hover": {
            boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
        },
    },
    goalTitle: {
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: "10px",
    },
    goalStreak: {
        textAlign: "center",
    },
    updateButton: {
        marginTop: "10px",
        backgroundColor: "#2196f3",
        color: "#fff",
        padding: "8px 16px",
        borderRadius: "12px",
        "&:hover": {
            backgroundColor: "#1976d2",
        },
    },
    affirmationCard: {
        padding: 3,
        borderRadius: "20px",
        backgroundColor: "#ffecb3",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    affirmationHeader: {
        fontWeight: "bold",
        marginBottom: "10px",
    },
    affirmationList: {
        paddingLeft: 20,
        fontSize: "16px",
    },
    growthCard: {
        padding: 3,
        borderRadius: "20px",
        backgroundColor: "#ffd1df",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    growthHeader: {
        fontWeight: "bold",
        marginBottom: "20px",
    },
    growthContent: {
        textAlign: "center",
    },
    growthImage: {
        width: "250px",
        height: "auto",
        marginBottom: "20px",
    },
    progressBarContainer: {
        width: "100%",
    },
};

export default Home;
