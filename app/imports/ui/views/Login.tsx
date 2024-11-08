import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const currentUser = useTracker(() => Meteor.user());
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      Meteor.loginWithPassword(username, password);
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <>
      <header>
        <h1>Login</h1>
      </header>
      <main>
        <div className="content-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <input type="submit" value="Login" />
            </div>
          </form>

          <Link to="/register">Register</Link>
        </div>
      </main>
    </>
  );
}
