"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

// async function geocodeAddress(address: string) {
//   const apiKey = process.env.GOOGLE_MAPS_API_KEY!;
//   const response = await fetch(
//     `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
//       address
//     )}&key=${apiKey}`
//   );

//   const data = await response.json();
//   const { lat, lng } = data.results[0].geometry.location;
//   return { lat, lng };
// }
async function geocodeAddress(address: string) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      address
    )}&format=json&limit=1`,
    {
      headers: {
        "User-Agent": "MyTravelApp/1.0 (gymbrother00@gmail.com)",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Greška prilikom geokodiranja");
  }

  const data = await response.json();

  if (!data || data.length === 0) {
    throw new Error("Lokacija nije pronađena. Unesite precizniju adresu.");
  }

  const lat = parseFloat(data[0].lat);
  const lng = parseFloat(data[0].lon);

  return { lat, lng };
}

export async function addLocation(formData: FormData, tripId: string) {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }

  const address = formData.get("address")?.toString();
  if (!address) {
    throw new Error("Missing address");
  }

  const { lat, lng } = await geocodeAddress(address);

  const count = await prisma.location.count({
    where: { tripId },
  });

  await prisma.location.create({
    data: {
      locationTitle: address,
      lat,
      lng,
      tripId,
      order: count,
    },
  });

  redirect(`/trips/${tripId}`);
}
