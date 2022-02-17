import React, { useState } from "react";
import { Button } from "../components/button";
import { DownloadIcon } from "@heroicons/react/solid";
import ExcelService from "../services/excel.service";
import FileService from "../services/file.service";
import DateService from "../services/date.service";
import Helmet from "react-helmet";
export interface Props {}

/**
 * An IndexView React Component.
 * @author Jannik Will
 * @version 0.1
 */
export const IndexView: React.FC<Props> = () => {
  const [href, setHref] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <div className="flex place-items-center place-content-center w-screen h-screen">
      <Helmet>
        <title>Worksheet Helper</title>
      </Helmet>
      <Button
        className="max-w-md"
        onClick={async () => {
          const excelService = new ExcelService();

          const buffer = await excelService.createWorksheetForCurrentMonth();

          const blob = new Blob([new Uint8Array(buffer)]);

          const dataUri = await FileService.blobToDataURL(blob);

          const year = DateService.getCurrentYear();
          const month = DateService.getCurrentMonthName();

          setHref(dataUri);
          setFileName(`worksheet-${month}-${year}.xlsx`);

          document.getElementById("download")?.click();
        }}
        icon={<DownloadIcon className="mr-2" height={"1.25rem"} />}
      >
        Workbook herunterladen
      </Button>
      {href && fileName && (
        <a
          className="hidden"
          id="download"
          href={href}
          download={fileName}
          aria-hidden
        >
          ...
        </a>
      )}
    </div>
  );
};
