import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Container,
    Grid,
    Link,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Status } from "@/types/status";
import { useFormik } from "formik";
import { toFormikValidate } from "zod-formik-adapter";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import SubmitButton from "../common/SubmitButton";
import {
    UserModelSchemaType,
    UserRegistrationSchema,
    UserRegistrationSchemaType,
} from "@/schema/UserSchema";
import { useUser } from "@/lib/hooks/useUser";
import { fetcher } from "@/lib/fetcher";

const initialValues = {
    email: "",
    password: "",
};

const Login = () => {
    const [status, setStatus] = useState<Status>("idle");

    const { data, mutate } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (data?.payload) {
            router.replace("/home");
        }
    }, [data?.payload, router]);

    const loginUser = async (
        data: Omit<UserRegistrationSchemaType, "name">
    ) => {
        setStatus("loading");

        const responseData = await fetcher<
            UserModelSchemaType,
            Omit<UserRegistrationSchemaType, "name">
        >("/api/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: data,
        });

        if (responseData.error) {
            toast.error(responseData.error);
            setStatus("error");
            formik.resetForm();
        } else {
            mutate({ payload: responseData.payload }, false);
            setStatus("success");
        }
    };

    const formik = useFormik({
        initialValues,
        validate: toFormikValidate(UserRegistrationSchema.omit({ name: true })),
        onSubmit: (formValues) => {
            loginUser(formValues);
        },
    });

    return (
        <Box
            component="main"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: "#e0e0e0",
                padding: 4,
            }}
        >
            <Paper
                elevation={10}
                sx={{
                    width: "75%",
                    maxWidth: "900px",
                    display: "flex",
                    borderRadius: "15px",
                    overflow: "hidden",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                }}
            >
                {/* Left Side - Text Section */}
                <Box
                    sx={{
                        backgroundColor: "#fff",
                        flex: 1,
                        padding: 4,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                    }}
                >
                    <Typography
                        variant="h6"
                        align="center"
                        sx={{ color: "#333", fontWeight: "bold", mb: 2 }}
                    >
                        Two Paths, One Goal: Partner Up for Better Health!
                    </Typography>
                </Box>

                {/* Right Side - Login Form */}
                <Box
                    sx={{
                        backgroundColor: "#f9f9f9",
                        flex: 1,
                        padding: 4,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                    }}
                >
                    <NextLink href="/" passHref>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            sx={{ alignSelf: "flex-start", mb: 2 }}
                        >
                            Home
                        </Button>
                    </NextLink>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                        Login
                    </Typography>
                    <form
                        onSubmit={formik.handleSubmit}
                        style={{ width: "100%" }}
                    >
                        <TextField
                            fullWidth
                            label="Username"
                            margin="normal"
                            name="email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            type="email"
                            variant="outlined"
                            placeholder="Enter your username"
                            error={Boolean(
                                formik.touched.email && formik.errors.email
                            )}
                            helperText={
                                formik.touched.email && formik.errors.email
                            }
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            margin="normal"
                            name="password"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="password"
                            value={formik.values.password}
                            variant="outlined"
                            placeholder="Enter your password"
                            error={Boolean(
                                formik.touched.password &&
                                    formik.errors.password
                            )}
                            helperText={
                                formik.touched.password &&
                                formik.errors.password
                            }
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={
                                !formik.isValid ||
                                status === "loading" ||
                                status === "success"
                            }
                            sx={{
                                padding: "10px 0",
                                backgroundColor: "#4caf50",
                                "&:hover": {
                                    backgroundColor: "#388e3c",
                                },
                                marginBottom: 2,
                            }}
                        >
                            {status === "loading" || status === "success"
                                ? "Signing In..."
                                : "Login"}
                        </Button>
                        {/* <Button
                            type="button"
                            fullWidth
                            variant="outlined"
                            color="secondary"
                            sx={{
                                marginBottom: 2,
                            }}
                        >
                            Login w/ Google
                        </Button> */}
                    </form>
                    <NextLink href="/forgot-password" passHref>
                        <Link
                            variant="body2"
                            sx={{
                                display: "block",
                                textAlign: "center",
                                marginBottom: 2,
                                color: "#007BFF",
                            }}
                        >
                            Forgot password?
                        </Link>
                    </NextLink>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        align="center"
                    >
                        Don&apos;t have an account?{" "}
                        <NextLink href="/register">
                            <Link underline="hover" sx={{ color: "#007BFF" }}>
                                Register
                            </Link>
                        </NextLink>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default Login;
