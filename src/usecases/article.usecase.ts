import {
  getAllArticleRepository,
  getArticleByIdRepository,
  createArticleRepository,
  updateArticleRepository,
  deleteArticleRepository,
} from "../repositories/article.repository.js";
import { ArticleInput } from "../types/article.js";

const getAllArticleUseCase = async () => {
  const articles = await getAllArticleRepository();
  return articles;
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
  return deletedArticle;
};

export {
  getAllArticleUseCase,
  getArticleByIdUseCase,
  createArticleUseCase,
  updateArticleUseCase,
  deletedArticleUseCase,
};
