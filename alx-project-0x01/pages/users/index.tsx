import UserCard from "@/components/common/UserCard";
import Header from "@/components/layout/Header";
import { UserPageProps, UserProps, UserData } from "@/interfaces";
import { useState } from "react";
import UserModal from "@/components/common/UserModal";

const Users = ({ posts }: UserPageProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [post, setPost] = useState<UserData | null>(null);

  const handleAddPost = (newPost: UserData) => {
    setPost({ ...newPost, id: posts.length + 1 });
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="p-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">Post Content</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-700 px-4 py-2 rounded-full text-white"
          >
            Add User
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {posts.map((user: UserProps, index: number) => (
            <UserCard key={user.id} {...user} />
          ))}
        </div>
      </main>

      {isModalOpen && (
        <UserModal onClose={() => setModalOpen(false)} onSubmit={handleAddPost} />
      )}
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const posts = await response.json();

  return {
    props: {
      posts,
    },
  };
}

export default Users;
