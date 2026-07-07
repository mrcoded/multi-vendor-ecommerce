import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "@/app/api/uploadthing/core";

const uploadthingRouterConfig = extractRouterConfig(ourFileRouter);

export default function UploadThingSSRPlugin() {
  return <NextSSRPlugin routerConfig={uploadthingRouterConfig} />;
}
