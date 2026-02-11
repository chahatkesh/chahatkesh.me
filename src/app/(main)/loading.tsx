export default function MainLoading() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center py-12">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted-foreground border-t-brand" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </section>
  );
}
