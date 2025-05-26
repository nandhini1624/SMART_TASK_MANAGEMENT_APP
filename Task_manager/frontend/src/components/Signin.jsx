import Tasks from "./Tasks";

const Signin = (props) => {
  console.log(props.userdata.username);

  return (
    <div className="taskmanager-container">
      <h1 className="welcome-message">
        Welcome to Task Manager {props.userdata.username}!
      </h1>
      <div className="task-list-animated">
        <div className="task-card">📝 Plan your day</div>
        <div className="task-card">✅ Track your tasks</div>
        <div className="task-card">🚀 Achieve your goals</div>
      </div>
      <Tasks
        tasks={props.userdata.tasks}
        username={props.userdata.username}
      ></Tasks>
    </div>
  );
};

export default Signin;
