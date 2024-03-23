import { useState } from "react";

export default function CommentForm({ addComment }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [comment, setComment] = useState({
    message: "",
  });

  const handleFieldChange = (event) => {
    const { value, name } = event.target;
    setComment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setError("Please enter your comment.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:7777", {
        method: "POST",
        body: JSON.stringify(comment),
      });
      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        const updatedComment = { ...comment, time: data.time };
        addComment(updatedComment);
        setComment((prevState) => ({
          ...prevState,
          message: "",
        }));
      }
    } catch (error) {
      setError("Something went wrong while submitting form.");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return comment.message.trim() !== "";
  };

  const renderError = () => {
    return error ? <div className="text-red-500">{error}</div> : null;
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <textarea
            onChange={handleFieldChange}
            value={comment.message}
            className="w-full px-4 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Comment"
            name="message"
            rows="5"
          />
        </div>

        {renderError()}

        <div className="mb-4">
          <button
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            type="submit"
          >
            {loading ? "Commenting..." : "Comment"} &#10148;
          </button>
        </div>
      </form>
    </>
  );
}
