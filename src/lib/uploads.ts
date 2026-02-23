import crypto from "crypto";
import fs from "fs/promises";
import path from "path";

const uploadDir = path.join(process.cwd(), "data", "uploads");
const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
const maxSize = 3 * 1024 * 1024;

type UploadFile = {
  fileName: string;
  filePath: string;
  mimeType: string;
  size: number;
};

export async function saveUploads(files: File[], leadId: string): Promise<UploadFile[]> {
  const saved: UploadFile[] = [];

  await fs.mkdir(uploadDir, { recursive: true });

  for (const file of files) {
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Invalid file type");
    }
    if (file.size > maxSize) {
      throw new Error("File too large");
    }

    const ext = path.extname(file.name) || ".jpg";
    const safeName = `${leadId}-${crypto.randomBytes(6).toString("hex")}${ext}`;
    const filePath = path.join(uploadDir, safeName);
    const buffer = Buffer.from(await file.arrayBuffer());

    await fs.writeFile(filePath, buffer);

    saved.push({
      fileName: file.name,
      filePath: filePath,
      mimeType: file.type,
      size: file.size,
    });
  }

  return saved;
}

