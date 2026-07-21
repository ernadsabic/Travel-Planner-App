import { auth } from "@/auth";
import TripDetailClient from "@/components/TripDetailClient";
import { prisma } from "@/lib/prisma";

interface Params {
  params: Promise<{ tripId: string }>;
}

const TripDetail = async ({ params }: Params) => {
  const session = await auth();
  if (!session) {
    return <div>Please sign in.</div>;
  }

  const { tripId } = await params;
  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId: session.user?.id },
    include: { locations: true },
  });
  
  if (!trip) {
    return <div>Trip not found.</div>;
  }

  return <TripDetailClient trip={trip} />;
};

export default TripDetail;
