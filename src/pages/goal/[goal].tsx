import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Grid, TextField, Button } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { useUser } from "@/lib/hooks/useUser";
import { fetcher } from "@/lib/fetcher";

const GoalPage = () => {
    const { data: userData } = useUser();

    const router = useRouter();
    const { goal } = router.query; // Get the goal name from the route
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        (async () => {
            const users: any = await fetcher("/api/get-users", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                data: {
                    user: userData?.payload?.name, // Using the user name from payload
                },
            });

            users && setAllUsers(users.payload);
        })();
    }, []);

    console.log("allUsers:", allUsers);
    const { data } = useUser();
    console.log(data);

    // const [tasks, setTasks] = useState({}
    //     [
    //         { name: "5-Minute Mindful Breathing", isCompleted: false },
    //         { name: "10-Minute Bodyweight Circuit", isCompleted: false },
    //         { name: "Task 3", isCompleted: false },
    //     ],
    //     [
    //         { name: "5-Minute Mindful Breathing", isCompleted: false },
    //         { name: "10-Minute Bodyweight Circuit", isCompleted: false },
    //         { name: "Task 3", isCompleted: false },
    //     ]
    // );
    const [tasks, setTasks] = useState([{ name: "", isCompleted: false }]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        console.log("tasks:", goal);
        if (goal == "Meditation") {
            setTasks([
                { name: "5-Minute Mindful Breathing", isCompleted: true },
                { name: "10-Minute Bodyweight Circuit", isCompleted: false },
            ]);
        } else if (goal == "Weight Loss") {
            setTasks([
                { name: "Exercise for 30 minutes", isCompleted: false },
                { name: "Drink 2 liters of water", isCompleted: false },
            ]);
        } else if (goal == "Build New Friendships") {
            setTasks([
                { name: "Join a new club", isCompleted: false },
                { name: "Attend a networking event", isCompleted: false },
            ]);
        }
    }, [goal, setTasks]);

    const handleAddTask = () => {
        if (newTask.trim() !== "") {
            setTasks([...tasks, { name: newTask, isCompleted: false }]);
            setNewTask("");
        }
    };

    const handleRemoveTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    return (
        <DashboardLayout>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 3,
                    flexGrow: 1,
                    backgroundColor: "#f0f0f0",
                    minHeight: "100vh",
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: "bold",
                        marginBottom: 3,
                        paddingLeft: 2,
                    }}
                >
                    Goal: {goal}
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Paper
                            elevation={3}
                            sx={{
                                padding: 3,
                                borderRadius: 2,
                                backgroundColor: "#5398dd", // Blue color for the container
                                minHeight: "400px",
                                display: "flex",
                                flexDirection: "column",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.1)", // Soft shadow
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: "bold",
                                    marginBottom: 2,
                                    color: "#fff",
                                }} // White font for the title
                            >
                                Daily Tasks
                            </Typography>
                            <Box sx={{ marginTop: 2, marginBottom: 2 }}>
                                <TextField
                                    variant="outlined"
                                    label="New Task"
                                    value={newTask}
                                    onChange={(e) => setNewTask(e.target.value)}
                                    fullWidth
                                    sx={{ marginBottom: 2 }}
                                />
                                <Button
                                    variant="contained"
                                    onClick={handleAddTask}
                                    color="primary"
                                    sx={{ borderRadius: 20 }} // Rounded button
                                >
                                    Add Task
                                </Button>
                            </Box>
                            <Box sx={{ marginTop: 2 }}>
                                {tasks.map((task, index) => (
                                    <Paper
                                        key={index}
                                        elevation={2}
                                        sx={{
                                            padding: 2,
                                            marginBottom: 1,
                                            borderRadius: 2,
                                            display: "flex",
                                            alignItems: "center",
                                            backgroundColor: "#BBDEFB", // Light blue for tasks
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                marginLeft: 1,
                                                flexGrow: 1,
                                                color: "#000", // Black font for task text
                                                fontFamily:
                                                    '"Roboto", "Helvetica", "Arial", sans-serif', // Nice font
                                                fontWeight: 500,
                                            }}
                                        >
                                            {task.name}
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() =>
                                                handleRemoveTask(index)
                                            }
                                            sx={{ borderRadius: 20 }} // Rounded button
                                        >
                                            Remove
                                        </Button>
                                    </Paper>
                                ))}
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper
                            elevation={3}
                            sx={{
                                padding: 3,
                                borderRadius: 2,
                                backgroundColor: "#fffde7",
                                minHeight: "400px",
                                display: "flex",
                                flexDirection: "column",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.1)", // Soft shadow
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: "bold",
                                    marginBottom: 2, // Added margin to match Daily Tasks
                                }}
                            >
                                Partner Status
                            </Typography>
                            <Box sx={{ marginTop: 1 }}>
                                <ul style={{ paddingLeft: 20 }}>
                                    {allUsers &&
                                        allUsers.map((el: any, key) => (
                                            <li
                                                key={key}
                                                style={{ marginBottom: 4 }}
                                            >
                                                {" "}
                                                {/* Changed ul to li for proper list styling */}
                                                <Typography
                                                    sx={{
                                                        color: "#000", // Black font for names
                                                        fontFamily:
                                                            '"Roboto", "Helvetica", "Arial", sans-serif',
                                                        fontWeight: 500, // Match font weight
                                                        fontSize: "1rem", // Adjust font size to match Daily Tasks
                                                    }}
                                                >
                                                    {el.name} -
                                                    {el.goals &&
                                                        el.goals.find(
                                                            (e: any) => {
                                                                return (
                                                                    e.goalName ==
                                                                    goal
                                                                );
                                                            }
                                                        )?.progress}
                                                </Typography>
                                            </li>
                                        ))}
                                </ul>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </DashboardLayout>
    );
};

export default GoalPage;
