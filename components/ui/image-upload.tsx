import { Box, TextField, Typography } from "@mui/material";
import { ImageIcon, Upload, X } from "lucide-react";
import React, { useRef, useState } from "react";

interface ImageUploadProps {
	label: string;
	onChange: (data: { file: File | null; alt: string }, type: "file" | "alt") => void;
	deleteImage?: () => void;
	accept?: string;
	maxSize?: number;
	value: {
		file: string | undefined;
		alt: string | undefined;
	};
	preview?: string;
	ratio?: string;
	size?: string;
}

const ImageUpload = ({
	label,
	onChange,
	deleteImage,
	accept = "image/jpeg,image/png,image/jpg",
	maxSize = 5,
	value,
	preview,
	ratio = "3:1",
	size = "1500x500",
}: ImageUploadProps) => {
	const [isDragging, setIsDragging] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFile = (file: File | null) => {
		if (!file) {
			onChange({ file: null, alt: value.alt || "" }, "file");
			setError(null);
			return;
		}

		if (!accept.split(",").includes(file.type)) {
			setError("Invalid file type. Please upload a valid image.");
			return;
		}

		if (file.size > maxSize * 1024 * 1024) {
			setError(`File size must be less than ${maxSize}MB`);
			return;
		}

		onChange({ file, alt: value.alt || "" }, "file");
		setError(null);
	};

	const handleAltChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange({ file: null, alt: e.target.value }, "alt");
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);

		const file = e.dataTransfer.files[0];
		handleFile(file);
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = () => {
		setIsDragging(false);
	};

	const handleClick = () => {
		fileInputRef.current?.click();
	};

	const handleRemove = (e: React.MouseEvent) => {
		e.stopPropagation();
		deleteImage?.();
		handleFile(null);
	};

	return (
		<Box className="w-full space-y-4">
			<Typography variant="subtitle1" component="label" className="font-medium text-gray-700">
				{label}
			</Typography>

			{/* Alt Text Input */}
			<Box className="space-y-1">
				<TextField
					id={`${label}-alt-text`}
					label="Image alt text"
					value={value.alt}
					onChange={handleAltChange}
					placeholder="Enter a description for the image"
					variant="outlined"
					fullWidth
					error={!!error}
					helperText={!error ? "Provide a brief description of the image for accessibility" : error}
					required
				/>
			</Box>

			<Box
				onClick={handleClick}
				onDrop={handleDrop}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				className={`
					relative border-2 border-dashed rounded-lg p-6
					flex flex-col items-center justify-center
					cursor-pointer transition-all duration-200 h-[250px]
					${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"}
					${error ? "border-red-500 bg-red-50" : ""}
					${value.alt ? "pointer-events-auto" : "pointer-events-none"}
					${value.alt ? "opacity-100" : "opacity-50"}
				`}>
				<input
					ref={fileInputRef}
					type="file"
					accept={accept}
					onChange={e => handleFile(e.target.files?.[0] || null)}
					className="hidden"
				/>

				{preview || value.file ? (
					<Box className="relative w-full aspect-video">
						<img
							src={preview || value.file}
							alt={value.alt || "Image preview"}
							className="w-full h-[200px] object-contain rounded-md"
						/>
						<button
							onClick={handleRemove}
							className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white
                       hover:bg-red-600 transition-colors duration-200">
							<X className="w-[16px] h-[16px]" />
						</button>
					</Box>
				) : (
					<Box className="text-center">
						<Box className="flex flex-col items-center justify-center text-gray-500">
							{isDragging ? (
								<Upload className="w-10 h-10 mb-2 text-blue-500" />
							) : (
								<ImageIcon className="w-10 h-10 mb-2" />
							)}
							<Typography variant="body1" className="text-sm">
								Drop your image here, or <span className="text-blue-500">browse</span>
							</Typography>
							<Typography variant="caption" className="text-gray-400 mt-1">
								Supports: JPG, JPEG2000, PNG (max {maxSize}MB)
							</Typography>
						</Box>
					</Box>
				)}
			</Box>
			<Box className="flex flex-col items-start space-x-2">
				<Typography variant="caption" className="font-medium text-gray-700">
					{`Please upload images with a ${ratio} ratio.`}
				</Typography>
				<Typography variant="caption" className="font-medium text-gray-700">
					{`Recommended size: ${size}`}
				</Typography>
			</Box>
			{error && (
				<Typography variant="caption" className="text-red-500">
					{error}
				</Typography>
			)}
		</Box>
	);
};

export default ImageUpload;
