import { Button } from "@mui/base";
import "./Devpage.css";
import axios from "axios";
import { useEffect, useState } from "react";
export default function DevPage() {
  const [users, setUsers] = useState([]);
  const server = "https://cybertracker-50ev.onrender.com";
  useEffect(() => {
    axios.get(`${server}/user/`).then((e) => {
      const data = e.data;
      console.log(data);
      setUsers(data);
    });
  }, []);

  const [isPhishingSent, setPhishingSent] = useState(false);

  return (
    <div className="main">
      {users.map((user, index) => (
        <div
          onClick={async () => {
            const id = user["_id"];
            const email = (await axios.get(`${server}/user/${id}`)).data["email"];
            await axios.post(`${server}/dev/send_phishing_email`, {
              source: "buchi@buchi.dev",
              recepient: email,
              user: id,
            });
            
            setPhishingSent(true);
          }}
          className="user"
          key={index}
        >
          Name: {user["name"]}
        </div>
      ))}
      <Button className="button">Send a Phishing email</Button>
    </div>
  );
}
