import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { Calendar, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Trips = async () => {
  const session = await auth();
  const trips = await prisma.trip.findMany({
    where: { userId: session?.user?.id },
  });

  const sortedTrips = [...trips].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingTrips = sortedTrips.filter(
    (trip) => new Date(trip.startDate) >= today
  );

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 text-xl">
        Please Sign In.
      </div>
    );
  }
  return (
    <div className="space-y-6 container mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button
          variant="default"
          render={<Link href="/trips/new" />}
          className="p-6"
          nativeButton={false}
        >
          <Plus className="text-white h-5 w-5" />
          New Trip
        </Button>
      </div>

      <Card className="shadow-md py-6 mb-10">
        <CardHeader>
          <CardTitle>
            Welcome back,{" "}
            <span className="font-bold">{session.user?.name}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            {trips.length === 0
              ? "Start planning your first trip by clicking the button above"
              : `You have ${trips.length} ${
                  trips.length === 1 ? "trip" : "trips"
                } planned. ${
                  upcomingTrips.length !== 0
                    ? `${upcomingTrips.length} upcoming.`
                    : ""
                }`}
          </p>
        </CardContent>
      </Card>

      <div>
        <div className="flex items-center gap-2 mb-10">
          <Calendar className="h-5 w-5 text-gray-600" />
          <h2 className="text-xl font-semibold">Your Recent Trips</h2>
        </div>
        {trips.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <h3 className="text-xl font-medium mb-2">No trips yet</h3>
              <p className="text-center mb-4 maw-w-md">
                Start planning your adventure by creating your frist trip
              </p>
              <Button>
                <Link href={"/trips/new"}>Create Trip</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedTrips.slice(0, 6).map((trip, key) => (
              <Link href={`/trips/${trip.id}`} key={key}>
                <Card className="pt-0 flex flex-col gap-6 shadow-md h-full">
                  {trip.imageUrl ? (
                    <div className="relative overflow-hidden aspect-video">
                      <Image
                        src={trip.imageUrl}
                        alt="Trip Image"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="relative overflow-hidden aspect-video">
                      <Image
                        src="/placeholder.jpg"
                        alt="Trip Image"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <CardHeader className="flex-1">
                    <CardTitle className="line-clamp-1 text-2xl">
                      {trip.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl line-clamp-2 mb-2">
                      {trip.description}
                    </p>
                    <div className="text-md">
                      {new Date(trip.startDate).toLocaleDateString()} -{" "}
                      {new Date(trip.endDate).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Trips;
