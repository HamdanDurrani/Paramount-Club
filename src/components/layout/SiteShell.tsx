import { VideoCachePrefetch } from "@/components/common/VideoCachePrefetch";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  eventVenueJsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/structured-data";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import styles from "./SiteShell.module.css";

interface SiteShellProps {
  children: React.ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={eventVenueJsonLd()} />
      <VideoCachePrefetch />
      <Navbar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}
