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

	const getLocation = async () => {
		try {
			const response = await fetch("https://ip-api.com/json/");
			const data = await response.json();
			setLocation(formatLocation(data.lat, data.lon));
		} catch (error) {
			console.error("Error fetching location:", error);
		}
	};

	useEffect(() => {
		getLocation();
	}, []);

	return (
		<div className="container mx-auto px-4">
			<div className="flex justify-between align-center min-h-[72px] p-[20px]">
				<div className="text-lg font-bold text-black mb-2 font-neue">
					Interior + <br /> Architecture Office
				</div>
				<div className="text-lg text-black font-mono font-medium self-center">{location}</div>
			</div>
		</div>
	);
};

export default LocationInfo;
