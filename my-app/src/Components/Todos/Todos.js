import React, { useState } from "react";
import Sidebar2 from "../sidebar/Sidebar2.js";
import Navbar from "../navbar/navbar.js";
import Button from "@mui/material/Button";
import data from "./todos.json";
import CreateTodo from "./createTodo";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";

const priority1 = ["High", "Medium", "Low"];
const projects1 = ["Tarbela Dam", "Rawal Lake", "Nust Lake"];

function SingleTodoCard(props) {
  const todo = props.todo;
  if (!isNaN(todo.priority)) {
    todo.priority = priority1[props.todo.priority];
  }
  if (!isNaN(todo.project)) {
    todo.project = projects1[props.todo.project];
  }
  const project = todo.project;
  const title = todo.title;
  const details = todo.details;
  const date = todo.date;
  const priority = todo.priority;
  const status = todo.status;
  const time = todo.time;

  return (
    <Box
      sx={{
        width: "98.5%",
        height: "115px",
        backgroundColor: "white",
        margin: 1,
        marginTop: 2,
        justifyContent: "space-between",
        boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
        overflow: "auto"
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Checkbox />
        </Grid>
        <Grid sx={{ wordWrap: "breakWord" }} item xs={6}>
          <Typography align="left">
            <span style={{ fontWeight: "bold" }}>Title:</span> {title}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography align="left">
            <span style={{ fontWeight: "bold" }}>Project:</span> {project}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography align="left">
            <span style={{ fontWeight: "bold" }}>Priority:</span> {priority}
          </Typography>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={10}>
          <Typography align="left">
            <span style={{ fontWeight: "bold" }}>Details:</span> {details}
          </Typography>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Typography align="left">
            <span style={{ fontWeight: "bold" }}></span>
            <span style={{ fontWeight: "bold" }}>Date:</span> {date}{" "}
            <span style={{ fontWeight: "bold" }}>Time:</span> {time}
          </Typography>
        </Grid>

        {/* <Grid item xs={2}>
          <Button align="primary" variant="outlined" startIcon={<DeleteIcon />}>
            Delete{" "}
          </Button>
        </Grid> */}
      </Grid>
    </Box>
  );
}

function BigTodoBox(props) {
  const [currentPage, setCurrentPage] = useState("All");
  const todos = props.todos;
  const completed = todos.filter(item => item.status === true);

  const active = todos.filter(item => item.status === false);

  let componentToRender;
  switch (currentPage) {
    case "active":
      componentToRender = <SingleTodoCard todo={active} />;
      break;
    case "completed":
      componentToRender = <SingleTodoCard todo={completed} />;
      break;
    default:
      componentToRender = <SingleTodoCard todo={todos} />;
      break;
  }

  return (
    <Box
      sx={{
        width: "90%",
        height: "85vh",
        backgroundColor: "#f5f5f5",
        margin: 3,
        overflow: "auto"
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center",
          gap: 0
        }}
      >
        <Button
          onClick={() => setCurrentPage("All")}
          variant="contained"
          style={{ width: "100%", borderRadius: 0 }}
        >
          All
        </Button>
        <Button
          onClick={() => setCurrentPage("active")}
          variant="contained"
          style={{ width: "100%", borderRadius: 0 }}
        >
          Active
        </Button>
        <Button
          onClick={() => setCurrentPage("completed")}
          variant="contained"
          style={{ width: "100%", borderRadius: 0 }}
        >
          Completed
        </Button>
      </Box>
      <Box>
        {currentPage === "All" &&
          todos.map(todo => <SingleTodoCard key={todo.id} todo={todo} />)}
        {currentPage === "active" &&
          active.map(todo => <SingleTodoCard key={todo.id} todo={todo} />)}
        {currentPage === "completed" &&
          completed.map(todo => <SingleTodoCard key={todo.id} todo={todo} />)}
      </Box>
    </Box>
  );
}

function Todos() {
  const [allTodo, setAllTodo] = useState(data);
  // this is used to navigate between all, active, and completed

  //   const [inProgress, setInProgress] = useState([]);
  //   const [todo, setTodo] = useState([])

  // const showAll = () => {
  //   console.log("Completed values")
  //   console.log(completed);
  //   console.log("active values")
  //   console.log(active);
  // };

  // const showTodos = () => {
  //     const todos = allTodo.filter(
  //         (item) => item.status === "todo"
  //     );
  //     setTodo(todos);
  //     console.log(todo)
  // };

  // const showProgress = () => {
  //             const progress = allTodo.filter(
  //         (item) => item.status === "in progress"
  //     );
  //     setInProgress(progress);
  //     console.log(inProgress);
  // };
  // const completed = allTodo.filter(item => item.status === "completed");
  // setCompleted(completed);
  // function showCompleted() {
  // const completed = data.filter(item => item.status === 'completed');
  //   console.log(isCompleted)
  // }

  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "28vh auto"
          // gridGap: "2px",
        }}
      >
        <div>
          <Sidebar2 name="Tasks" />
        </div>
        <div style={{ marginLeft: 60 }}>
          {/* <Button variant="contained" onClick={showAll}>
            All{" "}
          </Button> */}
          {/*  <Button variant="contained" onClick={showTodos}>
            Todos{" "}
          </Button>
                  <Button variant="contained" onClick={showProgress}>
            In Progress{" "}
          </Button>
                  <Button variant="contained" onClick={showCompleted()}>
            Completed{" "}
          </Button> */}
          <CreateTodo tasks={allTodo} setAllTodo={setAllTodo} />
          <BigTodoBox todos={allTodo} />
        </div>
      </div>
    </div>
  );
}

export default Todos;
