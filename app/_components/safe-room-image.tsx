import Image, { type ImageProps } from "next/image";

const ALLOWED_HOSTNAMES = new Set(["images.unsplash.com"]);

function isOptimizableSrc(src: string): boolean {
  if (src.startsWith("/")) return true;
  try {
    return ALLOWED_HOSTNAMES.has(new URL(src).hostname);
  } catch {
    return false;
  }
}

type SafeRoomImageProps = Omit<ImageProps, "src"> & { src: string };

export default function SafeRoomImage({ src, alt, className, ...props }: SafeRoomImageProps) {
  if (!isOptimizableSrc(src)) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`absolute inset-0 h-full w-full object-cover ${className ?? ""}`}
      />
    );
  }

  return <Image src={src} alt={alt} className={className} {...props} />;
}
