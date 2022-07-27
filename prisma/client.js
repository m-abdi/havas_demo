"use strict";
exports.__esModule = true;
var client_1 = require("@prisma/client");
var prisma = global.prisma ||
    (typeof window === 'undefined' &&
        new client_1.PrismaClient());
if (process.env.NODE_ENV === 'development')
    global.prisma = prisma;
exports["default"] = prisma;
