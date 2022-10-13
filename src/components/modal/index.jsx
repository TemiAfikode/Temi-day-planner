import React, { useContext, useEffect, useState } from "react";
import ReactSelect from "react-select";
import taskContext from "context/task/taskContext";
import uiContext from "context/ui/uiContext";
import validateState from "validation/stateValidation";
import style from "./modal.module.css";

const options = [
  { value: "urgent", label: "Urgent" },
  { value: "important", label: "Important" },
  { value: "needful", label: "Needful" },
  { value: "neccessary", label: "Neccessary" },
  { value: "usual", label: "Usual" },
];

const initialTaskState = {
  tag: "usual",
  dueDate: "",
  dueTime: "",
  task: "",
};

const initialErrorState = {
  open: false,
  errors: [{ message: "", path: "" }],
};

export function AddTaskModal({ edit, user }) {
  const [selectedOption, setSelectedOption] = useState({
    value: "usual",
    label: "Usual",
  });
  const [value, setValue] = useState(initialTaskState);
  const [showError, setShowError] = useState(initialErrorState);

  const {
    loading,
    createTask,
    updateTask,
    error,
    task,
    resetError,
    resetTask,
  } = useContext(taskContext);
  const { data } = useContext(uiContext);

  useEffect(() => {
    if (edit && data) {
      setValue({
        tag: data.tag,
        dueDate: data.dueDate,
        dueTime: data.dueTime,
        task: data.task,
      });
    }
  }, []);

  useEffect(() => {
    if (task) {
      setTimeout(() => {
        resetTask();
      }, 3000);
    }
  }, [task]);

  useEffect(() => {
    if (error) {
      setShowError({
        open: true,
        errors: [
          { message: error && error.message, path: error && error.path },
        ],
      });
    } else if (task) {
      setValue(initialTaskState);
    }

    setTimeout(() => {
      setShowError(initialErrorState);
    }, 3000);
  }, [error, task]);

  const onChange = (e) => {
    setShowError(initialErrorState);
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSelectionChange = (tag) => {
    setSelectedOption(tag);
    setValue({ ...value, tag: tag.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errors = validateState(value);
    if (errors.length > 0) {
      setShowError({
        open: true,
        errors,
      });
      return;
    }
    if (edit) updateTask(data._id, value);
    else createTask(value, user._id);
  };

  return (
    <div className={style["add-task-modal-content"]}>
      <h1>{edit ? "Edit Task" : "Add New Task"}</h1>
      {task && <span className="success">{task.message}</span>}
      <form className="form" onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="task-category">Tag</label>
          <ReactSelect
            defaultValue={selectedOption}
            onChange={handleSelectionChange}
            options={options}
          />
        </div>
        <div className="form-control">
          <label htmlFor="task-schedule-date">Schedule Date</label>
          <input
            type="date"
            name="dueDate"
            id="task-schedule-date"
            value={value.dueDate}
            onChange={onChange}
          />
          {showError.open &&
            showError.errors.some((e) => e.path === "dueDate") && (
              <span className="error">
                {" "}
                {
                  showError.errors.find((e) => e.path === "dueDate").message
                }{" "}
              </span>
            )}
        </div>
        <div className="form-control">
          <label htmlFor="task-schedule-time">Schedule Time</label>
          <input
            type="time"
            name="dueTime"
            id="task-schedule-time"
            value={value.dueTime}
            onChange={onChange}
          />
          {showError.open &&
            showError.errors.some((e) => e.path === "dueTime") && (
              <span className="error">
                {" "}
                {
                  showError.errors.find((e) => e.path === "dueTime").message
                }{" "}
              </span>
            )}
        </div>
        <div className="form-control">
          <label htmlFor="task">Task</label>
          <textarea
            name="task"
            id="task"
            rows="3"
            placeholder="Type here..."
            value={value.task}
            onChange={onChange}
          ></textarea>
          {showError.open &&
            showError.errors.some((e) => e.path === "task") && (
              <span className="error">
                {" "}
                {showError.errors.find((e) => e.path === "task").message}{" "}
              </span>
            )}
        </div>
        <div className="form-control">
          <button disabled={loading} type="submit">
            {loading ? "Please wait..." : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}

export function ViewTaskModal() {
  const { data } = useContext(uiContext);

  return (
    <div className={style["add-task-modal-content"]}>
      <h3 className={style["task-header"]}>{data.task}</h3>
      <div className={style["shared-due"]}>
        <span>Due Date:</span> <span>{data.dueDate}</span>
      </div>
      <div className={style["shared-due"]}>
        <span>Due Time:</span> <span>{data.dueTime}</span>
      </div>
      <div className={style["shared-email"]}>
        <p>Shared To:</p>
        <ul>
          {data.sharedTo.map((s, i) => (
            <li key={`shared-email-${i}`}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ShareTaskModal() {
  const [value, setValue] = useState("");
  const { shareLoading, shareTask, error, task, resetTask, resetError } =
    useContext(taskContext);
  const { data } = useContext(uiContext);

  useEffect(() => {
    if (task) {
      setValue("");
      setTimeout(() => {
        resetTask();
      }, 3000);
    }
    if (error) {
      setTimeout(() => {
        resetError();
      }, 3000);
    }
  }, [task, error]);

  const onSubmit = (e) => {
    e.preventDefault();
    shareTask(data._id, value);
  };

  return (
    <div className={style["add-task-modal-content"]}>
      <h2>Share Task To Someone</h2>
      <form onSubmit={onSubmit} className="form">
        {task && (
          <div className="form-control">
            <p className="success">{task.message}</p>
          </div>
        )}
        <div className="form-control">
          <label htmlFor="share-to">User Email</label>
          <input
            type="email"
            label="share-to"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter user email"
            required
          />
          {error && <span className="error">{error}</span>}
        </div>
        <div className="form-control">
          <button type="submit" disabled={shareLoading}>
            {shareLoading ? "Please wait..." : "Share"}
          </button>
        </div>
      </form>
    </div>
  );
}

export function ProcessingModal() {
  return <div>processing modal</div>;
}
