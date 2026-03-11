import React, { useState } from "react";
import { Button } from "../vibes";

interface Props {
  onSubmit: (name: string, emoji: string) => Promise<void>;
  onCancel: () => void;
}

export const CategoryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("📦");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      setLoading(true);
      await onSubmit(name, emoji);
      setName("");
      setEmoji("📦");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <input
        type="text"
        placeholder="Emoji (🍔 🚗 💡)"
        value={emoji}
        onChange={(e) => setEmoji(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button variant="primary" type="submit" disabled={loading}>
          Add Category
        </Button>
      </div>
    </form>
  );
};