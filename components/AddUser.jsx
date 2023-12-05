import { useState } from "react";

import UserCard from "./UserCard.jsx";

import { useUsers, useUsersDispatch } from "../utils/UserReducerContext.js";

export default function AddUser() {
  const [user, setUser] = useState({ id: "", name: "", bio: "" });

  const users = useUsers();
  const dispatch = useUsersDispatch();

  const handleAdd = () => {
    if (!user.id || !user.name || !user.bio) {
      alert("AddUser: Please fill out all fields.");
      return;
    }

    if (users.find((u) => u.id === user.id)) {
      alert(`AddUser: User with the id of ${user.id} already exists.`);
      return;
    }

    setUser({ id: "", name: "", bio: "" });
    dispatch({ type: "ADD_USER", payload: user });
  };

  return (
    <>
      <div className="add_user">
        <h2>Add User</h2>
        <UserCard user={user} setUser={setUser} />
        <button onClick={handleAdd}>Add User</button>
      </div>
    </>
  );
}
