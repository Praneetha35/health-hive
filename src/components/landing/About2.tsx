import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import SupportIcon from "@mui/icons-material/Support";
import SmartToyIcon from "@mui/icons-material/SmartToy"; // Using SmartToy icon for BeeFriend

const AboutUs = () => {
    return (
        <Box
            sx={{
                padding: 5,
                backgroundColor: "#FDFBF8", // Off-White background for warmth
                borderRadius: 2,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)", // Soft shadow for modern depth
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
                        color: "#333333", // Cool Gray for title
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
                        color: "#666666", // Light Gray for body text
                    }}
                >
                    We believe accountability and friendships are essential in
                    your health journey, whether that’s mental health, physical
                    health, or lifestyle improvement!
                </Typography>

                <Grid container spacing={4}>
                    {/* Why HealthHive Section */}
                    <Grid item xs={12} md={4}>
                        <Typography
                            variant="h5"
                            sx={{ fontWeight: "bold", mb: 2, color: "#333333" }} // Cool Gray for subtitles
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
                            <PeopleIcon
                                sx={{
                                    fontSize: 40,
                                    color: "#007BFF", // Electric Blue for icons
                                    marginRight: 2,
                                }}
                            />
                            <Typography
                                variant="body1"
                                sx={{ color: "#666666", fontSize: 16 }} // Light Gray for text
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
                            <GroupAddIcon
                                sx={{
                                    fontSize: 40,
                                    color: "#007BFF", // Electric Blue for consistency
                                    marginRight: 2,
                                }}
                            />
                            <Typography
                                variant="body1"
                                sx={{ color: "#666666", fontSize: 16 }}
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
                            <FitnessCenterIcon
                                sx={{
                                    fontSize: 40,
                                    color: "#007BFF", // Electric Blue for all icons
                                    marginRight: 2,
                                }}
                            />
                            <Typography
                                variant="body1"
                                sx={{ color: "#666666", fontSize: 16 }}
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
                            sx={{ fontWeight: "bold", mb: 2, color: "#333333" }}
                        >
                            Our Key Features:
                        </Typography>

                        {/* Feature 1: Partner Matching */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 2,
                            }}
                        >
                            <TrackChangesIcon
                                sx={{
                                    fontSize: 40,
                                    color: "#007BFF", // Unified color for icons
                                    marginRight: 2,
                                }}
                            />
                            <Typography
                                variant="body1"
                                sx={{ color: "#666666", fontSize: 16 }}
                            >
                                1. <strong>Partner Matching:</strong> Users are
                                paired based on their health goals and
                                preferences ensuring a compatible and effective
                                partnership.
                            </Typography>
                        </Box>

                        {/* Feature 2: Goal Setting */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 2,
                            }}
                        >
                            <SupportIcon
                                sx={{
                                    fontSize: 40,
                                    color: "#007BFF",
                                    marginRight: 2,
                                }}
                            />
                            <Typography
                                variant="body1"
                                sx={{ color: "#666666", fontSize: 16 }}
                            >
                                2. <strong>Goal Setting:</strong> The platform
                                offers structured goal-setting tools for weight
                                loss, fitness, diet, mental health, and more.
                            </Typography>
                        </Box>

                        {/* Feature 3: Progress Tracking */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 2,
                            }}
                        >
                            <LocalActivityIcon
                                sx={{
                                    fontSize: 40,
                                    color: "#007BFF",
                                    marginRight: 2,
                                }}
                            />
                            <Typography
                                variant="body1"
                                sx={{ color: "#666666", fontSize: 16 }}
                            >
                                3. <strong>Progress Tracking:</strong> Both
                                partners can monitor their progress through
                                personalized daily tasks.
                            </Typography>
                        </Box>

                        {/* Feature 4: BeeFriend AI */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 2,
                            }}
                        >
                            <SmartToyIcon
                                sx={{
                                    fontSize: 40,
                                    color: "#007BFF",
                                    marginRight: 2,
                                }}
                            />
                            <Typography
                                variant="body1"
                                sx={{ color: "#666666", fontSize: 16 }}
                            >
                                4. <strong>BeeFriend AI:</strong> Your friendly
                                AI companion will accompany you along your
                                health journey, offering personalized tips,
                                motivational support, and even reminders to keep
                                you on track.
                            </Typography>
                        </Box>

                        {/* Feature 5: Motivation & Support */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 2,
                            }}
                        >
                            <SupportIcon
                                sx={{
                                    fontSize: 40,
                                    color: "#007BFF", // Consistent Electric Blue for icons
                                    marginRight: 2,
                                }}
                            />
                            <Typography
                                variant="body1"
                                sx={{ color: "#666666", fontSize: 16 }}
                            >
                                5. <strong>Motivation & Support:</strong>{" "}
                                Regular reminders and motivational messages keep
                                users engaged and committed to their health
                                journey.
                            </Typography>
                        </Box>

                        {/* Feature 6: Reward System */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <LocalActivityIcon
                                sx={{
                                    fontSize: 40,
                                    color: "#007BFF",
                                    marginRight: 2,
                                }}
                            />
                            <Typography
                                variant="body1"
                                sx={{ color: "#666666", fontSize: 16 }}
                            >
                                6. <strong>Reward System:</strong> A fun goal as
                                you become healthier: growing your own tree!
                                Pick a seed and grow it as you finish daily
                                tasks for your goal(s).
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default AboutUs;
