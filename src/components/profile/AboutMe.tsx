import { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { Status } from "@/types/status";
import { useFormik } from "formik";
import { toFormikValidate } from "zod-formik-adapter";

import SubmitButton from "../common/SubmitButton";
import { UserModelSchema, UserModelSchemaType } from "@/schema/UserSchema";
import { useUser } from "@/lib/hooks/useUser";
import { fetcher } from "@/lib/fetcher";

const AboutMe = () => {
    const [status, setStatus] = useState<Status>("idle");
    const [submittedAbout, setSubmittedAbout] = useState<string>("");

    const { data, mutate } = useUser();

    const updateAboutUser = async (
        data: Pick<UserModelSchemaType, "about">
    ) => {
        setStatus("loading");

        const responseData = await fetcher<
            UserModelSchemaType,
            Pick<UserModelSchemaType, "about">
        >("/api/user", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            data,
        });

        if (responseData.error) {
            toast.error(responseData.error);
            setStatus("error");
        } else {
            mutate({ payload: responseData.payload }, false);
            toast.success("Profile updated");
            setStatus("success");
            setSubmittedAbout(responseData.payload?.about || ""); // Save the submitted info to display
            formik.resetForm({ values: { about: "" } }); // Clear the form
        }
    };

    const formik = useFormik({
        initialValues: { about: "" },
        validate: toFormikValidate(UserModelSchema.pick({ about: true })),
        onSubmit: (formValues) => {
            updateAboutUser(formValues);
        },
    });

    useEffect(() => {
        if (data?.payload) {
            setSubmittedAbout(data?.payload?.about || "");
        }
    }, [data?.payload]);

    return (
        <Box sx={styles.container}>
            {/* Display Profile Information */}
            <Card sx={styles.profileCard}>
                <CardHeader
                    titleTypographyProps={{
                        variant: "h6",
                        color: "textPrimary",
                    }}
                    subheaderTypographyProps={{ color: "textSecondary" }}
                    title="Profile Information"
                    sx={styles.header}
                />
                <Divider />
                <CardContent>
                    <Typography variant="h5" sx={styles.nameText}>
                        {data?.payload?.name || "User"}
                    </Typography>
                    <Typography variant="body1" sx={styles.aboutText}>
                        {submittedAbout || "No information available"}
                    </Typography>
                </CardContent>
                <Divider />
            </Card>

            {/* Form to Update Profile Info */}
            <form onSubmit={formik.handleSubmit}>
                <Card sx={styles.formCard}>
                    <CardHeader
                        subheader="Update your info and tell us about yourself"
                        title="Update Information"
                        sx={styles.header}
                    />
                    <CardContent>
                        <TextField
                            multiline
                            rows={7}
                            fullWidth
                            label="About"
                            margin="normal"
                            name="about"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.about}
                            type="text"
                            variant="outlined"
                            placeholder="Write something about yourself..."
                            helperText={
                                (formik.touched.about && formik.errors.about) ||
                                " "
                            }
                            error={Boolean(
                                formik.touched.about && formik.errors.about
                            )}
                            sx={styles.textField}
                        />
                    </CardContent>
                    <Divider />
                    <Box sx={styles.submitContainer}>
                        <SubmitButton
                            customStyle={{ margin: 1 }}
                            color="primary"
                            fullWidth={false}
                            size={"medium"}
                            text="Update Information"
                            isLoading={status === "loading"}
                            isDisabled={
                                !formik.isValid ||
                                status === "loading" ||
                                formik.values.about === data?.payload?.about
                            }
                        />
                    </Box>
                </Card>
            </form>
        </Box>
    );
};

// Inline styles for the modernized UI
const styles = {
    container: {
        display: "flex",
        flexDirection: "column" as const,
        gap: 3,
        padding: 3,
        maxWidth: "800px",
        margin: "0 auto",
    },
    profileCard: {
        borderRadius: "20px",
        padding: "20px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#F9F9F9",
        marginBottom: "20px",
    },
    formCard: {
        borderRadius: "20px",
        padding: "20px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#F9F9F9",
    },
    header: {
        paddingBottom: "10px",
    },
    nameText: {
        fontWeight: "bold" as const,
    },
    aboutText: {
        color: "#555",
        marginTop: "10px",
    },
    textField: {
        marginTop: "15px",
    },
    submitContainer: {
        display: "flex",
        justifyContent: "flex-end" as const,
        padding: "20px",
    },
};

export default AboutMe;
