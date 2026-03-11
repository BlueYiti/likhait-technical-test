import React, { useState, useEffect } from "react";
import { Category } from "../types"; 
import { Button, Modal } from "../vibes";
import { COLORS } from "../constants/colors";
import { getCategoryEmoji } from "../utils/categoryUtils";

interface CategoryCardProps {
  category: Category;
  onDelete: (id: number) => void;
  onUpdate: (category: Category) => Promise<void>; // <- expects async function
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onDelete,
  onUpdate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedName, setEditedName] = useState(category.name);
  const [editedEmoji, setEditedEmoji] = useState(getCategoryEmoji(category.name, category.emoji));
  const [isDirty, setIsDirty] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false); // new state

  // Enable update button only if changes exist
  useEffect(() => {
    setIsDirty(
      editedName !== category.name || editedEmoji !== (category.emoji || "")
    );
  }, [editedName, editedEmoji, category]);

  const handleUpdate = async () => {
    setIsUpdating(true); // start updating
    try {
      await onUpdate({ ...category, name: editedName, emoji: editedEmoji });
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to update category", err);
      alert("Failed to update category");
    } finally {
      setIsUpdating(false); // done updating
    }
  };

  const cardStyle: React.CSSProperties = {
    padding: "24px",
    borderRadius: "16px",
    background: COLORS.background.card,
    border: `1px solid ${COLORS.border}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "140px",
    transition: "all 0.2s ease",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  };

  const emojiStyle: React.CSSProperties = {
    fontSize: "48px",
    marginBottom: "12px",
  };

  const categoryNameStyle: React.CSSProperties = {
    fontWeight: 600,
    fontSize: "18px",
    color: COLORS.text.primary,
    textAlign: "center",
    marginBottom: "16px",
  };

  return (
    <>
      {/* Category Card */}
      <div
        style={cardStyle}
        onClick={() => setIsModalOpen(true)}
        onMouseEnter={(e) =>
          (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)")
        }
      >
        <div style={emojiStyle}>{getCategoryEmoji(category.name, category.emoji)}</div>
        <div style={categoryNameStyle}>{category.name}</div>
      </div>

      {/* Modal for editing */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Category"
      >
        <div style={{ textAlign: "center", padding: "24px" }}>
          <input
            type="text"
            value={editedEmoji}
            onChange={(e) => setEditedEmoji(e.target.value)}
            placeholder="Emoji"
            style={{
              fontSize: "48px",
              textAlign: "center",
              marginBottom: "16px",
              width: "100%",
            }}
            disabled={isUpdating} // disable while updating
          />
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            placeholder="Category Name"
            style={{
              fontWeight: 600,
              fontSize: "24px",
              textAlign: "center",
              marginBottom: "32px",
              width: "100%",
            }}
            disabled={isUpdating} // disable while updating
          />

          <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
            <Button
              variant="primary"
              disabled={!isDirty || isUpdating}
              onClick={handleUpdate}
            >
              {isUpdating ? "Updating..." : "Update"} {/* show updating text */}
            </Button>
            <Button
              variant="danger"
              disabled={isUpdating}
              onClick={() => {
                onDelete(category.id);
                setIsModalOpen(false);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};