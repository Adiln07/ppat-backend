import {
  getAllArticleUseCase,
  getArticleByIdUseCase,
  createArticleUseCase,
  updateArticleUseCase,
  deletedArticleUseCase,
} from "../usecases/article.usecase.js";
import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response.js";
import { ArticleInput, FilterArticle } from "../types/article.js";

const getAllArticleController = async (req: Request, res: Response) => {
  try {
    const filter: FilterArticle = {
      title: req.query.title ? String(req.query.title) : undefined,
      page: req.query.page ? Number(req.query.page) : undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
    };

    const { articles, pagination } = await getAllArticleUseCase(filter);

    successResponse(res, articles, "Articles fetched successfully", pagination);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch articles";

    errorResponse(res, errorMessage);
  }
};

const getArticleByIdController = async (req: Request, res: Response) => {
  try {
    const articleId = Number(req.params.id);
    const article = await getArticleByIdUseCase(articleId);
    successResponse(res, article, "Artcile By Id fetched successfully");
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch notary";
    errorResponse(res, errorMessage);
  }
};

const createArticleController = async (req: Request, res: Response) => {
  try {
    const { title, description, eventDate, theme, imageUrl }: ArticleInput =
      req.body;

    const newArticleData = { title, description, eventDate, theme, imageUrl };
    const newArticle = await createArticleUseCase(newArticleData);
    successResponse(res, newArticle, "create Article is Success");
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create article";
    errorResponse(res, errorMessage);
  }
};

const updateArticleController = async (req: Request, res: Response) => {
  try {
    const articleId = Number(req.params.id);
    const { title, description, eventDate, theme, imageUrl }: ArticleInput =
      req.body;

    const updateArticleData = {
      title,
      description,
      eventDate,
      theme,
      imageUrl,
    };
    const updateArticle = await updateArticleUseCase(
      articleId,
      updateArticleData,
    );

    successResponse(res, updateArticle, "Update Article is Success");
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to update article";
    errorResponse(res, errorMessage);
  }
};

const deleteArticleController = async (req: Request, res: Response) => {
  try {
    const articleId = Number(req.params.id);

    const deletedArticle = await deletedArticleUseCase(articleId);

    successResponse(res, deletedArticle, "Delter Article is Success");
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to delete article";
    errorResponse(res, errorMessage);
  }
};

export {
  getAllArticleController,
  getArticleByIdController,
  createArticleController,
  updateArticleController,
  deleteArticleController,
};
