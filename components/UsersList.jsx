import { useState } from "react";

import {
  useUsers,
  useUsersDispatch,
  ActionTypes,
} from "../utils/UserReducerContext";

import UserCard from "./UserCard";

export default function UsersList() {
  const [editing, setEditing] = useState(null);
  const [user_data, setUserData] = useState({ id: "", name: "", bio: "" });

  const users = useUsers();
  const dispatch = useUsersDispatch();

  const handleEdit = (user) => {
    if (!user) return;
    setUserData(user);
    setEditing(user.id);
  };

  const handleCancel = () => {
    setUserData({ id: "", name: "", bio: "" });
    setEditing(null);
  };

  const handleDelete = (id) => {
    if (!id) return;
    dispatch({
      type: ActionTypes.DELETE_USER,
      payload: { id: id },
    });
  };

  const handleSave = (user) => {
    if (!user_data.name) {
      user_data.name = user.name;
    }

    if (!user_data.bio) {
      user_data.bio = user.bio;
    }

    dispatch({
      type: ActionTypes.EDIT_USER,
      payload: { id: user.id, user_data: user_data },
    });
    setEditing(null);
  };

  return (
    <>
      <div className="users_list">
        <h2>Existing Users</h2>
        {users.map((user) => (
          <div key={user.id} className="user_card">
            {editing === user.id ? (
              <>
                <UserCard user={user_data} setUser={setUserData} />
                <button onClick={handleCancel}>Cancel</button>
                <button
                  onClick={() => {
                    handleSave(user);
                  }}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <UserCard user={user} />
                <button
                  onClick={() => {
                    handleEdit(user);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    handleDelete(user.id);
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
