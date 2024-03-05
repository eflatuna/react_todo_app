import { useState } from "react";
import rocket from "../assets/rocket.png";
import todo from "../assets/todo.png";

const GorevEkle = ({ todos, setTodos }) => {
	const [texT, setText] = useState("");
	const [day, setDay] = useState("");
	const [display, setDisplay] = useState(true);

	const handleSubmit = (e) => {
		e.preventDefault();
		const id = Math.ceil(Math.random() * 100) + 6;

		//1.yol kalıcı kaydedilmeyen
		// setTodos([{id:id,text:texT,day:day,isDone:false},...todos])
		//2.yol localstoroge nin ilk yolu
		const newTodos = { id: id, text: texT, day: day, isDone: false };
		//*     todos = [newTodos, ...todos];
		//  setTodos(todos);
		//  localStorage.setItem("gorevler",JSON.stringify(todos))

		// 3.yol (localsoroge a yollamanın 2.yolu)

		localStorage.setItem("gorevler", JSON.stringify([...todos, newTodos]));
		setTodos(JSON.parse(localStorage.getItem("gorevler")));

		// input alanlarını boşaltmak için, altta inputlara value veriyoruz, burada da temizliyoruz
		setText("");
		setDay("");
	};
	return (
		<div>
			<header className="header">
				<img src={rocket} alt="" />
				<img src={todo} alt="" />
				<button
					className="btn"
					style={{ background: display ? "#1E6F9F" : "#5E60CE" }}
					onClick={() => setDisplay(!display)}
				>
					{display ? "CLOSE" : "SHOW"} ADD TASK BAR
				</button>
			</header>

			{display && (
				<form onSubmit={handleSubmit}>
					<div className="form-control">
						<label htmlFor="text">Task</label>
						<input
							id="text"
							type="text"
							name="text"
							onChange={(e) => setText(e.target.value)}
							value={texT}
						/>
					</div>
					<div className="form-control">
						<label htmlFor="day">Day & Time</label>
						<input
							id="day"
							type="datetime-local"
							onChange={(e) => setDay(e.target.value)}
							name="day"
							value={day}
						/>
					</div>
					<div>
						<button className="btn btn-submit" type="submit">
							SUBMİT
						</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default GorevEkle;
