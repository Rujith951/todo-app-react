import React, { memo, useState } from "react";
import { HiArchiveBoxXMark, HiPencilSquare, HiCheck } from "react-icons/hi2";
import { useThemeContext } from "../contexts/ThemeContext";

function Todo({ name, id, check, setTodos, setVisible, selectedID }) {
	console.log("selectedId", selectedID);
	const { theme } = useThemeContext();
	const handleDelete = () => {
		/*
		let todosCopy = structuredClone(todos);
		let fiiteredT = todosCopy.filter(itm => itm.id != id);
		setTodos(fiiteredT);
      */

		setTodos(prev => {
			let todosCopy = structuredClone(prev);
			let fiiteredT = todosCopy.filter(itm => itm.id != id);
			return fiiteredT;
		});
	};

	const handleCheck = () => {
		setTodos(prev => {
			let todosCopy = structuredClone(prev);
			let presI = todosCopy.find(itm => itm.id == id);
			presI.check = !presI.check;
			return todosCopy;
		});
	};

	return (
		<div>
			<div className="w-full h-[80px] border-b-2 border-[#2f3146] flex items-center p-4">
				<div className="w-[5%] h-full flex items-center justify-center">
					<div
						className={`h-8 w-8 rounded-full ${
							theme === "DARK" ? "border-[#eaeaff]" : "border-[#25273c]"
						} border cursor-pointer flex justify-center items-center  ${
							check && "bg-gradient-to-br from-[#83a1d1] to-[#5531ac]"
						}`}
						onClick={handleCheck}
					>
						<HiCheck className={`${check ? "text-[#eaeaff]" : "invisible"}`} />
					</div>
				</div>
				<h1
					className={` ${
						check ? "line-through" : ""
					} w-[87%] h-full flex items-center pl-2 ${
						theme === "DARK" ? "text-[#bdbfdf]" : "text-[#25273c]"
					}`}
				>
					{name}
				</h1>
				<div className="h-full w-[8%] flex justify-between items-center ">
					<HiArchiveBoxXMark
						// style={{ visibility: check ? "visible" : "hidden" }}
						color="red"
						size={18}
						onClick={handleDelete}
						cursor={"pointer"}
						className={`${check ? "visible" : "invisible	"}`}
					/>
					<HiPencilSquare
						size={18}
						cursor={"pointer"}
						onClick={() => {
							selectedID.current = id;
							setVisible(prev => !prev);
						}}
						className={`${
							theme === "DARK" ? "text-[#bdbfdf]" : "text-[#25273c]"
						}`}
					/>
				</div>
			</div>
		</div>
	);
}

export default memo(Todo);
