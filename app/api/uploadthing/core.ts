import { stackServerApp } from "@/stack";
import { createUploadthing, type FileRouter } from "uploadthing/next";


const f = createUploadthing();


export const ourFileRouter = {
  postImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      // This code runs on your server before upload
      const user = await stackServerApp.getUser();

      if (!user) throw new Error("Unauthorized")

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.ufsUrl);

      return { fileUrl: file.ufsUrl};
      } catch (error) {
        console.error("Error in onUploadComplete:" + error)
        throw error
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
