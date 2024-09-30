import React from "react";
import {
    Alert,
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useUser } from "@/lib/hooks/useUser";
import { fetcher } from "@/lib/fetcher";

const DeleteAccount = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const router = useRouter();
    const { mutate } = useUser();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        setIsLoading(true);
        const response = await fetcher("/api/user", {
            method: "DELETE",
            headers: {},
            data: null,
        });

        if (response.error) {
            setIsLoading(false);
            handleClose();
            toast.error(response.error);
        } else {
            setIsLoading(false);
            handleClose();
            mutate({ payload: null });
            toast.success(response.message);
            router.replace("/");
        }
    };

    return (
        <Card sx={styles.cardContainer}>
            <CardHeader
                titleTypographyProps={{ variant: "h6", color: "textPrimary" }}
                subheaderTypographyProps={{ color: "textSecondary" }}
                title="Delete Account"
                subheader="This action is irreversible."
                sx={styles.header}
            />
            <Divider />
            <CardContent sx={styles.cardContent}>
                <Alert severity="error" sx={styles.alert}>
                    This will delete your account permanently.
                </Alert>
            </CardContent>
            <Divider />
            <Box sx={styles.actionContainer}>
                <Button
                    variant="contained"
                    color="error"
                    sx={styles.deleteButton}
                    onClick={handleClickOpen}
                >
                    Delete Account
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                >
                    <DialogTitle
                        id="alert-dialog-title"
                        sx={styles.dialogTitle}
                    >
                        {"Delete Your Account?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText
                            id="alert-dialog-description"
                            sx={styles.dialogContentText}
                        >
                            Deleting your account is permanent and cannot be
                            undone. Are you sure you want to continue?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={styles.dialogActions}>
                        <Button
                            disabled={isLoading}
                            sx={styles.cancelButton}
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isLoading}
                            sx={styles.confirmButton}
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Card>
    );
};

// Inline Styles for Apple-Like UI, matching Change Password
const styles = {
    cardContainer: {
        borderRadius: "20px",
        padding: "20px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        marginTop: "20px",
        width: "100%", // Ensure same width as Change Password box
        maxWidth: "500px", // Match the size constraint
        margin: "0 auto", // Center align
    },
    header: {
        paddingBottom: "16px",
    },
    cardContent: {
        minHeight: "120px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    alert: {
        borderRadius: "12px",
        backgroundColor: "#ffe7e7",
        color: "#D32F2F",
        fontWeight: "500",
        padding: "16px",
    },
    actionContainer: {
        display: "flex",
        justifyContent: "flex-end",
        padding: "16px 0",
    },
    deleteButton: {
        backgroundColor: "#D32F2F",
        padding: "10px 20px",
        borderRadius: "12px",
        fontWeight: "600",
        "&:hover": {
            backgroundColor: "#B71C1C",
        },
    },
    dialogTitle: {
        textAlign: "center",
        fontWeight: "600",
        color: "#000",
    },
    dialogContentText: {
        color: "#555",
        fontSize: "16px",
        textAlign: "center",
    },
    dialogActions: {
        justifyContent: "space-around",
        paddingBottom: "16px",
    },
    cancelButton: {
        backgroundColor: "#F1F1F1",
        color: "#555",
        padding: "8px 24px",
        borderRadius: "12px",
        "&:hover": {
            backgroundColor: "#E0E0E0",
        },
    },
    confirmButton: {
        backgroundColor: "#D32F2F",
        color: "#FFF",
        padding: "8px 24px",
        borderRadius: "12px",
        "&:hover": {
            backgroundColor: "#B71C1C",
        },
    },
};

export default DeleteAccount;
