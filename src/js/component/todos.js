import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export const Todos = props => {
	let D = "https://assets.breatheco.de/apis/fake/todos/user/IsraelVasquez";
	/*let lista = [
		"pasear al perro",
		"cortar el pasto",
		"tomar los medios de produccion"
	];*/
	const [task, setTask] = useState([{ label: "dummy todo" }]);
	let addTask = e => {
		if (e.keyCode == 13) {
			//	console.log(lista);
			let frase = e.target.value;
			let frasePMayus = frase.charAt(0).toUpperCase() + frase.slice(1);
			let todo = { label: frasePMayus, done: false };
			let todosnewlist = [...task, todo];
			setTask(todosnewlist);

			fetch(D, {
				method: "PUT",
				body: JSON.stringify(todosnewlist),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(resp => {
					return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
				})
				.then(data => {
					//here is were your code should start after the fetch finishes
					console.log(data); //this will print on the console the exact object received from the server
				})
				.catch(error => {
					//error handling
					console.log(error);
				});
		}
	};
	let deleteTask = i => {
		//	console.log(lista);
		let newlist = task.filter((el, index) => index !== i);
		setTask(newlist);
		fetch(D, {
			method: "PUT",
			body: JSON.stringify(newlist),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//here is were your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
	};

	useEffect(() => {
		fetch(D)
			.then(resp => {
				// will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//here is were your code should start after the fetch finishes
				console.log(data);
				setTask(data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				console.log(error);
				fetch(D, {
					method: "POST",
					body: JSON.stringify([]),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => {
						return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
					})
					.then(data => {
						//here is were your code should start after the fetch finishes
						console.log(data); //this will print on the console the exact object received from the server
					})
					.catch(error => {
						//error handling
						console.log(error);
					});
			});
	}, []);
	let deleteList = i => {
		setTask([]);
		fetch(D, {
			method: "DELETE",

			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//here is were your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
	};
	return (
		<div id="titulo" className="container aligned-content-center">
			<div>
				<h1 className="col justify-content-center text-center">
					ToDo&#39;s
				</h1>
				<div
					id="caja"
					className="col justify-content-center mx-auto shadow-lg  px-0 rounded">
					<input
						className="col justify-content-center list-group-item"
						type="text"
						id="myText"
						placeholder="Que hace falta por hacer&#63;"
						onKeyDown={addTask}></input>

					<ul className="list-group">
						{task.map((el, index) => (
							<li
								id="tarea"
								className="list-group-item"
								key={index}>
								<span>{el.label}</span>
								<button
									id="x"
									type="button"
									className="btn"
									aria-label="Close"
									onClick={() => deleteTask(index)}>
									<span aria-hidden="true">&times;</span>
								</button>
							</li>
						))}
					</ul>

					<p
						id="nroitem"
						className="col justify-content-center list-group-item">
						{task.length} items left
					</p>
				</div>
				<div id="delete" className="mx-auto">
					<button
						className="btn btn-danger col "
						onClick={() => deleteList()}>
						DELETE THE ENTIRE LIST
					</button>
				</div>
			</div>
		</div>
	);
};
