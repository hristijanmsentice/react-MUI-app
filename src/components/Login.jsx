import {
	Grid,
	Paper,
	TextField,
	OutlinedInput,
	InputAdornment,
	IconButton,
	Button,
	Divider,
	Snackbar,
	Alert
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/login.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { green } from "@mui/material/colors";
const Login = () => {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [showError, setError] = useState(false)
	const showHidePassword = () => {
		setShowPassword(!showPassword);
	};
	const signIn = () => {
		if (username === "admin" && password === "1234") {
			localStorage.setItem("user", JSON.stringify({ username, password }));
			const emails = [
				{ name: "Kiko", email: "hmirchevski@gmail.com", color: 'green' },
				{ name: "Martin", email: "mkocev@gmail.com", color: 'blue' },
				{ name: "Filip", email: "farsovski@gmail.com", color: 'red' },
			];
			localStorage.setItem("emails", JSON.stringify(emails));
			navigate("/todo");
		} else {
			setError(true)
		}
	};
	return (
		<div style={{ display: "flex", height: "100vh" }} className="login-main">
			<Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={showError} autoHideDuration={6000} onClose={() => setError(false)}>
				<Alert
					onClose={() => setError(false)}
					severity="error"
					variant="filled"
					sx={{ width: '100%' }}
					>
					Invalid Credentials!
				</Alert>
			</Snackbar>
			<Paper
				elevation={3}
				square={false}
				sx={{
					width: "800px",
					height: "500px",
					borderRadius: "24px",
					padding: "10px 36px",
					alignContent: "center",
					border: "1px solid #e3e3e3",
					backgroundColor: "transparent",
					backdropFilter: "blur(16px)",
					color: "white",
				}}
			>
				<div
					className="main-login-container"
					style={{ alignContent: "center" }}
				>
					<Grid
						container
						size={{ lg: 12, xl: 12, md: 12 }}
						sx={{
							display: "flex",
							alignContent: "center",
							backgroundColor: "transparent",
						}}
					>
						<Grid
							size={6}
							sx={{ borderRight: "1px solid #717171", paddingRight: "36px" }}
						>
							<div
								style={{
									height: "400px",
									alignContent: "center",
									justifyContent: "center",
									textAlign: "center",
								}}
							>
								<img
									src="/logo.png"
									style={{ height: "80px", width: "80px" }}
								/>
								<div style={{ textAlign: "justify", marginTop: '20px' }}>
									Welcome to the number one leading application for managing
									with tasks. Make the process look easier and get the detailed
									reports and charts about your team progress!
								</div>
							</div>
						</Grid>
						<Grid
							size={6}
							sx={{ padding: "36px 0px 36px 36px", alignContent: "center" }}
						>
							<Grid size={12}>
								<TextField
									className="custom-text-field"
									variant="outlined"
									fullWidth
									sx={{
										color: "white",
										border: "1px solid white",
										borderRadius: "8px",
										"& .MuiOutlinedInput-root": {
											"& fieldset": {
												border: "none", // normal
											},
											"&:hover fieldset": {
												border: "none", // hover
											},
											"&.Mui-focused fieldset": {
												border: "none", // focus
												color: "white"
											},
										},
									}}
									label={"Email"}
									value={username}
									onChange={(e) => setUserName(e.target.value)}
									placeholder="Enter your username"
								/>
							</Grid>
							<Grid
								size={{ lg: 12, xl: 12, md: 12 }}
								sx={{ marginTop: "12px" }}
							>
								<TextField
									className="custom-text-field"
									fullWidth
									label="Password"
									placeholder="Enter your password"
									sx={{
										color: "white",
										border: "1px solid white",
										borderRadius: "8px",
										"& .MuiOutlinedInput-root": {
											"& fieldset": {
												border: "none", // normal
											},
											"&:hover fieldset": {
												border: "none", // hover
											},
											"&.Mui-focused fieldset": {
												border: "none", // focus
											},
										},
									}}
									id="outlined-start-adornment"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									type={!showPassword ? "password" : "text"}
									slotProps={{
										input: {
											endAdornment: (
												<IconButton
													aria-label={
														showPassword
															? "hide the password"
															: "display the password"
													}
													onClick={() => showHidePassword()}
													edge="end"
												>
													{!showPassword ? <VisibilityOff sx={{ color: '#ffffff' }}/> : <Visibility  sx={{ color: '#ffffff' }}/>}
												</IconButton>
											),
										},
									}}
								/>
								<Button
									onClick={() => signIn()}
									variant="outlined"
									color="green[600]"
									fullWidth
									sx={{ marginTop: "24px", height: "56px", color: green[600] }}
								>
									Sign in
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</div>
			</Paper>
		</div>
	);
};

export default Login;
