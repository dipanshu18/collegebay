export function FAQ() {
  return (
    <>
      {/*<!-- Component: Icon accordion --> */}
      <section className="w-full divide-y divide-slate-200 rounded">
        <details className="group p-4" open>
          <summary className="relative flex cursor-pointer list-none gap-4 pr-8 font-medium text-slate-900 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-400  [&::-webkit-details-marker]:hidden">
            How a user can create a post/request ?
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-0 top-1 h-4 w-4 shrink-0 stroke-slate-900 transition duration-300 group-open:rotate-45"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-labelledby="title-ac06 desc-ac06"
            >
              <title id="title-ac06">Open icon</title>
              <desc id="desc-ac06">
                icon that represents the state of the summary
              </desc>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </summary>
          <p className="mt-4 text-slate-900">
            The components in Wind UI are designed to work in the latest, stable
            releases of all major browsers, including Chrome, Firefox, Safari,
            and Edge.
          </p>
        </details>
        <details className="group p-4">
          <summary className="relative flex cursor-pointer list-none gap-4 pr-8 font-medium text-slate-900 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-400  [&::-webkit-details-marker]:hidden">
            What does strict checking means ?
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-0 top-1 h-4 w-4 shrink-0 stroke-slate-900 transition duration-300 group-open:rotate-45"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-labelledby="title-ac08 desc-ac08"
            >
              <title id="title-ac08">Open icon</title>
              <desc id="desc-ac08">
                icon that represents the state of the summary
              </desc>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </summary>
          <p className="mt-4 text-slate-900">
            All components are easily customizable to match your own project.
          </p>
        </details>
        <details className="group p-4">
          <summary className="relative flex cursor-pointer list-none gap-4 pr-8 font-medium text-slate-900 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-400  [&::-webkit-details-marker]:hidden">
            How can user remove/edit item post details ?
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-0 top-1 h-4 w-4 shrink-0 stroke-slate-900 transition duration-300 group-open:rotate-45"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-labelledby="title-ac12 desc-ac12"
            >
              <title id="title-ac12">Open icon</title>
              <desc id="desc-ac12">
                icon that represents the state of the summary
              </desc>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </summary>
          <p className="mt-4 text-slate-900">
            You can help our team improve WindUI by giving us feedback on our
            discord channel.
          </p>
        </details>
        <details className="group p-4">
          <summary className="relative flex cursor-pointer list-none gap-4 pr-8 font-medium text-slate-900 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-400  [&::-webkit-details-marker]:hidden">
            How to contact sellers/requesters ?
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-0 top-1 h-4 w-4 shrink-0 stroke-slate-900 transition duration-300 group-open:rotate-45"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-labelledby="title-ac10 desc-ac10"
            >
              <title id="title-ac10">Open icon</title>
              <desc id="desc-ac10">
                icon that represents the state of the summary
              </desc>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </summary>
          <p className="mt-4 text-slate-900">
            WindUI is not an open source project yet, but we don't guarantee
            that it won't become in the future.
          </p>
        </details>
        <details className="group p-4">
          <summary className="relative flex cursor-pointer list-none gap-4 pr-8 font-medium text-slate-900 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-400  [&::-webkit-details-marker]:hidden">
            How can user remove/edit item request ?
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-0 top-1 h-4 w-4 shrink-0 stroke-slate-900 transition duration-300 group-open:rotate-45"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-labelledby="title-ac12 desc-ac12"
            >
              <title id="title-ac12">Open icon</title>
              <desc id="desc-ac12">
                icon that represents the state of the summary
              </desc>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </summary>
          <p className="mt-4 text-slate-900">
            You can help our team improve WindUI by giving us feedback on our
            discord channel.
          </p>
        </details>
      </section>
      {/*<!-- End Icon accordion --> */}
    </>
  );
}
