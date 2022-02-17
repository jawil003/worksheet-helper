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
    <div className="flex flex-col w-screen h-screen place-items-center place-content-center">
      <Helmet>
        <title>Worksheet Helper</title>
      </Helmet>
      <div className="bg-white px-16 py-14 shadow-md rounded-md">
        <div className="flex flex-col mx-auto">
          <h1 className="text-4xl font-semibold ">Worksheet Helper</h1>
          <p className="w-0 min-w-full">
            Erstelle deinen Stundenzettel schnell und unkompliziert
          </p>
        </div>
        <div className="mt-10">
          <Button
            className="max-w-md"
            onClick={async () => {
              const excelService = new ExcelService();

              const buffer =
                await excelService.createWorksheetForCurrentMonth();

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
            Stundenzettel herunterladen
          </Button>
          <p className="text-xs w-0 min-w-full m-2 relative">
            <span className="absolute top-0 left-m0.5">*</span>Beim klicken
            dieses Knopfes erhälst du einen vorgefertigten Stundenzettel für den
            aktuellen Monat
          </p>
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
      </div>
    </div>
  );
};
