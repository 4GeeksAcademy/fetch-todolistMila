import React, { useEffect, useState }from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [task, setTask] = useState ('');
	const [list, setList] = useState ([]);

	const handleChange = (e) => {
		setTask(e.target.value)
	};

	const handleKeyDown = (e) => {
		if (e.key ==='Enter') {
			e.preventDefault();
			agregarTarea();
		}
	};

	const agregarTarea = async () => {
		if (task.trim() === '') return;
		await fetch ('https://playground.4geeks.com/todo/todos/Milangelawpz', {
			method: 'POST',
			body: JSON.stringify(
				{
					'label': task,
					'is_done': false
				}
			),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		setTask('');
		await getTareasMilangelawpz();
	};

	const getTareasMilangelawpz = async () => {
		const response = await fetch('https://playground.4geeks.com/todo/users/Milangelawpz')
		if (!response.ok) {
			await crearMilangelawpz();
		}
		const data= await response.json();
		setList(data.todos)	
	};

	const crearMilangelawpz = async () => {
		await fetch('https://playground.4geeks.com/todo/users/Milangelawpz', {method: 'POST'});
	};

	useEffect(() => {
		getTareasMilangelawpz()
	}, []);

	const handleDelete = async (id) => {
		await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: 'DELETE'
		});
		await getTareasMilangelawpz();
	};

	return (
    <div className="todoContainer">
      <h1>To Do List</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Anything  else?"
      />

      <div>
        {list.length === 0 ? (
          <div className="noTask">All done, time to chill 👽</div>
        ) : (
          list.map((t) => (
            <div key={t.id} className="taskItem">●
              {t.label}
              <span
                className="deleteBtn"
                onClick={() => handleDelete(t.id)}
              >
                x
              </span>
            </div>
          ))
        )}
      </div>

      <div className="footer">{list.length} task(s)</div>
    </div>
  );

};


export default Home;