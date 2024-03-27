import { useState } from "react";

export default function CommentForm({ addComment, username }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [comment, setComment] = useState({
    comment: "",
    username: username,
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
      const response = await fetch(
        "https://iiir5hz5o6.execute-api.us-east-1.amazonaws.com/create-comment",
        {
          method: "POST",
          body: JSON.stringify(comment),
        }
      );
      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        const updatedComment = { ...comment, date: data.record.date };
        addComment(updatedComment);
        setComment((prevState) => ({
          ...prevState,
          comment: "",
        }));
      }
    } catch (error) {
      setError("Something went wrong while submitting form.");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return comment.comment.trim() !== "";
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
            value={comment.comment}
            className="w-full px-4 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Comment"
            name="comment"
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
