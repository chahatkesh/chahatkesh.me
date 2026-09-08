import { ProtectedRoute } from "~/components/admin";
import { WallpaperSetup } from "~/components/admin/wallpaper-setup";
import config from "~/config";
import { buildWallpaperUrl } from "~/lib/wallpaper";

export default function WallpaperPage() {
  const wallpaperUrl = buildWallpaperUrl(`https://${config.domainName}`);

  return (
    <ProtectedRoute>
      <WallpaperSetup wallpaperUrl={wallpaperUrl} />
    </ProtectedRoute>
  );
}
