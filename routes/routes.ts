import express, { Router } from "express";
import {
  getAllPosts,
  getPostById,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost
} from "../controllers/controller";

import { authenticate } from "../middleware/auth.middleware";
import { cacheMiddleware } from "../middleware/cache.middleware";
import { validate } from "../middleware/validate.middleware";
import { CreatePostSchema, UpdatePostSchema } from "../schemas/post.schema";
import commentRoutes from "./comment.routes";
import likeRoutes from "./like.routes";

const router: Router = express.Router();
//public routes

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all published posts (paginated)
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: string
 *         description: Cursor for pagination (last post id from previous page)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *         description: Number of posts per page
 *     responses:
 *       200:
 *         description: List of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     posts:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Post'
 *                     nextCursor:
 *                       type: string
 *                       nullable: true
 *                     hasMore:
 *                       type: boolean
 */
router.get("/", cacheMiddleware(60), getAllPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 */
router.get("/:id", getPostById);

/**
 * @swagger
 * /posts/slug/{slug}:
 *   get:
 *     summary: Get a post by slug
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         example: my-first-post-1775794141388
 *     responses:
 *       200:
 *         description: Post found
 *       404:
 *         description: Post not found
 */
router.get("/slug/:slug", getPostBySlug);

//protected routes

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 255
 *                 example: My Amazing Post
 *               content:
 *                 type: string
 *                 minLength: 10
 *                 example: This is the content of my post
 *               published:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       201:
 *         description: Post created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/",authenticate, validate(CreatePostSchema), createPost);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               published:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Post updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */
router.put("/:id",authenticate, validate(UpdatePostSchema), updatePost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Soft delete a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Post deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */
router.delete("/:id",authenticate, deletePost);

//nested routes
router.use("/:postId/comments", commentRoutes);
router.use("/:postId/likes", likeRoutes);

export default router;
