import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Grid from "@mui/material/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

const INITIAL_FORM_STATES = {
  title: "",
  details: "",
  priority: "",
  project: ""
};

const FORM_VALIDATION = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  details: Yup.string(),
  project: Yup.string().required(),
  priority: Yup.string().required()
});

const priority1 = ["High", "Medium", "Low"];
const projects = ["Tarbela Dam", "Rawal Lake", "Nust Lake"];

export default function CreateTodo(props) {
  const id_setter = props.tasks.length;
  let task = {};

  return (
    <div
      style={{
        width: "90%",
        border: "grey solid 2px",
        padding: 10,
        backgroundColor: "#f5f5f5"
      }}
    >
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATES
        }}
        validationSchema={FORM_VALIDATION}
        onSubmit={values => {
          task = values;
          task.time = new Date().toLocaleTimeString();
          const today = new Date();
          const date = `${today.getDate()}-${today.getMonth() + 1
            }-${today.getFullYear()}`;
          task.date = date;
          task.id = id_setter;
          task.status = false;
          console.log(task);
          props.setAllTodo([...props.tasks, task]);
        }}
      >
        <Form>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Grid container justifyContent="center">
                <Typography align="center">Enter Task Details</Typography>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={4}>
                  <TextField
                    name="title"
                    label="Title"
                    variant="standard"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <Select
                    name="project"
                    label="Project"
                    variant="standard"
                    fullWidth
                  >
                    {projects.map((project, index) => (
                      <option key={index} value={project}>
                        {project}
                      </option>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={4}>
                  <Select
                    name="priority"
                    label="Priority"
                    variant="standard"
                    fullWidth
                  >
                    {priority1.map((priority, index) => (
                      <option key={index} value={priority}>
                        {priority}
                      </option>
                    ))}
                  </Select>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container justifyContent="center">
                <TextField
                  name="details"
                  label="Details"
                  multiline
                  rows={1}
                  variant="standard"
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container justifyContent="center">
                <Button type="submit" variant="contained" color="primary">
                  Create Task
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </div>
  );
}
