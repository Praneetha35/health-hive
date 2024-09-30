import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image"; // Importing Image for better optimization

// Icons or images can be replaced as needed
import accountabilityIcon from "../../../public/assets/images/feature-1.png";
import socialIcon from "../../../public/assets/images/feature-2.png";
import flexibilityIcon from "../../../public/assets/images/feature-3.png";

const AboutUs = () => {
    return (
        <Box
            sx={{
                padding: 5,
                backgroundColor: "#f9f9f9", // Light background
                borderRadius: 2,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)", // Soft shadow
                marginTop: 5,
            }}
        >
            <Container>
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        mb: 3,
                        color: "#333",
                    }}
                >
                    About Us
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        fontSize: 18,
                        textAlign: "center",
                        mb: 5,
                        color: "#666",
                    }}
                >
                    We believe accountability and friendships are essential in
                    your health journey, whether that’s mental health, physical
                    health, or lifestyle improvement!
                </Typography>
                <Grid container spacing={4}>
                    {/* Why Us Section */}
                    <Grid item xs={12} md={4}>
                        <Typography
                            variant="h5"
                            sx={{ fontWeight: "bold", mb: 2, color: "#333" }}
                        >
                            Why HealthHive?
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 2,
                            }}
                        >
                            <Image
                                src={accountabilityIcon}
                                alt="Accountability Icon"
                                width={40}
                                height={40}
                                style={{ marginRight: 10 }}
                            />
                            <Typography
                                variant="body1"
                                sx={{ color: "#666", fontSize: 16 }}
                            >
                                Accountability: Having a partner increases
                                accountability and makes it more likely for
                                users to stick to their health plans.
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 2,
                            }}
                        >
                            <Image
                                src={socialIcon}
                                alt="Social Icon"
                                width={40}
                                height={40}
                                style={{ marginRight: 10 }}
                            />
                            <Typography
                                variant="body1"
                                sx={{ color: "#666", fontSize: 16 }}
                            >
                                Social Connection: It provides a sense of
                                friendship and shared purpose, reducing feelings
                                of isolation in personal health journeys.
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Image
                                src={flexibilityIcon}
                                alt="Flexibility Icon"
                                width={40}
                                height={40}
                                style={{ marginRight: 10 }}
                            />
                            <Typography
                                variant="body1"
                                sx={{ color: "#666", fontSize: 16 }}
                            >
                                Flexible & Inclusive: Suitable for all fitness
                                levels and health goals, whether users are
                                looking to improve physical fitness, mental
                                well-being, or lifestyle habits.
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Key Features Section */}
                    <Grid item xs={12} md={8}>
                        <Typography
                            variant="h5"
                            sx={{ fontWeight: "bold", mb: 2, color: "#333" }}
                        >
                            Our Key Features:
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ color: "#666", fontSize: 16, mb: 1.5 }}
                        >
                            1. <strong>Partner Matching:</strong> Users are
                            paired based on their health goals and preferences
                            ensuring a compatible and effective partnership.
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ color: "#666", fontSize: 16, mb: 1.5 }}
                        >
                            2. <strong>Goal Setting:</strong> The platform
                            offers structured goal-setting tools for weight
                            loss, fitness, diet, mental health, and more.
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ color: "#666", fontSize: 16, mb: 1.5 }}
                        >
                            3. <strong>Progress Tracking:</strong> Both partners
                            can monitor their progress through personalized
                            daily tasks.
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ color: "#666", fontSize: 16, mb: 1.5 }}
                        >
                            4. <strong>Motivation & Support:</strong> Regular
                            reminders and motivational messages keep users
                            engaged and committed to their health journey.
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ color: "#666", fontSize: 16, mb: 1.5 }}
                        >
                            5. <strong>Reward System:</strong> A fun goal as you
                            become healthier: growing your own tree! Pick a seed
                            and grow it as you finish daily tasks for your
                            goal(s).
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default AboutUs;
