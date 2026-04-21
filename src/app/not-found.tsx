import Link from "next/link";

export default function Custom404() {
  return (
    <section
      className="flex min-h-dvh items-center justify-center px-6"
      id="main-content"
    >
      <div className="max-w-md text-center">
        <p
          aria-hidden="true"
          className="font-poem text-[8rem] font-semibold leading-none tracking-tighter text-foreground/[0.04] sm:text-[12rem]"
        >
          404
        </p>

        <div className="-mt-10 space-y-4 sm:-mt-14">
          <h1 className="font-ubuntu text-lg font-medium text-foreground sm:text-xl">
            Nothing here.
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist, or it was moved
            somewhere else.
          </p>

          <Link
            href="/"
            className="el-focus-styles inline-block rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-card"
          >
            Go home
          </Link>
        </div>
      </div>
    </section>
  );
}
