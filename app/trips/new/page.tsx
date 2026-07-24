"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createTrip } from "@/lib/actions/create-trip";
import { UploadButton } from "@/lib/upload-thing";
import Image from "next/image";
import { useState, useTransition } from "react";

const NewTrip = () => {
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  return (
    <section className="pt-16 md:pt-20 min-h-[calc(100dvh-5.2rem)] relative">
      <Image
        src={"/newtrip.webp"}
        fill
        priority
        className="object-cover object-center"
        alt="Hero Image"
      />
      <div className="max-w-lg mx-auto  relative z-20">
        <Card className="shadow-md p-6 bg-transparent backdrop-blur-3xl">
          <CardHeader className="font-bold text-2xl text-white text-center mb-4">
            {" "}
            New Trip
          </CardHeader>
          <CardContent>
            <form
              className="space-y-6"
              action={(formData: FormData) => {
                if (imageUrl) {
                  formData.append("imageUrl", imageUrl);
                }
                startTransition(() => {
                  createTrip(formData);
                });
              }}
            >
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  {" "}
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Japan trip..."
                  className={
                    "w-full border-2 text-white placeholder:text-gray-300 border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Trip description..."
                  className={
                    "w-full border-2 text-white border-gray-300 placeholder:text-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    className={
                      "w-full border-2 text-white border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    {" "}
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    className={
                      "w-full border-2 text-white border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <label className="text-white font-medium" htmlFor="">
                  Trip Image
                </label>
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt="Trip Image"
                    className="rounded-md mb-4 mt-2 w-full"
                    width={300}
                    height={150}
                  />
                )}
                <UploadButton
                  endpoint={"imageUploader"}
                  onClientUploadComplete={(res) => {
                    if (res && res[0].ufsUrl) {
                      setImageUrl(res[0].ufsUrl);
                    }
                  }}
                  onUploadError={(error: Error) => {
                    console.error("Upload error: ", error);
                  }}
                />
              </div>
              <Button
                type="submit"
                className={"w-full py-6 cursor-pointer"}
                disabled={isPending}
              >
                {isPending ? "Creating..." : "Create Trip"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="absolute inset-0 bg-black/50 z-10"></div>
    </section>
  );
};

export default NewTrip;
