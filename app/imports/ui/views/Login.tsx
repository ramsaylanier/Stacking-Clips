import React from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { Meteor } from "meteor/meteor";

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ username, password });
    Meteor.loginWithPassword(username, password);
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
