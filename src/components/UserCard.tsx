
import React, { useState } from 'react'

type UserCardProps = {
    name: string;
    age: number;
    isActive: boolean;
};

function UserCard({ name, age, isActive }: UserCardProps) {
    const [userName, setUserName] = useState<string>(name);
    const [error, setError] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setUserName(value);

        if (value.trim() === "") {
            setError("الاسم مطلوب");
        } else if (!/^[a-zA-Z\u0600-\u06FF\s]+$/.test(value)) {
            setError("الاسم يجب أن يحتوي على أحرف فقط");
        } else {
            setError("");
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter your name"
                value={userName}
                onChange={handleChange}
            />

            {error && (
                <p className="text-red-500">{error}</p>
            )}

            <h2>{userName}</h2>
            <p>Age: {age}</p>
            <p>{isActive ? "Active" : "Inactive"}</p>
        </div>
    );
}

export default UserCard;