import { useReducer, useContext, createContext } from "react";

const UsersContext = createContext();
const UsersDispatchContext = createContext();


export function UsersProvider({ children }) {
  const [users, dispatch] = useReducer(usersReducer, [], () => ([{ id: "user#5", name: "Pikachu", bio: "Hello World!" }]));

  return (
    <UsersContext.Provider value={users}>
      <UsersDispatchContext.Provider value={dispatch}>
        {children}
      </UsersDispatchContext.Provider>
    </UsersContext.Provider>
  );
}

export function useUsers() 
{
    const context = useContext(UsersContext);
    if (context === undefined) {
        throw new Error("useUsers must be used within a UsersProvider");
    }
    return context;
}

export function useUsersDispatch()
{
    const context = useContext(UsersDispatchContext);
    if (context === undefined) {
        throw new Error("useUsersDispatch must be used within a UsersProvider");
    }
    return context;
}

function usersReducer(users, action) {
  switch (action.type) {
    case "ADD_USER":
    {
        const { id, name, bio } = action.payload;

        if(users.find(user => user.id === id))
        {
            return users;
        }

        return [...users, { id, name, bio }];
    }
    case "EDIT_USER":
    {
        const { id, user_data } = action.payload;
        return users.map(user => user.id === id ? user_data : user);
    }
    case "DELETE_USER":
    {
        const { id } = action.payload;
        return users.filter(user => user.id !== id);
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}