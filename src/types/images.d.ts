/// <reference types="next/image-types/global" />

// next-env.d.ts references these types too, but that file is generated and
// gitignored. Static imports are StaticImageData ({ src, width, height }),
// not strings. This keeps `tsc` on a clean checkout aligned with Next.
