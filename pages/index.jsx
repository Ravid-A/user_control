import { UsersProvider } from "../utils/UserReducerContext"

import AddUser from "../components/AddUser"
import UsersList from "../components/UsersList"

export default function App() 
{
    return (
        <div className="main">
            <h1>Users</h1>
            <UsersProvider>
                <AddUser />
                <UsersList />
            </UsersProvider>
        </div>
    )
}