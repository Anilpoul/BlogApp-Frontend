import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, updatePost } from "../services/api";
import { Container, Form, Button, Spinner } from "react-bootstrap";

const EditPost = () => {
    const { id } = useParams(); // postId from URL
    const navigate = useNavigate();

    const [post, setPost] = useState({
        postTitle: "",
        content: "",
        imageName: ""
    });

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPostById(id);
                setPost({
                    postTitle: data.postTitle,
                    content: data.content,
                    imageName: data.imageName || ""
                });
            } catch (error) {
                console.error("Error fetching post:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            await updatePost(id, post);
            navigate(`/posts/${id}`); // redirect to post details
        } catch (err) {
            console.error("Error updating post:", err);
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <Container className="mt-4 text-center">
                <Spinner animation="border" />
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <h2>Edit Post</h2>
            <Form onSubmit={handleUpdate}>
                <Form.Group className="mb-3" controlId="postTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter post title"
                        name="postTitle"
                        value={post.postTitle}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="content">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={6}
                        placeholder="Enter content"
                        name="content"
                        value={post.content}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={updating}>
                    {updating ? "Updating..." : "Update Post"}
                </Button>
            </Form>
        </Container>
    );
};

export default EditPost;
