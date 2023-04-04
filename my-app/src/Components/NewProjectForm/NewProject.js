import React from "react";
import Sidebar from "../sidebar/side-bar.js";
import Navbar from "../navbar/navbar.js";
import {
  Formik,
  Form,
  Field
} from "formik";
import * as Yup from "yup";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import "./NewProject.css";
import Button from "@mui/material/Button";

const countryList = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas (the)",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia (Plurinational State of)",
  "Bonaire, Sint Eustatius and Saba",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory (the)",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cayman Islands (the)",
  "Central African Republic (the)",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands (the)",
  "Colombia",
  "Comoros (the)",
  "Congo (the Democratic Republic of the)",
  "Congo (the)",
  "Cook Islands (the)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Curaçao",
  "Cyprus",
  "Czechia",
  "Côte d'Ivoire",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic (the)",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Falkland Islands (the) [Malvinas]",
  "Faroe Islands (the)",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories (the)",
  "Gabon",
  "Gambia (the)",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and McDonald Islands",
  "Holy See (the)",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran (Islamic Republic of)",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea (the Democratic People's Republic of)",
  "Korea (the Republic of)",
  "Kuwait",
  "Kyrgyzstan",
  "Lao People's Democratic Republic (the)",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands (the)",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia (Federated States of)",
  "Moldova (the Republic of)",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands (the)",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger (the)",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Northern Mariana Islands (the)",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine, State of",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines (the)",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Republic of North Macedonia",
  "Romania",
  "Russian Federation (the)",
  "Rwanda",
  "Réunion",
  "Saint Barthélemy",
  "Saint Helena, Ascension and Tristan da Cunha",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Martin (French part)",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Sint Maarten (Dutch part)",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and the South Sandwich Islands",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan (the)",
  "Suriname",
  "Svalbard and Jan Mayen",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan",
  "Tajikistan",
  "Tanzania, United Republic of",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands (the)",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates (the)",
  "United Kingdom of Great Britain and Northern Ireland (the)",
  "United States Minor Outlying Islands (the)",
  "United States of America (the)",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela (Bolivarian Republic of)",
  "Viet Nam",
  "Virgin Islands (British)",
  "Virgin Islands (U.S.)",
  "Wallis and Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe",
  "Åland Islands"
];
const waterbodyTypes = ["Lake", "River", "Dam", "pond", "Ocean"];


// This is the validation schema. You can change it to change validation. Look up Yup documentation for more.
const validationSchema = Yup.object().shape({
  city: Yup.string().required("City is required"),
  description: Yup.string()
    .max(124)
    .required("description is required"),
  location: Yup.string()
    .required("Location is required")
    .max("100", "Location should not exceed 100"),
  province: Yup.string().required("Province is required"),
  country: Yup.string().required("Please select a country"),
  waterbodytype: Yup.string().required("Please select a Water body type")
});

const NewProject = () => (
  <div>
    <Navbar />
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "32vh auto"
        // gridGap: "2px"
      }}
    >
      <div>
        <Sidebar name="newproject" />
      </div>
      <div className="box">
        <div className="container">
          <h1
            style={{
              textAlign: "center",
              paddingBottom: "20px",
              paddingTop: "10px"
            }}
          >
            New Project
          </h1>
          <Formik
            initialValues={{
              country: "Pakistan",
              city: "",
              province: "",
              description: "",
              location: "",
              waterbodytype: ""
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {({ errors, touched }) => (
              <Form className="">
                <div>
                  <InputLabel id="country-label">Country</InputLabel>
                  <Field
                    fullWidth
                    name="country"
                    as={Select}
                    labelId="country-label"
                  >
                    {countryList.map(country => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </Field>
                </div>
                <br />
                <div>
                  {/* <label>Province</label> */}
                  <Field
                    as={TextField}
                    fullWidth
                    label="Province"
                    style={{ fontSize: "30px" }}
                    name="province"
                    type="text"
                    error={Boolean(touched.province && errors.province)}
                    helperText={touched.province ? errors.province : ""}
                  />
                </div>{" "}
                <br />
                <div>
                  <Field
                    as={TextField}
                    fullWidth
                    label="City"
                    variant="standard"
                    name="city"
                    type="text"
                    error={Boolean(touched.city && errors.city)}
                    helperText={touched.city ? errors.city : ""}
                  />
                </div>{" "}
                <br />
                <div>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Description"
                    variant="standard"
                    multiline
                    name="description"
                    type="text"
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description ? errors.description : ""}
                  />{" "}
                </div>
                <br />
                <div>
                  <Field
                    name="location"
                    type="text"
                    as={TextField}
                    fullWidth
                    label="Location"
                    variant="standard"
                    error={Boolean(touched.location && errors.location)}
                    helperText={touched.location ? errors.location : ""}
                  />
                </div>
                <br />
                <div>
                  <InputLabel id="body-label">Waterbody Type</InputLabel>
                  <Field
                    name="waterbodytype"
                    as={Select}
                    fullWidth
                    labelId="body-label"
                    error={Boolean(
                      touched.waterbodytype && errors.waterbodytype
                    )}
                    helperText={
                      touched.waterbodytype ? errors.waterbodytype : ""
                    }
                  >
                    {waterbodyTypes.map(types => (
                      <option key={types} value={types}>
                        {types}
                      </option>
                    ))}
                  </Field>
                </div>
                <br />
                <Button fullWidth variant="contained" type="submit">
                  Create Project
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  </div>
);

export default NewProject;
