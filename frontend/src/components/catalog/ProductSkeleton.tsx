export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-200" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-3 w-16 bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
        <div className="flex justify-between pt-2">
          <div className="h-5 w-16 bg-gray-200 rounded" />
          <div className="h-7 w-24 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  )
}