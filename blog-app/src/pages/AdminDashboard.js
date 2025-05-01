import React, { useState, useEffect } from "react";
import { Card, Button, ListGroup, Spinner, Alert } from "react-bootstrap";

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Simulate fetching data with dummy stats
    useEffect(() => {
        // Simulating an API call with dummy data
        setTimeout(() => {
            setStats({
                posts: 150, // Dummy number of posts
                users: 50,  // Dummy number of users
            });
            setLoading(false);
        }, 1000); // Simulate 1 second loading time
    }, []);

    if (loading) {
        return (
            <div className="text-center">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <div>
            <Card>
                <Card.Body>
                    <Card.Title>Admin Dashboard</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Posts: {stats?.posts || 0}</ListGroup.Item>
                        <ListGroup.Item>Users: {stats?.users || 0}</ListGroup.Item>
                    </ListGroup>
                    <Button variant="primary" className="mt-3">
                        Manage Categories
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AdminDashboard;
