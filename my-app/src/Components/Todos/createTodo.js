import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Grid from "@mui/material/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "../devices/devices-components/components-form/button.js";
import Select from "../devices/devices-components/components-form/select.js";
import TextField from "../devices/devices-components/components-form/textfield";

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
    <div style={{ width: "30%", border: "black solid 2px", padding: 10 }}>
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATES
        }}
        validationSchema={FORM_VALIDATION}
        onSubmit={values => {
         
          task = values;
          task.time = new Date().toLocaleTimeString();
          const today = new Date();
          const date = `${today.getDate()}-${
            today.getMonth() + 1
            }-${today.getFullYear()}`;
            task.date = date;
          //   task.priority = priority1[values.priority]
          // task.project = projects[values.project]
          task.id = id_setter
          task.status = false;
          console.log(task);
          props.setAllTodo([...props.tasks, task]);
        }}
      >
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography align="center">Enter Task Details</Typography>
            </Grid>

            <Grid
              item
              xs={12}
              // justifyContent="space-between"
              style={{ display: "flex" }}
           
            >
              <Grid item xs={4}>
                <TextField
                  name="title"
                  label="Title"
                  // style={{ marginRight: "30px" }}
                />
              </Grid>
              <Grid item xs={4}>
                <Select name="project" label="Project" options={projects}  />
              </Grid>
              <Grid item xs={4}>
                <Select name="priority" label="Priority" options={priority1} />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="details"
                label="Details"
                multiline={true}
                rows={2}
              />
            </Grid>

            <Grid item xs={12}>
              <Button>Create Task</Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </div>
  );
}
