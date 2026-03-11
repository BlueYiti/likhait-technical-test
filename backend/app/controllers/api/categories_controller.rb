class Api::CategoriesController < ApplicationController
  def index
    categories = Category.order(:name)
    render json: categories.as_json(only: [:id, :name, :emoji])
  end

  def create
    category = Category.new(category_params)
    if category.save
      render json: category, status: :created
    else
      render json: { errors: category.errors.full_messages }, status: :unprocessable_entity
    end
  end

    def update
    category = Category.find(params[:id])
    if category.update(category_params)
      render json: category
    else
      render json: { errors: category.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    category = Category.find(params[:id])
    category.destroy
    render json: { message: "Category deleted" }
  end

  private

  def category_params
    params.require(:category).permit(:name, :emoji)
  end
end
