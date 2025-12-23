import React, { useState } from "react";
import MainLayout from "../../Layout/MainLayout";
import "./NewProject.css";
import { TextField, InputLabel, Select, Button, MenuItem, FormControl, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { projectsAPI } from "../../../services/api";
import { Box } from '@mui/system';
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
  "North Korea",
  "South Korea",
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

/**
 * NewProject - Form for creating a new project
 */
const NewProject = () => {
  const navigate = useNavigate();
  const [country, setCountry] = useState("Pakistan");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());

    const { name, location, country, longitude, latitude, description } = formObject;

    try {
      const response = await projectsAPI.create({
        Name: name,
        Location: location,
        Country: country,
        Longitude: parseFloat(longitude),
        Latitude: parseFloat(latitude),
        Description: description,
      });

      const { Id } = response.data;
      navigate(`/deviceDeployment?project=${Id}`);
    } catch (error) {
      console.error("Error creating project:", error);
      alert(error.response?.data?.message || "Error creating project. Please try again.");
    }
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <MainLayout sidebarName="Create New Project">
      <Box
        sx={{
          maxWidth: { xs: "100%", md: "800px" },
          mx: "auto",
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 2,
          p: { xs: 2, sm: 4 },
        }}
      >
        <div className="box">
          <div className="container">
            <Typography variant="h5" align="center" gutterBottom>
              <strong>New Project</strong>
            </Typography>

            <form onSubmit={handleSubmit}>
              <div>
                <TextField
                  fullWidth
                  label="Project Name"
                  style={{ fontSize: "30px" }}
                  name="name"
                  type="text"
                  required
                  variant="standard"
                />
              </div>

              <br />
              <div>
                <FormControl fullWidth>
                  <InputLabel id="country-label">Country</InputLabel>
                  <Select
                    labelId="country-label"
                    name="country"
                    value={country}
                    onChange={handleCountryChange}
                    required
                    variant="standard"
                  >
                    {countryList.map((country) => (
                      <MenuItem key={country} value={country}>
                        {country}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  type="text"
                  required
                  variant="standard"
                />
              </div>

              <div>
                <TextField
                  fullWidth
                  label="Latitude"
                  name="latitude"
                  type="text"
                  required
                  variant="standard"
                  inputProps={{
                    pattern: "^[0-9]+(\\.[0-9]{1,15})?$"
                  }}
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  label="Longitude"
                  name="longitude"
                  type="text"
                  required
                  variant="standard"
                  inputProps={{
                    pattern: "^[0-9]+(\\.[0-9]{1,15})?$"
                  }}
                />
              </div>


              <div>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  name="description"
                  type="text"
                  required
                  variant="standard"
                />
              </div>
              <div>
              </div>
              <br></br>
              <div style={{ textAlign: "center" }}>
                <Button
                  color="primary"
                  type="submit"
                  variant="contained"
                >
                  Create Project
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Box>
    </MainLayout>
  );
};

export default NewProject;
