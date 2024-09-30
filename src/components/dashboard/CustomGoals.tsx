import React, { useState, useEffect } from "react";
import {
    Container,
    Paper,
    Typography,
    Box,
    Grid,
    Checkbox,
    FormControlLabel,
    Button,
    CircularProgress,
    Alert,
} from "@mui/material";
import { fetcher } from "@/lib/fetcher";
import { useUser } from "@/lib/hooks/useUser";

// Define the goal categories and goals
const goalCategories = {
    MentalHealth: [
        "Quit Social Media",
        "Meditation",
        "Improve Sleep Quality",
        "Manage Stress",
        "Journaling Daily",
        "Therapy Session",
    ],
    PhysicalHealth: [
        "Fitness Training",
        "Quit Smoking",
        "Weight Loss",
        "Nutrition and Healthy Eating",
        "Increase Daily Steps",
        "Hydration Goals",
    ],
    SocialHealth: [
        "Strengthen Family Bonds",
        "Build New Friendships",
        "Improve Communication Skills",
        "Reconnect with Old Friends",
        "Volunteer Community Service",
        "Plan Regular Social Activities",
    ],
};

const CustomGoals = () => {
    const { data } = useUser();

    // State to store selected goals and submission status
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    // Populate selected goals from user data
    useEffect(() => {
        if (data?.payload?.goals) {
            const userGoals = data.payload.goals.map(
                (goal: any) => goal.goalName
            );
            setSelectedGoals(userGoals);
        }
    }, [data]);

    if (!data?.payload) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    // Handler for checking/unchecking a goal
    const handleGoalToggle = (goal: string) => {
        setSelectedGoals((prevSelectedGoals) =>
            prevSelectedGoals.includes(goal)
                ? prevSelectedGoals.filter((g) => g !== goal)
                : [...prevSelectedGoals, goal]
        );
    };

    const handleSubmit = async () => {
        setLoading(true);

        const response = await fetcher("/api/update-goals", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            data: {
                user: data?.payload?.name,
                goals: selectedGoals.map((el) => {
                    return {
                        goalName: el,
                        progress: 0,
                        startDate: new Date().toISOString(),
                        endDate: new Date(
                            Date.now() + 1000 * 60 * 60 * 24 * 7
                        ).toISOString(),
                    };
                }),
            },
        });

        setLoading(false);
        setSubmitted(true);
    };

    return (
        <Box sx={styles.container}>
            <Typography variant="h4" sx={styles.header}>
                Customize Your Goals
            </Typography>

            {/* Success Message */}
            {submitted && (
                <Alert severity="success" sx={styles.successMessage}>
                    Goals submitted successfully!
                </Alert>
            )}

            <Grid container spacing={3}>
                {/* Mental Health Section */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ ...styles.paper, backgroundColor: "#FFEBEE" }}>
                        <Typography variant="h6" sx={styles.sectionTitle}>
                            Mental Health
                        </Typography>
                        {goalCategories.MentalHealth.map((goal, index) => (
                            <FormControlLabel
                                key={index}
                                control={
                                    <Checkbox
                                        checked={selectedGoals.includes(goal)}
                                        onChange={() => handleGoalToggle(goal)}
                                    />
                                }
                                label={goal}
                            />
                        ))}
                    </Paper>
                </Grid>

                {/* Physical Health Section */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ ...styles.paper, backgroundColor: "#E8F5E9" }}>
                        <Typography variant="h6" sx={styles.sectionTitle}>
                            Physical Health
                        </Typography>
                        {goalCategories.PhysicalHealth.map((goal, index) => (
                            <FormControlLabel
                                key={index}
                                control={
                                    <Checkbox
                                        checked={selectedGoals.includes(goal)}
                                        onChange={() => handleGoalToggle(goal)}
                                    />
                                }
                                label={goal}
                            />
                        ))}
                    </Paper>
                </Grid>

                {/* Social Health Section */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ ...styles.paper, backgroundColor: "#E3F2FD" }}>
                        <Typography variant="h6" sx={styles.sectionTitle}>
                            Social Health
                        </Typography>
                        {goalCategories.SocialHealth.map((goal, index) => (
                            <FormControlLabel
                                key={index}
                                control={
                                    <Checkbox
                                        checked={selectedGoals.includes(goal)}
                                        onChange={() => handleGoalToggle(goal)}
                                    />
                                }
                                label={goal}
                            />
                        ))}
                    </Paper>
                </Grid>
            </Grid>

            {/* Submit Button */}
            <Box sx={styles.submitButtonContainer}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={loading}
                    sx={styles.submitButton}
                >
                    {loading ? <CircularProgress size={24} /> : "Submit Goals"}
                </Button>
            </Box>
        </Box>
    );
};

// Styles object for modern UI design
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        padding: 3,
        flexGrow: 1,
        backgroundColor: "#f4f6f8",
        justifyContent: "flex-start",
        minHeight: "100vh",
    },
    header: {
        fontWeight: "bold",
        marginBottom: 3,
        paddingLeft: 2,
        textAlign: "left",
    },
    successMessage: {
        marginBottom: 3,
    },
    paper: {
        padding: 3,
        borderRadius: "15px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    },
    sectionTitle: {
        fontWeight: "bold",
        marginBottom: 2,
        textAlign: "center",
    },
    submitButtonContainer: {
        display: "flex",
        justifyContent: "center",
        marginTop: 15,
    },
    submitButton: {
        padding: "10px 24px",
        borderRadius: "8px",
    },
};

export default CustomGoals;
