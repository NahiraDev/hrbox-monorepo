export default function EmptyChat() {
  return (
    <div className="flex items-center gap-4 justify-center h-full">
      <div className="bg-white dark:bg-info-1000 border-1 dark:border-neutral-700 border-netural-100 rounded-3 w-fit py-2 px-4">
        <span className="text-sm text-netural-400 font-normal leading-normal">
          Select a chat to start messaging
        </span>
      </div>
    </div>
  );
}
