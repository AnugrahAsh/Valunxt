import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import Shell from '@/real-estate/components/Shell';
import { LISTINGS } from '@/real-estate/data/listings';
import { toLocale } from '@/real-estate/lib/routes';
import LeadForm from '@/real-estate/components/LeadForm';

type Params = { params: Promise<{ region: string; id: string }> };

export function generateStaticParams() {
  // If you want static generation for listings, you'd return the ids per region.
  // We'll leave this empty or minimal for now.
  return [];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const resolvedParams = await params;
  const listing = LISTINGS.find((l) => l.id === resolvedParams.id);
  if (!listing) return {};
  return {
    title: `${listing.title} - ${listing.community} | Valunxt Real Estate`,
    description: `Discover this ${listing.beds} ${listing.type} located in ${listing.community}.`,
  };
}

export default async function ListingDetailPage({ params }: Params) {
  const resolvedParams = await params;
  const region = toLocale(resolvedParams.region);
  const listing = LISTINGS.find((l) => l.id === resolvedParams.id);

  if (!listing) {
    notFound();
  }

  return (
    <Shell region={region}>
      <div className="vxr-flow">
        {/* Simple Hero Image for Listing */}
        <section className="vxr-scene vxr-scene--flush" style={{ height: '70vh', minHeight: '500px' }}>
          <figure className="vxr-mast__shot" style={{ height: '100%', margin: 0, position: 'relative' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={listing.img} 
              alt={listing.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, padding: 'clamp(20px, 6vw, 132px)', width: '100%', background: 'linear-gradient(to top, rgba(10, 23, 48, 0.8), transparent)' }}>
                <span className="vxr-tag" style={{ color: '#fff', opacity: 0.8 }}>{listing.community}</span>
                <h1 className="vxr-kicker" style={{ color: '#fff', fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>{listing.title}</h1>
            </div>
          </figure>
        </section>

        {/* Listing Details */}
        <section className="vxr-scene">
          <div className="vxr-scene__body" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', paddingTop: '40px' }}>
            
            <div>
                <h2 className="vxr-line" style={{ marginBottom: '20px' }}>Property Details</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <p className="vxr-copy" style={{ fontSize: '1.2em' }}>
                        <strong>Price:</strong> {listing.price} <em>{listing.priceNote}</em>
                    </p>
                    <p className="vxr-copy"><strong>Type:</strong> {listing.type}</p>
                    <p className="vxr-copy"><strong>Status:</strong> {listing.status}</p>
                    <p className="vxr-copy"><strong>Area:</strong> {listing.area}</p>
                    <p className="vxr-copy"><strong>Bedrooms:</strong> {listing.beds}</p>
                    <p className="vxr-copy"><strong>Bathrooms:</strong> {listing.baths}</p>
                    
                    <div style={{ marginTop: '20px' }}>
                        <h3 className="vxr-tag">Tags</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {listing.tags.map(tag => (
                                <span className="vxr-chip" style={{ margin: 0 }} key={tag}>{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ background: 'var(--vxr-sand)', padding: '40px', borderRadius: '16px' }}>
                <h3 className="vxr-kicker" style={{ fontSize: '2rem', marginBottom: '20px' }}>Register Interest</h3>
                <p className="vxr-copy" style={{ marginBottom: '30px' }}>
                    Get in touch with our team to arrange a viewing or request more information about this property.
                </p>
                <LeadForm />
            </div>

          </div>
        </section>
      </div>
    </Shell>
  );
}
