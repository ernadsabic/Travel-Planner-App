import NewLocationClient from "@/components/NewLocationClient";

interface Params {
  params: Promise<{ tripId: string }>;
}

const NewLocation = async ({ params }: Params) => {
  const { tripId } = await params;
  return <NewLocationClient tripId={tripId} />;
};

export default NewLocation;
