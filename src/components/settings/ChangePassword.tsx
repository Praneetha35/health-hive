import React, {
    type ChangeEvent,
    type FormEvent,
    useEffect,
    useState,
} from "react";
import { toast } from "react-toastify";
import {
    Alert,
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    Button,
    CircularProgress,
} from "@mui/material";
import { fetcher } from "@/lib/fetcher";
import SubmitButton from "../common/SubmitButton";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [displayPasswordAlert, setDisplayPasswordAlert] = useState(false);
    const [displayPasswordAlertText, setDisplayPasswordAlertText] =
        useState("");

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (
            newPassword === "" ||
            oldPassword === "" ||
            confirmNewPassword === ""
        ) {
            setDisplayPasswordAlert(false);
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setDisplayPasswordAlertText("The new password doesn't match.");
            setDisplayPasswordAlert(true);
        } else {
            setDisplayPasswordAlert(false);
        }

        if (oldPassword === newPassword && oldPassword === confirmNewPassword) {
            setDisplayPasswordAlertText(
                "The new password can't be the same as the old one."
            );
            setDisplayPasswordAlert(true);
        }
    }, [confirmNewPassword, newPassword, oldPassword]);

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            setIsLoading(true);
            const response = await fetcher("/api/user/password", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                data: {
                    oldPassword,
                    newPassword,
                },
            });

            if (response.error) {
                setIsLoading(false);
                toast.error(response.error);
                setOldPassword("");
                setNewPassword("");
                setConfirmNewPassword("");
            } else {
                setIsLoading(false);
                toast.success(response.message);
                setOldPassword("");
                setNewPassword("");
                setConfirmNewPassword("");
            }
        } catch (e: any) {
            setIsLoading(false);
            toast.error(e.message);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <Card sx={styles.card}>
                <CardHeader
                    title="Update Password"
                    subheader="Enter your current password and choose a new one"
                    titleTypographyProps={{ fontSize: 20, fontWeight: "bold" }}
                    subheaderTypographyProps={{
                        fontSize: 14,
                        color: "textSecondary",
                    }}
                    sx={styles.header}
                />
                <Divider />
                <CardContent sx={styles.cardContent}>
                    <TextField
                        fullWidth
                        label="Old Password"
                        margin="normal"
                        type="password"
                        value={oldPassword}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setOldPassword(event.target.value)
                        }
                        variant="outlined"
                        sx={styles.input}
                    />
                    <TextField
                        fullWidth
                        label="New Password"
                        margin="normal"
                        type="password"
                        value={newPassword}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setNewPassword(event.target.value)
                        }
                        variant="outlined"
                        sx={styles.input}
                    />
                    <TextField
                        fullWidth
                        label="Confirm New Password"
                        margin="normal"
                        type="password"
                        value={confirmNewPassword}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setConfirmNewPassword(event.target.value)
                        }
                        variant="outlined"
                        sx={styles.input}
                    />
                </CardContent>
                <Divider />
                <Box sx={styles.actions}>
                    {displayPasswordAlert && (
                        <Alert severity="error" sx={styles.alert}>
                            {displayPasswordAlertText}
                        </Alert>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        sx={styles.submitButton}
                        disabled={
                            oldPassword === "" ||
                            newPassword === "" ||
                            confirmNewPassword === "" ||
                            displayPasswordAlert ||
                            isLoading
                        }
                    >
                        {isLoading ? (
                            <CircularProgress size={24} />
                        ) : (
                            "Update Password"
                        )}
                    </Button>
                </Box>
            </Card>
        </form>
    );
};

// Styles for Apple-like UI
const styles = {
    card: {
        borderRadius: "20px",
        padding: "20px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        marginTop: "20px",
        maxWidth: "500px",
        margin: "auto",
    },
    header: {
        paddingBottom: "16px",
    },
    cardContent: {
        paddingBottom: "16px",
    },
    input: {
        backgroundColor: "#F6F7F9",
        borderRadius: "10px",
    },
    actions: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 0",
    },
    alert: {
        flex: 1,
        marginRight: "16px",
    },
    submitButton: {
        padding: "10px 20px",
        backgroundColor: "#007BFF",
        color: "#FFF",
        borderRadius: "12px",
        "&:hover": {
            backgroundColor: "#005BB5",
        },
        fontWeight: "600",
    },
};

export default ChangePassword;
