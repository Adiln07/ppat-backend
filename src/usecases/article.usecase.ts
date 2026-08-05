import {
  getAllArticleRepository,
  getArticleByIdRepository,
  createArticleRepository,
  updateArticleRepository,
  deleteArticleRepository,
} from "../repositories/article.repository.js";
import { ArticleInput, FilterArticle } from "../types/article.js";
import fs from "fs/promises";
import path from "path";
import { Pagination } from "../types/pagination.js";

const getAllArticleUseCase = async (filter: FilterArticle) => {
  if (filter.title) {
    if (!filter.title.trim()) {
      throw new Error("Invalid Searching By Title");
    }
  }

  if (filter.page) {
    const page = Number(filter.page);

    if (isNaN(page)) {
      throw new Error("Page must be a number");
    }

    if (page <= 0) {
      throw new Error("Invalid Page");
    }
  }

  if (filter.limit) {
    const limit = Number(filter.limit);

    if (isNaN(limit)) {
      throw new Error("Limit must be a number");
    }

    if (limit <= 0) {
      throw new Error("Invalid Limit");
    }
  }

  const { articles, totalItems } = await getAllArticleRepository(filter);

  const page = Number(filter.page) || 1;
  const limit = Number(filter.limit) || 10;

  const totalPages = Math.ceil(totalItems / limit);

  const pagination: Pagination = {
    page,
    limit,
    totalItems,
    totalPages,
  };

  return {
    articles,
    pagination,
  };
};

const getArticleByIdUseCase = async (id: number) => {
  if (id <= 0) {
    throw new Error("Invalid Article ID");
  }

  const article = await getArticleByIdRepository(id);

  if (!article) {
    throw new Error("Article not found");
  }
  return article;
};

const createArticleUseCase = async (articleData: ArticleInput) => {
  if (
    !articleData.title ||
    !articleData.description ||
    !articleData.eventDate ||
    !articleData.theme ||
    !articleData.imageUrl
  ) {
    throw new Error("All fields are required");
  }

  const title = articleData.title.trim();
  if (title === "") {
    throw new Error("Article title cannot be empty ");
  }
  const description = articleData.description.trim();
  if (description === "") {
    throw new Error("Article description cannot be empty");
  }

  const eventDate = new Date(articleData.eventDate);
  if (isNaN(eventDate.getTime())) {
    throw new Error("Invalid Date!!!");
  }

  const theme = articleData.theme.trim();
  if (theme === "") {
    throw new Error("Article theme cannot be empty");
  }

  const imageUrl = articleData.imageUrl.trim();

  if (imageUrl === "") {
    throw new Error("Article imageUrl cannot be empty");
  }

  const newData = {
    title,
    description,
    eventDate,
    theme,
    imageUrl,
  };

  const newArticle = await createArticleRepository(newData);
  return newArticle;
};

const updateArticleUseCase = async (id: number, articleData: ArticleInput) => {
  if (id <= 0) {
    throw new Error("Invalid Article ID");
  }

  if (
    !articleData.title ||
    !articleData.description ||
    !articleData.eventDate ||
    !articleData.theme ||
    !articleData.imageUrl
  ) {
    throw new Error("All fields are required");
  }

  const title = articleData.title.trim();
  if (title === "") {
    throw new Error("Article title cannot be empty ");
  }
  const description = articleData.description.trim();
  if (description === "") {
    throw new Error("Article description cannot be empty");
  }

  const eventDate = new Date(articleData.eventDate);
  if (isNaN(eventDate.getTime())) {
    throw new Error("Invalid Date!!!");
  }

  const theme = articleData.theme.trim();
  if (theme === "") {
    throw new Error("Article theme cannot be empty");
  }

  const imageUrl = articleData.imageUrl.trim();

  if (imageUrl === "") {
    throw new Error("Article imageUrl cannot be empty");
  }

  const existingArticle = await getArticleByIdRepository(id);
  if (!existingArticle) {
    throw new Error("Article Id not found");
  }

  const updateData = {
    title,
    description,
    eventDate,
    theme,
    imageUrl,
  };

  const updateArticle = await updateArticleRepository(id, updateData);

  // Hapus gambar lama jika gambar berubah
  const oldImage = existingArticle.imageUrl;
  const newImage = updateData.imageUrl;

  if (oldImage && oldImage !== newImage) {
    const oldImagePath = path.join(process.cwd(), oldImage.replace(/^\/+/, ""));

    try {
      await fs.unlink(oldImagePath);
    } catch (error) {
      console.error(`Failed to delete image: ${oldImagePath}`, error);
    }
  }

  return updateArticle;
};

const deletedArticleUseCase = async (id: number) => {
  if (id <= 0) {
    throw new Error("Invalid Article ID");
  }

  const existingArticle = await getArticleByIdRepository(id);
  if (!existingArticle) {
    throw new Error("Article Id not found");
  }

  const deletedArticle = await deleteArticleRepository(id);

  const imageUrl = existingArticle.imageUrl;

  if (imageUrl) {
    const imagePath = path.join(process.cwd(), imageUrl.replace(/^\/+/, ""));

    try {
      await fs.unlink(imagePath);
    } catch (error) {
      console.error(`Failed to delete image: ${imagePath}`, error);
    }
  }
  return deletedArticle;
};

export {
  getAllArticleUseCase,
  getArticleByIdUseCase,
  createArticleUseCase,
  updateArticleUseCase,
  deletedArticleUseCase,
};
