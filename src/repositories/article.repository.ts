import prisma from "../config/prisma.js";
import { ArticleInput, FilterArticle } from "../types/article.js";

const getAllArticleRepository = async (filter: FilterArticle) => {
  const where: any = {};

  if (filter.title) {
    where.title = {
      contains: filter.title,
    };
  }

  const page = Number(filter.page) || 1;

  const take = filter.limit ? Number(filter.limit) : undefined;
  const skip = take ? (page - 1) * take : undefined;

  const articles = await prisma.artikel.findMany({
    select: {
      id: true,
      title: true,
      theme: true,
      eventDate: true,
      imageUrl: true,
      description: true,
      createdAt: true,
      updatedAt: true,
    },
    where,
    skip,
    take,
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalItems = await prisma.artikel.count({
    where,
  });

  return {
    articles,
    totalItems,
  };
};

const getArticleByIdRepository = async (id: number) => {
  const article = await prisma.artikel.findUnique({
    where: {
      id: id,
    },
  });

  return article;
};

const createArticleRepository = async (articleData: ArticleInput) => {
  const newArticle = await prisma.artikel.create({
    data: {
      title: articleData.title,
      theme: articleData.theme,
      eventDate: articleData.eventDate,
      imageUrl: articleData.imageUrl,
      description: articleData.description,
    },
  });
  return newArticle;
};

const updateArticleRepository = async (
  id: number,
  articleData: ArticleInput,
) => {
  const updatedArticle = await prisma.artikel.update({
    where: {
      id: id,
    },
    data: {
      title: articleData.title,
      theme: articleData.theme,
      eventDate: articleData.eventDate,
      imageUrl: articleData.imageUrl,
      description: articleData.description,
    },
  });
  return updatedArticle;
};

const deleteArticleRepository = async (id: number) => {
  const deletedArticle = await prisma.artikel.delete({
    where: {
      id: id,
    },
  });
  return deletedArticle;
};

export {
  getAllArticleRepository,
  getArticleByIdRepository,
  createArticleRepository,
  updateArticleRepository,
  deleteArticleRepository,
};
