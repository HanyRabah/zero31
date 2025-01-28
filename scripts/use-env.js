import { readFileSync, writeFileSync } from "fs";

const env = process.argv[2] || "dev";

const schema = readFileSync(`prisma/schema.${env}.prisma`, "utf-8");
writeFileSync("prisma/schema.prisma", schema);
