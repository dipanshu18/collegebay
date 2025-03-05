import "dotenv/config";
import { S3Client } from "@aws-sdk/client-s3";

export const client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET!,
  },
  region: process.env.AWS_REGION!,
});
