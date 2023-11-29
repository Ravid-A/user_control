import { useState } from "react";

import { useUsers, useUsersDispatch } from "../utils/UserReducerContext";

import UserCard from "./UserCard";

export default function UsersList () {
    const [editing, setEditing] = useState(null);
    const [user_data, setUserData] = useState({ id: "", name: "", bio: "" });

    const users = useUsers();
    const dispatch = useUsersDispatch();

    const handleEdit = (user) => {
        if(!user) return;
        setUserData(user);
        setEditing(user.id);
    }

    const handleCancel = () => {
        setUserData({ id: "", name: "", bio: "" });
        setEditing(null);
    }

    const handleDelete = (id) => {
        if(!id) return;
        dispatch({ type: "DELETE_USER", payload: {id: id} });
    }

    const handleSave = (id, user) => {
        if(!id) return;

        if(!user_data.id || !user_data.name || !user_data.bio)
        {
            alert("EditUser: Please fill out all fields.");
            return;
        }

        dispatch({ type: "EDIT_USER", payload: { id, user_data: user_data } });
        setEditing(null);
    }

    return (
        <>
            <div className="users_list">
                <h2>Existing Users</h2>
                {users.map((user) => (
                    <div key={user.id} className="user_card">
                        {editing === user.id ? (
                            <>
                                <UserCard user={user_data} setUser={setUserData} />
                                <button onClick={() => {handleCancel()}}>Cancel</button>
                                <button onClick={() => {handleSave(user.id, user)}}>Save</button>
                            </>
                        ) : (
                            <>
                                <UserCard user={user} />
                                <button onClick={() => {handleEdit(user)}}>Edit</button>
                                <button onClick={() => {handleDelete(user.id)}}>Delete</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}