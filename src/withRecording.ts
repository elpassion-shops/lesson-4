import * as fs from "fs";
import nock from "nock";
import { saveRecording } from "./saveRecording";
import path from "path";

export const withRecording = async (
  dirname: string,
  name: string,
  cb: () => Promise<void>
) => {
  const recordingPath = path.join(dirname, "__tapes__", `${name}.json`);
  const recordingExists = await exists(recordingPath);

  if (recordingExists) {
    nock.disableNetConnect();
    nock.load(recordingPath);
  } else {
    nock.enableNetConnect();
    nock.recorder.rec({ dont_print: true, output_objects: true });
  }
  await cb();
  if (recordingExists) {
    nock.enableNetConnect();
  } else {
    await saveRecording(dirname, name);
  }
};

const exists = (recordingPath: string) => {
  return new Promise((resolve) => {
    fs.exists(recordingPath, (exists) => {
      resolve(exists);
    });
  });
};
