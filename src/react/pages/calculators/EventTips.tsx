type EventTipsProps = {
  title: string;
  tips: string[];
};

function EventTips({ title, tips }: EventTipsProps) {
  return (
    <div className="card card-border bg-base-300 text-neutral-content w-150 border-gray-400 p-4">
      <h2 className="self-center text-2xl">{title}</h2>
      <ul className="list-disc list-inside mt-2 text-sm">
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}

export default EventTips;
