import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import useStore from "../../state/store";

export default function Register() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const navigate = useNavigate();
  const store = useStore();
  const toast = store.addToast;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        throw Error("Passwords must match.");
      }

      const res = await Meteor.callAsync("registerUser", username, password);

      if (res) {
        toast({
          title: "Account created.",
          description: "Check your email for a link to complete enrollment.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        navigate("/");
      }
    } catch (error: any) {
      console.log({ error });
      toast({
        title: "Error.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <header>
        <h1>Register</h1>
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

            <div className="form-group">
              <label htmlFor="password">Confrm Password</label>
              <input
                id="password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div>
              <input type="submit" value="Register" />
            </div>
          </form>

          <Link to="/login">Login</Link>
        </div>
      </main>
    </>
  );
}
