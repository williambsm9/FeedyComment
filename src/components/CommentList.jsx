import Comment from "./Comment";

export default function CommentList(props) {
  return (
    <div className="commentList bg-gray-900 text-gray-200 p-4 rounded-md">
      <h5 className="text-gray-500 mb-4">
        <span className="bg-green-500 px-2 py-1 rounded-md">
          {props.comments.length}
        </span>{" "}
        Comment{props.comments.length !== 1 ? "s" : ""}
      </h5>

      {props.comments.length === 0 && !props.loading && (
        <div className="alert text-center bg-blue-500 text-white rounded-md p-2">
          Be the first to comment
        </div>
      )}

      {props.comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
    </div>
  );
}
