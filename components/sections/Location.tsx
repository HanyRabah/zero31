"use client";
import { useEffect, useState } from "react";

const formatLocation = (latitude: number, longitude: number): string => {
	const latDirection = latitude >= 0 ? "N" : "S";
	const lonDirection = longitude >= 0 ? "E" : "W";
	// trim the latitude and longitude to be without decimal points
	longitude = Math.floor(longitude);
	latitude = Math.floor(latitude);

	return `${Math.abs(latitude)}°${latDirection}, ${Math.abs(longitude)}°${lonDirection}`;
};

const LocationInfo = () => {
	const [location, setLocation] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	const getLocation = async () => {
		try {
			// Use ipapi.co - free tier allows 1000 requests per day
			const response = await fetch("https://ipapi.co/json/", {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) throw new Error("Failed to fetch location");

			const data = await response.json();
			setLocation(formatLocation(data.latitude, data.longitude));
		} catch (error) {
			console.error("Error fetching location:", error);
			// Fallback coordinates for Cairo
			setLocation(formatLocation(30.0444, 31.2357));
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getLocation();
	}, []);

	if (!location) return null;

	return (
		<div className="container mx-auto px-4">
			<div className="flex justify-between align-center min-h-[72px] p-[20px]">
				<div className="text-lg font-bold text-black mb-2 font-neue">
					Interior + <br /> Architecture Office
				</div>
				<div className="text-lg text-black font-mono font-medium self-center">
					{isLoading ? <span className="animate-pulse">Loading...</span> : location}
				</div>
			</div>
		</div>
	);
};

export default LocationInfo;
