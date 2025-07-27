export default function Skeleton(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="animate-pulse bg-gray-300 rounded"
      {...props}
    />
  );
}
