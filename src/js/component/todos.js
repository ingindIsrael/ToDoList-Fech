import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export const Todos = props => {
	let lista = [
		"pasear al perro",
		"cortar el pasto",
		"tomar los medios de produccion"
	];
	const [task, setTask] = useState(lista);
	let addTask = e => {
		if (e.keyCode == 13) {
			console.log(lista);
			setTask([...task, e.target.value]);
		}
	};
	let deleteTask = i => {
		console.log(lista);
		setTask(task.filter((el, index) => index !== i));
	};

	return (
		<div id="titulo" className="container mx-auto">
			<div>
				<h1>ToDos</h1>
				<div id="caja" className="container border border-dark mx-auto">
					<input
						type="text"
						id="myText"
						placeholder="Que hace falta por hacer"
						onKeyDown={addTask}
					/>
					<br></br>
					<ul>
						{task.map((el, index) => (
							<li key={index}>
								{el}
								<button
									type="button"
									className="btn-close"
									aria-label="Close"
									onClick={() => deleteTask(index)}>
									x
								</button>
							</li>
						))}
					</ul>
					<p>{task.length} items left</p>
				</div>
			</div>
		</div>
	);
};
