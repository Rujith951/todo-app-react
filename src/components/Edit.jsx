import React, { useState } from "react";
import { HiPlusSmall } from "react-icons/hi2";
import { useThemeContext } from "../contexts/ThemeContext";

function Edit({ visible, setTodos, selectedID, setVisible }) {
	const [textE, setTextE] = useState("");
	const { theme } = useThemeContext();

	function Edittodo() {
		if (textE)
			setTodos(prev => {
				const clone = structuredClone(prev);
				let matchI = clone.find(itm => itm.id == selectedID.current);
				matchI.name = textE;
				return clone;
			});
		setVisible(false);
		setTextE("");
	}

	return (
		<div
			className={`${
				visible ? "translate-y-[0%]" : "translate-y-[-105%]"
			} absolute h-[160px] w-[400px]  bg-orange-800 shadow-md shadow-[#b5badc] rounded-b-lg overflow-hidden duration-500`}
		>
			<div className=" w-full h-[63%] bg-gradient-to-r from-[#4226a3] to-[#631b81] flex  flex-col px-5">
				<div className="h-[47%]">
					<h1 className="text-xl text-[#fbfeff] font-semibold">Edit Todo</h1>
				</div>
				<div
					className={`${
						theme === "DARK" ? "bg-[#25273c] " : "bg-[#fbfeff]"
					} h-[43%] bg-[#25273c] flex p-1 rounded-md`}
				>
					<input
						type="text"
						value={textE}
						onChange={e => setTextE(e.target.value)}
						placeholder="Type here to edit todo..."
						className={`${
							theme === "DARK" ? "text-[#fbfeff]" : "text-[#25273c]"
						} w-[95%] outline-none bg-transparent  pl-5`}
					/>
					<div className="w-[5%] flex justify-center items-center">
						<HiPlusSmall
							className={`${
								theme === "DARK" ? "text-[#fbfeff]" : "text-[#25273c]"
							}`}
							onClick={Edittodo}
						/>
					</div>
				</div>
			</div>
			<div className="w-full h-[37%] bg-gradient-to-r from-[#4226a3] to-[#631b81]"></div>
		</div>
	);
}

export default Edit;
