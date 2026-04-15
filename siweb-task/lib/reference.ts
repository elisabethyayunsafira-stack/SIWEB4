import { readFile } from "node:fs/promises";
import path from "node:path";

export type PageMeta = {
  page: number;
  fileName: string;
  width: number;
  height: number;
};

const manifestPath = path.join(
  process.cwd(),
  "public",
  "reference",
  "pages",
  "manifest.json",
);

export async function getReferencePages(): Promise<PageMeta[]> {
  try {
    const raw = await readFile(manifestPath, "utf8");
    const data: unknown = JSON.parse(raw);

    if (!Array.isArray(data)) {
      return [];
    }

    return data.filter(isPageMeta).sort((left, right) => left.page - right.page);
  } catch (error) {
    if (isMissingFileError(error)) {
      return [];
    }

    throw error;
  }
}

function isPageMeta(value: unknown): value is PageMeta {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.page === "number" &&
    typeof candidate.fileName === "string" &&
    typeof candidate.width === "number" &&
    typeof candidate.height === "number"
  );
}

function isMissingFileError(error: unknown): error is NodeJS.ErrnoException {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "ENOENT"
  );
}
