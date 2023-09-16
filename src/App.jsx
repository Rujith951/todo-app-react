import React, { useEffect, useRef, useState } from "react";
import { HiSun, HiOutlinePlusSmall, HiMoon } from "react-icons/hi2";
import Todo from "./components/Todo";
import Edit from "./components/Edit";
import { useThemeContext } from "./contexts/ThemeContext";

function App() {
	const [todos, setTodos] = useState([]);
	const [text, setText] = useState("");
	const [filter, setFilter] = useState("All");
	const [visible, setVisible] = useState(false);
	const selectedID = useRef(null);
	const { theme, setTheme } = useThemeContext();

	useEffect(() => {
		if (selectedID.current) selectedID.current = null;
	}, [todos]);

	const derivedTodos = todos.filter(item => {
		switch (filter) {
			case "Active":
				return !item.check;
			case "Completed":
				return item.check;
			default:
				return true;
		}
	});

	const Addtodo = () => {
		if (text != "") {
			setTodos(prev => [
				...prev,
				{
					name: text,
					check: false,
					id: Date.now(),
				},
			]);
		}
		setText("");
	};

	function showAllTodos() {
		setFilter("All");
	}
	function showActive() {
		setFilter("Active");
	}
	function showCompleted() {
		setFilter("Completed");
	}
	function clearCompleted() {
		setTodos(() => {
			let todosCopy = structuredClone(todos);
			let clearT = todosCopy.filter(itm => !itm.check == true);
			return clearT;
		});
	}

	return (
		<div className="flex flex-col  h-screen w-screen justify-center items-center ">
			<div className="absolute  h-[600px] w-[900px] rounded-lg overflow-hidden ">
				<div className="h-[32%] ">
					<div className="flex justify-between pr-4 pl-1  h-[60%]  ">
						<h1 className="text-3xl tracking-[10px] font-bold text-white">
							TODO
						</h1>
						{theme === "DARK" ? (
							<HiSun
								size={25}
								color="white"
								cursor="pointer"
								onClick={() => {
									setTheme("LIGHT");
								}}
							/>
						) : (
							<HiMoon
								size={25}
								color="white"
								cursor="pointer"
								onClick={() => {
									setTheme("DARK");
								}}
							/>
						)}
					</div>
					<div
						className={`h-[29%] ${
							theme === "DARK" ? "bg-[#25273c]" : "bg-[#bdbfdf]"
						} rounded-md w-full flex overflow-hidden`}
					>
						<input
							value={text}
							onChange={e => setText(e.target.value)}
							type="text"
							placeholder="Create a new todo..."
							className={`h-full w-[95%] ${
								theme === "DARK"
									? "bg-transparent text-[#bdbfdf]"
									: "bg-[#bdbfdf] text-[#25273c]"
							}  outline-none p-4 pl-20 placeholder-[#5e6676]`}
						/>
						<div className="flex justify-center items-center h-full w-[5%]">
							<HiOutlinePlusSmall
								color={`${theme === "DARK" ? "#c4caeb" : "#25273c"}`}
								size={22}
								className="font-bold"
								onClick={Addtodo}
								cursor={"pointer"}
							/>
						</div>
					</div>
				</div>
				<div
					className={`h-[58%] ${
						theme === "DARK" ? "bg-[#25273c]" : "bg-[#bdbfdf]"
					}  rounded-t-md overflow-y-scroll`}
				>
					{derivedTodos.map(item => (
						<Todo
							key={item.id}
							{...item}
							setTodos={setTodos}
							setVisible={setVisible}
							selectedID={selectedID}
						/>
					))}
				</div>
				<div
					className={`h-[10%] ${
						theme === "DARK" ? "bg-[#25273c]" : "bg-[#bdbfdf]"
					} rounded-b-md border-t-2 border-[#2f3146] flex justify-between`}
				>
					<div className=" flex justify-center items-center h-full  w-[10%]">
						<h1
							className={`${
								theme === "DARK" ? "text-[#bdbfdf]" : "text-[#25273c]"
							}`}
						>
							{`${derivedTodos.reduce((acc, item) => {
								if (item.check === false) {
									return (acc += 1);
								}
								return acc;
							}, 0)}
							items left`}
						</h1>
					</div>
					<div className="flex h-full w-[30%] justify-between items-center">
						<h1
							className={`${
								theme === "DARK" ? "text-[#bdbfdf]" : "text-[#25273c]"
							} cursor-pointer ${filter === "All" && "text-[#2e74fc]"}`}
							onClick={showAllTodos}
						>
							All
						</h1>
						<h1
							className={`${
								theme === "DARK" ? "text-[#bdbfdf]" : "text-[#25273c]"
							} cursor-pointer ${filter === "Active" && "text-[#2e74fc]"}`}
							onClick={showActive}
						>
							Active
						</h1>
						<h1
							className={` ${
								theme === "DARK" ? "text-[#bdbfdf]" : "text-[#25273c]"
							} cursor-pointer ${filter === "Completed" && "text-[#2e74fc]"}`}
							onClick={showCompleted}
						>
							Completed
						</h1>
					</div>
					<div className=" flex justify-center items-center h-full w-[20%] ">
						<h1
							className={` ${
								theme === "DARK" ? "text-[#bdbfdf]" : "text-[#25273c]"
							} cursor-pointer `}
							onClick={clearCompleted}
						>
							Clear Completed
						</h1>
					</div>
				</div>
			</div>
			<div className="w-full h-[63%] bg-gradient-to-r from-[#4226a3] to-[#631b81] flex justify-center">
				<Edit
					setTodos={setTodos}
					todos={todos}
					visible={visible}
					setVisible={setVisible}
					selectedID={selectedID}
				/>
			</div>
			<div className="w-full h-[37%] bg-[#171723]" />
		</div>
	);
}

export default App;
