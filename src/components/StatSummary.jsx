export default function StatSummary({ tasks }) {
  const completedCount = tasks.filter((task) => task.completed).length
  const pendingCount = tasks.length - completedCount
  const statistics = [
    { label: 'Total tasks', value: tasks.length },
    { label: 'Completed', value: completedCount },
    { label: 'Pending', value: pendingCount },
  ]

  return (
    <dl className="grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-white py-4 sm:py-5">
      {statistics.map(({ label, value }) => (
        <div key={label} className="flex flex-col px-3 text-center sm:px-5">
          <dt className="order-2 mt-1 text-[11px] leading-4 text-muted sm:text-xs">{label}</dt>
          <dd className="order-1 text-2xl font-semibold tracking-[-0.04em] text-ink sm:text-[28px]">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
