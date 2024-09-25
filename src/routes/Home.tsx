// components
import Search from "../components/Search";
import User from "../components/User";
import Error from "../components/Error";

// hooks
import { useState } from "react";

// types
import { UserProps } from "../types/user";

const Home = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [error, setError] = useState<boolean>(false);

  const loadUser = async (userName: string) => {
    setUser(null);
    setError(false);

    const res = await fetch(`https://api.github.com/users/${userName}`);

    if (res.status === 404) {
      setError(true);
      return;
    }

    const data = await res.json();

    const { avatar_url, login, location, followers, following } = data;

    const userData: UserProps = {
      avatar_url,
      login,
      location,
      followers,
      following,
    };

    setUser(userData);
  };

  return (
    <div>
      <Search loadUser={loadUser} />
      {user && <User {...user} />}
      {error && <Error />}
    </div>
  );
};

export default Home;
