import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Container,
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
    name: "",
    email: "",
    password: "",
};

const Register = () => {
    const [status, setStatus] = useState<Status>("idle");

    const { data, mutate } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (data?.payload) {
            router.replace("/home");
        }
    }, [data?.payload, router]);

    const registerUser = async (data: UserRegistrationSchemaType) => {
        setStatus("loading");

        const responseData = await fetcher<
            UserModelSchemaType,
            UserRegistrationSchemaType
        >("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data,
        });

        if (responseData.error) {
            toast.error(responseData.error);
            setStatus("error");
            formik.resetForm();
        } else {
            mutate({ payload: responseData.payload }, false);
            toast.success("Your account has been created");
            setStatus("success");
            router.replace("/home");
        }
    };

    const formik = useFormik({
        initialValues,
        validate: toFormikValidate(UserRegistrationSchema),
        onSubmit: (formValues) => {
            registerUser(formValues);
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

                {/* Right Side - Registration Form */}
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
                        Signup
                    </Typography>
                    <form
                        onSubmit={formik.handleSubmit}
                        style={{ width: "100%" }}
                    >
                        <TextField
                            fullWidth
                            label="Name"
                            margin="normal"
                            name="name"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            type="text"
                            variant="outlined"
                            placeholder="Enter your name"
                            error={Boolean(
                                formik.touched.name && formik.errors.name
                            )}
                            helperText={
                                formik.touched.name && formik.errors.name
                            }
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            margin="normal"
                            name="email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            type="email"
                            variant="outlined"
                            placeholder="Enter your email"
                            error={Boolean(
                                formik.touched.email && formik.errors.email
                            )}
                            helperText={
                                formik.touched.email && formik.errors.email
                            }
                            sx={{ marginBottom: 2 }}
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
                            sx={{ marginBottom: 2 }}
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
                                ? "Signing Up..."
                                : "Signup"}
                        </Button>
                    </form>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        align="center"
                        sx={{ mt: 2 }}
                    >
                        Have an account?{" "}
                        <NextLink href="/login">
                            <Button
                                color="secondary"
                                sx={{ textTransform: "none" }}
                            >
                                Sign In
                            </Button>
                        </NextLink>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default Register;
