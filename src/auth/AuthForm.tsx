import React, { useState } from "react";
import {
    Container, Paper, TextField, Button, Typography,
    IconButton, InputAdornment, Box, CircularProgress, Divider
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock, Person } from "@mui/icons-material";
import Swal from "sweetalert2";
import { signupUser, loginUser } from "../DataBase/auth.service"; // Your firebase functions
import { useNavigate } from "react-router-dom"; // ✅ Import
import GoogleIcon from '@mui/icons-material/Google';
import { loginWithGoogle } from "../DataBase/auth.service";

const AuthPage: React.FC = () => {
    const navigate = useNavigate(); // ✅ Initialize
    const [isLogin, setIsLogin] = useState(true);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const [errors, setErrors] = useState({ user: "", email: "", password: "" });

    const validateUserName = () => {
        if (!userName) return "Username is required";
        if (userName.length < 4) return "Username must be at least 4 characters";
        return "";
    };

    const validateEmail = () => {
        if (!email) return "Email is required";
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!pattern.test(email)) return "Invalid email format";
        return "";
    };

    const validatePassword = () => {
        if (!password) return "Password is required";
        if (password.length < 6) return "Minimum 6 characters required";
        if (!/[0-9]/.test(password)) return "Password must include at least 1 number";
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return "Password must include at least 1 special character";
        return "";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userError = isLogin ? "" : validateUserName();
        const emailError = validateEmail();
        const passwordError = validatePassword();

        setErrors({ user: userError, email: emailError, password: passwordError });

        if (userError || emailError || passwordError) return;

        setLoading(true);
        try {
            if (isLogin) {
                await loginUser(email, password);
                Swal.fire("Success", "Login Successful", "success");
                // Yahan check hona chahiye ke profile bani hai ya nahi, 
                // filhal development ke liye hum seedha setup par bhej rahe hain
                navigate("/patient-profile");
            } else {
                await signupUser(userName, email, password);
                Swal.fire("Account Created", "Please complete your profile", "success");
                setIsLogin(true); // Signup ke baad user login screen par jaye ya direct setup par
            }
        } catch (err: any) {
            Swal.fire("Error", err.message, "error");
        } finally {
            setLoading(false);
        }
    };
    
    const handleGoogleAction = async () => {
        setGoogleLoading(true);
        try {
            await loginWithGoogle();
            Swal.fire("Success", "Google Login Successful", "success");
            // Google login ke baad bhi profile complete karwana zaroori hai
            navigate("/patient-profile");
        } catch (err: any) {
            Swal.fire("Error", err.message, "error");
        } finally {
            setGoogleLoading(false); // Fix: Yahan loading state sahi karein
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 10 }}>
            <Paper sx={{ p: 4, borderRadius: 4 }}>
                <Typography variant="h4" textAlign="center" mb={2}>
                    {isLogin ? "Login" : "Sign Up"}
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <TextField
                            fullWidth
                            label="Username"
                            margin="normal"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            onBlur={() => setErrors((prev) => ({ ...prev, user: validateUserName() }))}
                            error={!!errors.user}
                            helperText={errors.user}
                            InputProps={{ startAdornment: <Person sx={{ mr: 1 }} /> }}
                        />
                    )}

                    <TextField
                        fullWidth
                        label="Email"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => setErrors((prev) => ({ ...prev, email: validateEmail() }))}
                        error={!!errors.email}
                        helperText={errors.email}
                        InputProps={{ startAdornment: <Email sx={{ mr: 1 }} /> }}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => setErrors((prev) => ({ ...prev, password: validatePassword() }))}
                        error={!!errors.password}
                        helperText={errors.password}
                        InputProps={{
                            startAdornment: <Lock sx={{ mr: 1 }} />,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={22} /> : isLogin ? "Login" : "Create Account"}
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<GoogleIcon />}
                        onClick={handleGoogleAction}
                        disabled={googleLoading}
                        sx={{ mt: 2, mb: 1, textTransform: 'none', borderRadius: '8px' }}
                    >
                        {/* Continue with Google */}
                        {googleLoading ? <CircularProgress size={22} /> : isLogin ? "Login with Google" : "SignUp with Google"}
                    </Button>

                    <Divider sx={{ my: 3 }} />

                    <Button fullWidth onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Create new account" : "Already have account? Login"}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default AuthPage;
