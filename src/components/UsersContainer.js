import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../redux";
import axios from "axios";
import Button from "@mui/material/Button";
import { Container } from "@mui/system";
import Typography from "@mui/material/Typography";
import './styles.css';



function UsersContainer({ userData, fetchUsers }) {
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const [userName, setUserName] = useState("Name");
  const [userEmail, setUserEmail] = useState("Email");

  const updateUser = (id) => {
    const url = `https://reqres.in/api/users/${id}`;
    axios
      .get(url)
      .then((response) => {
        setUserName(response.data.data.first_name);
        setUserEmail(response.data.data.email);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return userData.loading ? (
    <h2>Loading</h2>
  ) : userData.error ? (
    <h2>{userData.error}</h2>
  ) : (
    <div>
      <Container sx={{padding: 3}}>
        <Typography  variant="h4" sx={{ padding: 1, color: 'success.main' }} component="h2">{userName}</Typography>
        <Typography  variant="h4" sx={{ padding: 1, color: 'success.main' }} component="h2">{userEmail}</Typography>
      </Container>
      <Container >
        <Typography  component="h2" sx={{ padding: 1 , color: 'info.main'  }} variant="h5">Users List</Typography>
        <Container sx={{padding: 3}} maxWidth="sm">
          {userData &&
            userData.users &&
            userData.users?.map((item) => (
              <Button
                className="button"
                vairant="contained"
                key={item.id}
                onClick={() => {
                  updateUser(item.id);
                }}
              >
                {item.id}
              </Button>
            ))}
        </Container>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
