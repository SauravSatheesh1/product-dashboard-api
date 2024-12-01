import { Request, Response } from "express";
import { CsvUploadService } from "../../application/services/CsvUploadService";

export class CsvUploadController {
  constructor(private csvUploadService: CsvUploadService) {}

  async uploadCsv(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({ message: "No file uploaded" });
        return;
      }

      const insertedCount = await this.csvUploadService.processUpload(
        req.file.buffer
      );

      res
        .status(200)
        .json({ message: "CSV processed successfully", insertedCount });
    } catch (error) {
      console.error("Error processing CSV:", error);
      res.status(500).json({ message: "Error processing CSV" });
    }
  }
}
