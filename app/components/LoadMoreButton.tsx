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
      {(remaining ?? 0) < 20
        ? `Load ${remaining ?? 0} more`
        : `Load 20 more (${remaining ?? 0} remaining)`}
    </button>
  );
};
