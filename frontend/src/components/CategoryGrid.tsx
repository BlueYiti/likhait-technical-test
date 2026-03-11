import React from "react";
import { Category } from "../types";
import { CategoryCard } from "./CategoryCard";

interface CategoryGridProps {
  categories: Category[];
  onDelete: (id: number) => void;
  onUpdate: (category: Category) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  onDelete,
  onUpdate, // <-- receive it from parent
}) => {
  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "24px",
    marginTop: "32px",
  };

  return (
    <div style={gridStyle}>
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onDelete={onDelete}
          onUpdate={onUpdate} // <-- pass it down
        />
      ))}
    </div>
  );
};