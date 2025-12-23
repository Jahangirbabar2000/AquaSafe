import React, { useState } from "react";
import MainLayout from "../Layout/MainLayout";
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

  function onCheckBoxClick(id) {
    const updatedTodos = props.todo.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          status: !todo.status
        };
      }
      return todo;
    });
    props.setTodos(updatedTodos);
  }



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
          <Checkbox
            checked={todo.status}
            onChange={() => onCheckBoxClick(todo.id)}
          />
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
      componentToRender = active.map(todo => (
        <SingleTodoCard
          key={todo.id}
          todo={todo}
          setAllTodo={props.setAllTodo}
          allTodo={props.todo}
        />
      ));
      break;
    case "completed":
      componentToRender = completed.map(todo => (
        <SingleTodoCard
          key={todo.id}
          todo={todo}
          setAllTodo={props.setAllTodo}
          allTodo={props.todo}
        />
      ));
      break;
    default:
      componentToRender = todos.map(todo => (
        <SingleTodoCard
          key={todo.id}
          todo={todo}
          setAllTodo={props.setAllTodo}
          allTodo={props.todo}
        />
      ));
      break;
  }
  return (
    <Box
      sx={{
        width: "90%",
        height: "85vh",
        backgroundColor: "#f5f5f5",
        margin: 3,
        overflow: "auto",
        border: "grey solid 2px"
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
          style={{ width: "100%", borderRadius: 0, backgroundColor: currentPage === "All" ? "green" : "" }}

        >
          All
        </Button>
        <Button
          onClick={() => setCurrentPage("active")}
          variant="contained"
          style={{ width: "100%", borderRadius: 0, backgroundColor: currentPage === "active" ? "green" : "" }}
        >
          Active
        </Button>
        <Button
          onClick={() => setCurrentPage("completed")}
          variant="contained"
          style={{ width: "100%", borderRadius: 0, backgroundColor: currentPage === "completed" ? "green" : "" }}
        >
          Completed
        </Button>
      </Box>
      <Box>{componentToRender}</Box>
    </Box>
  );
}


function Todos() {
  const [allTodo, setAllTodo] = useState(data);

  return (
    <MainLayout sidebarName="Tasks">
          {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
          <Typography variant="h3" sx={{ marginTop: 2, marginBottom: 3, marginLeft: "42%" }} align="left">
            <span style={{ fontWeight: "bold" }}>Tasks</span>
          </Typography>
          {/* </div> */}
          <Box sx={{ marginLeft: 3 }}>
            <CreateTodo tasks={allTodo} setAllTodo={setAllTodo} />
          </Box>
          <BigTodoBox todos={allTodo} setAllTodo={setAllTodo} />
    </MainLayout>
  );
}

export default Todos;
