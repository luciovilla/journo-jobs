export const LoadMoreButton = ({
  remaining,
  onLoadMore,
}: {
  remaining?: number;
  onLoadMore?: () => void;
}) => {
  return (
    <button
      className="cursor-pointer w-full rounded-full border border-(--line) bg-white py-3 text-sm font-medium text-(--muted) hover:bg-(--panel) transition"
      onClick={onLoadMore}
      type="button"
    >
      Load 20 more ({remaining} remaining)
    </button>
  );
};
