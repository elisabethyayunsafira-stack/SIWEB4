import { access, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { definePDFJSModule, getDocumentProxy, renderPageAsImage } from "unpdf";

const DEFAULT_SOURCE_PDF = String.raw`C:\Users\ADVAN WORKPLUS\Downloads\SIWEB.pdf`;
const RENDER_SCALE = 2;

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const outputDirectory = path.join(projectRoot, "public", "reference", "pages");
const manifestPath = path.join(outputDirectory, "manifest.json");

async function main() {
  const sourcePdfPath = path.resolve(process.env.SOURCE_PDF ?? DEFAULT_SOURCE_PDF);

  await ensureFileExists(sourcePdfPath);
  await definePDFJSModule(() => import("pdfjs-dist/legacy/build/pdf.mjs"));

  const buffer = new Uint8Array(await readFile(sourcePdfPath));
  const pdf = await getDocumentProxy(buffer);
  const totalPages = pdf.numPages;
  const pagePadding = Math.max(2, String(totalPages).length);
  const manifest = [];

  await rm(outputDirectory, { recursive: true, force: true });
  await mkdir(outputDirectory, { recursive: true });

  try {
    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale: RENDER_SCALE });
      const fileName = `page-${String(pageNumber).padStart(pagePadding, "0")}.png`;
      const outputPath = path.join(outputDirectory, fileName);

      const imageBuffer = await renderPageAsImage(pdf, pageNumber, {
        canvasImport: () => import("@napi-rs/canvas"),
        scale: RENDER_SCALE,
      });

      await writeFile(outputPath, Buffer.from(imageBuffer));

      manifest.push({
        page: pageNumber,
        fileName,
        width: Math.round(viewport.width),
        height: Math.round(viewport.height),
      });

      page.cleanup();
      console.log(
        `[${pageNumber}/${totalPages}] Saved ${fileName} (${Math.round(viewport.width)}x${Math.round(viewport.height)})`,
      );
    }
  } finally {
    await pdf.destroy();
  }

  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

  console.log(`Done. Output written to ${outputDirectory}`);
}

async function ensureFileExists(filePath) {
  try {
    await access(filePath);
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      throw new Error(`PDF source not found at ${filePath}. Set SOURCE_PDF to a valid file path.`);
    }

    throw error;
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Failed to extract PDF pages: ${message}`);
  process.exitCode = 1;
});
