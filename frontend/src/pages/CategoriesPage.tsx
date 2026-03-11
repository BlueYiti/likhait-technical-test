import React, { useState, useEffect } from "react";
import { Category } from "../types";
import { fetchCategories, updateCategory, createCategory, deleteCategory } from "../services/api";
import { Modal, Button } from "../vibes";
import { CategoryForm } from "../components/CategoryForm";
import { CategoryGrid } from "../components/CategoryGrid";
import { COLORS } from "../constants/colors";

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (name: string, emoji: string) => {
    await createCategory(name, emoji);
    setIsModalOpen(false);
    loadCategories();
  };

  const handleUpdateCategory = async (updatedCategory: Category) => {
    try {
      // Call the API to update category on the backend
      await updateCategory(updatedCategory.id, updatedCategory.name, updatedCategory.emoji);

      // Update local state so UI updates immediately
      setCategories(prev =>
        prev.map(cat => (cat.id === updatedCategory.id ? updatedCategory : cat))
      );
    } catch (err) {
      console.error("Failed to update category", err);
      alert("Failed to update category");
    }
  };

  const handleDeleteCategory = async (id: number) => {
    await deleteCategory(id);
    loadCategories();
  };

  const pageStyle: React.CSSProperties = {
    padding: "48px 64px",
    minHeight: "100vh",
    background: COLORS.secondary.s01,
  };

  const headerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "40px",
    fontWeight: 700,
    margin: 0,
    color: COLORS.secondary.s10,
  };

  const emptyStyle: React.CSSProperties = {
    padding: "80px 0",
    textAlign: "center",
    fontSize: "18px",
    color: COLORS.secondary.s08,
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Categories</h1>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          Add Category
        </Button>
      </div>

      {loading ? (
        <div style={emptyStyle}>Loading...</div>
      ) : categories.length === 0 ? (
        <div style={emptyStyle}>
          No categories yet. Click "Add Category" to get started!
        </div>
      ) : (
        <CategoryGrid
          categories={categories}
          onDelete={handleDeleteCategory}
          onUpdate={handleUpdateCategory} // <-- pass this down
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Category"
      >
        <CategoryForm
          onSubmit={handleAddCategory}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default CategoriesPage;