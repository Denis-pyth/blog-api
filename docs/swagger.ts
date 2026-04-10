import swaggerJsdoc from "swagger-jsdoc";


const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Blog Platform API",
            version: "1.0.0",
            description: "A modern blogging platform API built with Node.js, TypeScript, Prisma and Redis",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Development server",
            },
        ],
        components: {
            securitySchemes: {                
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        id: { type: "string", example: "cmnrzo8ph0000w8vhlkp0y0cl" },
                        email: { type: "string", example: "user@example.com" },
                        username: { type: "string", example: "johndoe" },
                        bio: { type: "string", nullable: true },
                        avatar: { type: "string", nullable: true },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                    },
                },
                Post: {
                    type: "object",
                    properties: {
                        id: { type: "string", example: "cmnsdzeu30000u0vhy84ybbbx" },
                        title: { type: "string", example: "My First Post" },
                        content: { type: "string", example: "This is my first post" },
                        slug: { type: "string", example: "my-first-post-1775794141388" },
                        published: { type: "boolean", example: false },
                        deletedAt: { type: "string", nullable: true },
                        authorId: { type: "string", example: "cmnrzo8ph0000w8vhlkp0y0cl" },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                    },
                },
                Comment: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        content: { type: "string", example: "Great post" },
                        authorId: { type: "string" },
                        postId: { type: "string" },
                        parentId: { type: "string", nullable: true },
                        createdAt: { type: "string", format: "date-time" },
                    },
                },
                Error: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: false },
                        message: { type: "string", example: "An error occurred" },
                    },
                },
                ValidationError: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: false },
                        message: { type: "string", example: "Validation failed" },
                        errors: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    field: { type: "string", example: "email" },
                                    message: { type: "string", example: "Invalid email address" },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
     
    apis: ["./routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);