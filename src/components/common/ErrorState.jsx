export default function ErrorState({ title = 'Something went wrong', message, onRetry }) {
  return (
    <div className="rounded-md border border-red-200 bg-red-50 p-6 text-center text-red-900">
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      {message ? <p className="mx-auto mt-2 max-w-xl text-sm leading-6">{message}</p> : null}
      {onRetry ? (
        <button type="button" onClick={onRetry} className="mt-5 rounded-md bg-red-900 px-5 py-3 text-sm font-bold text-white">
          Try Again
        </button>
      ) : null}
    </div>
  );
}
