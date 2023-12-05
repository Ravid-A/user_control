import { useState } from "react";

import UserCard from "./UserCard.jsx";

import {
  useUsers,
  useUsersDispatch,
  ActionTypes,
} from "../utils/UserReducerContext.js";

let next_id = 0;

export default function AddUser() {
  const users = useUsers();
  const dispatch = useUsersDispatch();

  const [user, setUser] = useState({
    id: "",
    name: "",
    bio: "",
  });

  const handleAdd = () => {
    if (!user.name || !user.bio) {
      alert("AddUser: Please fill out all fields.");
      return;
    }

    if (users.find((u) => u.id === user.id)) {
      alert(`AddUser: User with the id of ${user.id} already exists.`);
      return;
    }

    dispatch({
      type: ActionTypes.ADD_USER,
      payload: user,
    });

    next_id++;

    setUser({ id: `user#${next_id + 1}`, name: "", bio: "" });
  };

  if (next_id === 0) {
    next_id = users.length;
  }

  if (!user.id) {
    setUser({ id: `user#${next_id + 1}`, name: "", bio: "" });
  }

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
