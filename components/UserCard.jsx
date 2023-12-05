export default function UserCard({ user, setUser }) {
  const handleChange = (event) => {
    setUser({ ...user, [event.target.id]: event.target.value });
  };

  return (
    <>
      {setUser ? (
        <>
          <p>
            ID:{" "}
            <input
              type="text"
              id="id"
              value={user.id}
              onChange={handleChange}
            />
          </p>
          <p>
            Name:{" "}
            <input
              type="text"
              id="name"
              value={user.name}
              onChange={handleChange}
            />
          </p>
          <p>
            Bio:{" "}
            <input
              type="text"
              id="bio"
              value={user.bio}
              onChange={handleChange}
            />
          </p>
        </>
      ) : (
        <>
          <p>ID: {user.id}</p>
          <p>Name: {user.name}</p>
          <p>Bio: {user.bio}</p>
        </>
      )}
    </>
  );
}
