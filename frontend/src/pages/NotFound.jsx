import BackButton from "../components/BackButton";

export default function NotFound() {
  return (
    <div>
      <div className="min-h-screen container mx-5 flex flex-col items-center gap-y-2 justify-center">
        <div className="self-start mt-20 text-2xl text-teal-700 ">
          Back home
          <BackButton />
        </div>
        <h1 className="text-5xl text-center">PAGE NOT FOUND</h1>
        <img
          className="max-w-[500px]"
          src="/assets/not_found.png"
          alt="not found img"
        />
      </div>
    </div>
  );
}
