import * as React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";

export default function AdminForm() {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      alert("Complete all the fields.");
    } else if (email === "syedamunamahasan@gmail" && password === "12345678") {
      localStorage.setItem("uid", email);
      navigate("/adminPortal");
      console.log("Valid email and password");
    } else {
      alert("Invalid email and password.");
    }
  };

  
  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: `url('https://img.freepik.com/premium-photo/various-car-parts-accessories-grey-background-3d-illustration_771335-35711.jpg')`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          maxWidth: 450,
          margin: "0 auto",
          padding: "20px",
          border: "1px solid black",
          backgroundColor: "rgba(255, 255, 255, 0.824)",
          backdropFilter: "blur(10px)", // Apply blur to the background
          borderRadius: "10px", // Add rounded corners for better aesthetics
        }}
      >
        <CardContent>
          <h1 className="d-flex justify-content-center mb-3 fw-bold">Admin Form</h1>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid xs={12} item>
                <TextField
                  required
                  label="AdminEmail"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  required
                  label="AdminPassword"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  variant="outlined"
                  fullWidth
                  type="password" // Ensure the password is masked
                />
              </Grid>
              <Grid
                xs={12}
                marginTop={2}
                item
                style={{ display: "flex", justifyContent: "center" }}
              >
                <button className="btn btn-dark px-5" type="submit">
                  Submit
                </button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
