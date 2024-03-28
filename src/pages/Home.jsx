import { useState, useEffect, useContext } from "react";
import logo from "../logo.svg";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import { AuthContext } from "../AuthContext";

const Home = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { loggedInUser } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    fetch("https://iiir5hz5o6.execute-api.us-east-1.amazonaws.com/get-comments")
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const addComment = (comment) => {
    setComments([comment, ...comments]);
  };

  return (
    <div className="container mx-auto bg-gray-900 text-white min-h-screen flex flex-col">
      <header className="flex flex-col items-center justify-center py-8">
        <img
          src={logo}
          className={`App-logo ${loading ? "Spin" : ""}`}
          alt="logo"
        />
        <h1 className="text-3xl">Welcome to FeedComm</h1>
      </header>

      <div className="flex-1 flex flex-col md:flex-row">
        <div className="md:w-1/3 px-4">
          <h6 className="text-lg">Say something here</h6>
          <CommentForm addComment={addComment} username={loggedInUser} />
        </div>
        <div className="md:w-2/3 bg-gray-900 overflow-y-auto">
          <CommentList loading={loading} comments={comments} />
        </div>
      </div>
    </div>
  );
};

export default Home;
