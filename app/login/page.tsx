// app/login/page.tsx
"use client";
import { Email, LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, Box, Button, Container, IconButton, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error || "Failed to login");
			}

			router.push("/dashboard");
		} catch (err: any) {
			console.log(err.stack);
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				backgroundColor: "grey.50",
				py: 12,
			}}>
			<Container maxWidth="sm">
				<Paper
					elevation={3}
					sx={{
						p: 4,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}>
					{/* Logo */}
					<Box sx={{ mb: 3 }}>
						<Image src="/logo/logo-full.svg" alt="Logo" width={150} height={50} priority />
					</Box>

					<Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
						Sign in to your account
					</Typography>

					{error && (
						<Alert severity="error" sx={{ width: "100%", mb: 3 }} onClose={() => setError("")}>
							{error}
						</Alert>
					)}

					<Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							value={email}
							onChange={e => setEmail(e.target.value)}
							error={!!error}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Email />
									</InputAdornment>
								),
							}}
						/>

						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type={showPassword ? "text" : "password"}
							id="password"
							autoComplete="current-password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							error={!!error}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<LockOutlined />
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="end">
										<IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>

						<Button
							className="bg-yellow rounded text-black font-bold"
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							loading={loading}>
							Sign In
						</Button>
					</Box>
				</Paper>
			</Container>
		</Box>
	);
}
