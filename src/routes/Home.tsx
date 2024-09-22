// components
import Search from "../components/Search";

// hooks
import { useState } from "react";

// types
import { UserProps } from "../types/user";

const Home = () => {
  const [user, setUser] = useState<UserProps | null>(null);

  const loadUser = async (userName: string) => {
    const res = await fetch(`https://api.github.com/users/${userName}`);

    const data = await res.json();

    if (data) {
      setUser({
        avatar_url: data.avatar_url,
        login: data.login,
        location: data.location,
        followers: data.followers,
        following: data.following,
      });
    }

    console.log(user);
  };

  return (
    <div>
      <Search loadUser={loadUser} />
    </div>
  );
};

export default Home;
