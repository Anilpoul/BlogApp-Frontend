import { jwtDecode } from 'jwt-decode';

export function isTokenExpired(token) {
    try {
        const decoded = jwtDecode(token);
        const now = Math.floor(Date.now() / 1000);
        return decoded.exp < now;
    } catch (error) {
        console.error("Error decoding token:", error);
        return true;
    }
}

export function getUserIdFromToken(token) {
    try {
        const decoded = jwtDecode(token);
        return decoded.userId;
    } catch (error) {
        console.error("Invalid token while extracting userId:", error);
        return null;
    }
}

export function decodeToken(token) {
    try {
        const decoded = jwtDecode(token);
        return {
            id: decoded.userId,
            email: decoded.sub,
            role: decoded.role,
            username: decoded.username // Assuming the token contains username field
        };
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}

export function getUsernameFromToken(token) {
    const user = decodeToken(token);
    return user?.username; // Get username from decoded token
}

export function isAdmin(token) {
    const user = decodeToken(token);
    return user?.role === "ROLE_ADMIN";
}

export function hasRole(token, role) {
    const user = decodeToken(token);
    return user?.role === role;
}

export function hasAnyRole(token, roles) {
    const user = decodeToken(token);
    return roles.includes(user?.role);
}

export function autoLogoutIfExpired(token) {
    if (isTokenExpired(token)) {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }
}
