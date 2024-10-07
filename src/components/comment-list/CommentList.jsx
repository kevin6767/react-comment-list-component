import React, { useEffect, useState } from "react"

export const CommentList = () => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")

  useEffect(() => {
    fetch("https://dummyjson.com/comments").then((response) =>
      response.json().then((data) => setComments(data.comments))
    )
  }, [])

  const onChangeComment = (event) => {
    setNewComment(event.target.value)
    console.log(newComment)
  }

  return (
    <div>
      <h1>Comments</h1>
      <textarea
        id="w3review"
        name="w3review"
        rows="4"
        cols="50"
        value={newComment}
        onChange={onChangeComment}
      />

      <button
        onClick={() => {
          setComments([
            { id: Date.now(), body: newComment, likes: 0 },
            ...comments,
          ])
          setNewComment("")
        }}
      >
        Add Comment
      </button>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.body}</p>
          <button
            onClick={() => {
              setComments(
                comments.map((c) =>
                  c.id === comment.id ? { ...c, likes: c.likes + 1 } : c
                )
              )
            }}
          >
            Amount of likes {comment.likes}
          </button>
        </div>
      ))}
    </div>
  )
}
