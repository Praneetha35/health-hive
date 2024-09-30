import React, { useState, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";
import { useUser } from "@/lib/hooks/useUser";

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const pages = ["Features"];
    const { data } = useUser();

    return (
        <AppBar
            position="sticky"
            sx={{
                backgroundColor: "rgba(255, 255, 255, 0.7)", // Slightly transparent background
                boxShadow: "none",
                backdropFilter: "blur(10px)", // Blurring the background for a modern feel
                borderRadius: "0 0 20px 20px", // Keep the rounded corners
            }}
        >
            <Container>
                <Toolbar disableGutters>
                    <Link href="/" style={{ textDecoration: "none" }} passHref>
                        <Typography
                            sx={{
                                mr: 2,
                                display: { xs: "none", md: "flex" },
                                fontSize: 30,
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "#333333", // Cool Gray for consistent look
                            }}
                        >
                            HealthHive
                        </Typography>
                    </Link>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton size="large" onClick={handleOpenNavMenu}>
                            <MenuIcon sx={{ color: "#333333" }} />{" "}
                            {/* Cool Gray for icon */}
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page) => (
                                <ScrollLink
                                    key={page}
                                    smooth={true}
                                    to={page.toLowerCase()}
                                >
                                    <MenuItem
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                    >
                                        <Typography
                                            textAlign="center"
                                            sx={{ color: "#333333" }} // Cool Gray for menu items
                                        >
                                            {page}
                                        </Typography>
                                    </MenuItem>
                                </ScrollLink>
                            ))}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "#333333", // Cool Gray for mobile branding
                            textDecoration: "none",
                        }}
                    >
                        DuoHealth
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {pages.map((page) => (
                            <ScrollLink
                                key={page}
                                smooth={true}
                                to={page.toLowerCase()}
                            >
                                <Button
                                    sx={{
                                        my: 2,
                                        color: "#333333", // Cool Gray for buttons
                                        display: "block",
                                    }}
                                >
                                    {page}
                                </Button>
                            </ScrollLink>
                        ))}
                    </Box>

                    {/* Conditional render based on user data */}
                    {!data?.payload && (
                        <Box>
                            <Link
                                style={{ textDecoration: "none" }}
                                href="/register"
                                passHref
                            >
                                <Button
                                    disabled={!data}
                                    size="large"
                                    sx={{
                                        color: "#007BFF", // Electric Blue for register button
                                        borderColor: "#007BFF",
                                        "&:hover": {
                                            backgroundColor: "#e6f0ff", // Lighter blue on hover
                                        },
                                    }}
                                    variant="outlined"
                                >
                                    Register
                                </Button>
                            </Link>
                        </Box>
                    )}

                    <Box sx={{ marginLeft: 2 }}>
                        {!data?.payload ? (
                            <Link
                                style={{ textDecoration: "none" }}
                                href="/login"
                                passHref
                            >
                                <Button
                                    disabled={!data}
                                    size="large"
                                    sx={{
                                        color: "#007BFF", // Electric Blue for sign-in button
                                        borderColor: "#007BFF",
                                        "&:hover": {
                                            backgroundColor: "#e6f0ff",
                                        },
                                    }}
                                    variant="outlined"
                                >
                                    Sign in
                                </Button>
                            </Link>
                        ) : (
                            <Link
                                style={{ textDecoration: "none" }}
                                href="/home"
                                passHref
                            >
                                <Button
                                    size="large"
                                    sx={{
                                        backgroundColor: "#007BFF", // Electric Blue for dashboard button
                                        color: "white",
                                        "&:hover": {
                                            backgroundColor: "#0056b3", // Darker blue on hover
                                        },
                                    }}
                                    variant="contained"
                                >
                                    Dashboard
                                </Button>
                            </Link>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
