
// without using redux 

import { useState } from "react"; 

const Users = () => {

    const [data, setData] = useState([]);
    const [userName, setUserName] = useState("Name");
    const [userEmail, setUserEmail] = useState("Email");

    const apiGet = (val) => {
        fetch(`https://reqres.in/api/users?page=${val}`)
        .then((response) => response.json())
        .then((json) => {
            const newdata = json.data;
            setData(newdata);
        });
    }
    const updateUser = (id) => {
        const url = `https://reqres.in/api/users/${id}`;
        fetch(url)
        .then((response) => response.json())
        .then((json) => {
            setUserName(json.data.first_name);
            setUserEmail(json.data.email);
        });
    }
  return (
    <div> 
        <button onClick={() => { apiGet(1)}}>Users</button>

        <div>
            <h1>
                {userName}
            </h1>
            <h3>
                {userEmail}
            </h3>
        </div>

        <div>
            {data.map((item) => (
                <button key={item.id} onClick={() => {
                    updateUser(item.id);
                }} >
                    {item.id}
                </button>
            ))}
        </div>
        <div>
            <button onClick={() => { apiGet(2) }}> Next Page </button>
        </div>
    </div>
  )
}

export default Users