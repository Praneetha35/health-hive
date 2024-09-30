import React from "react";
import Navbar from "./Navbar";
import { Box, Container, Typography } from "@mui/material";
import Image from "next/image"; // Using Next.js Image component for better optimization
import Scroll from "react-scroll";
import About from "./About2";

// Import the background image
import backgroundImage from "../../../public/assets/images/friends_landing.jpeg"; // Adjust the path if necessary

const Landing = () => {
    const Element = Scroll.Element;

    return (
        <>
            {/* Sticky Navbar with transparent background initially */}
            <Navbar />

            {/* Full container with background image for Hero */}
            <Box
                sx={{
                    backgroundImage: `url(${backgroundImage.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100vh", // Full viewport height for the hero
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center", // Centers the hero content vertically
                    alignItems: "center",
                    position: "relative",
                    mt: "-64px", // Ensures content aligns with the sticky navbar
                }}
            >
                {/* Semi-transparent content container for Hero */}
                <Container
                    sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent white background for content
                        padding: 5,
                        borderRadius: 2,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
                        textAlign: "center",
                    }}
                >
                    {/* Image and Title */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={process.env.NEXT_PUBLIC_LOGO} // Replace with the correct path to the logo image
                            alt="logo"
                            width={100}
                            height={100}
                            style={{ borderRadius: "5px 5px 5px 5px" }}
                        />
                        <Typography
                            variant="h3"
                            sx={{
                                fontFamily: "Arial, sans-serif",
                                fontWeight: "bold",
                                mt: 2,
                                color: "#333333", // Cool Gray for headline
                            }}
                        >
                            HealthHive
                        </Typography>
                    </Box>

                    {/* Subtitle */}
                    <Typography
                        variant="h5"
                        sx={{
                            fontFamily: "Arial, sans-serif",
                            mt: 1,
                            color: "#9B2915", // Warm Maroon for the subtitle
                        }}
                    >
                        Different Paths, One Goal: Partner Up for Better Health!
                    </Typography>
                </Container>
            </Box>

            {/* Move the About2 section below the background image */}
            <Box sx={{ mt: 8 }}>
                <Element name="features">
                    <About />
                </Element>
            </Box>
        </>
    );
};

export default Landing;
