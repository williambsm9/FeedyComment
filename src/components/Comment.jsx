export default function Comment({ comment }) {
  return (
    <div className="media mb-3">
      <div className="media-body p-2 shadow-sm rounded bg-gray-900 border">
        <small className="float-right text-gray-500">{comment.date}</small>
        <h6 className="mt-0 mb-1 text-gray-500">{comment.username}</h6>
        {comment.comment}
      </div>
    </div>
  );
}
