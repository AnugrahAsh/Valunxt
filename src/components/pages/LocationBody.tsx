/**
 * /location/ — where the group actually is.
 *
 * It used to be eight cards: four offices and four group companies, each a
 * stock photograph of a city with the address printed over it, and not one map
 * — so the single question the page exists to answer took a trip to Google.
 *
 * Now it is one map with four pins (see location/OfficeAtlas), an aerial toggle
 * for the surroundings, and the group companies as a list rather than a second
 * grid of photographs. Every office is still listed in full in the markup, so
 * the page answers the question with the script blocked.
 *
 * The office list, the addresses and the two published phone lines come from
 * lib/site-data, which is also what the footer and the Contact page read.
 */
import { rurl, vxnRegionData, vxnRegionPhone } from '@/lib/region';
import { vxnCompanyList, vxnMarkets, vxnOffices } from '@/lib/site-data';
import { Ico } from '@/components/vxh/kit';
import { Faq, Head, Newsletter, PageHero, Ready, type FaqItem } from '@/components/vxh/PageKit';
import OfficeAtlas from '@/components/pages/location/OfficeAtlas';

const FAQ: FaqItem[] = [
  {
    q: 'Which office should I contact?',
    a: '<p>Whichever is closest to the asset or the entity in question. Dubai answers the UAE line and Noida the India line; both reach the same team, so a message to either will find the right person.</p>',
  },
  {
    q: 'Can I visit without an appointment?',
    a: '<p>Please book first. Advisory work is done off-site as often as in the office, and a scheduled conversation means the person you need is there and has read your file.</p>',
  },
  {
    q: 'Do you work outside these four cities?',
    a: `<p>Yes. The offices are where our people sit, not the limit of where we act — a large share of the work is cross-border between ${vxnMarkets(
      'short',
    )}, and mandates elsewhere are taken where we can serve them properly.</p>`,
  },
  {
    q: 'Why does each office name a different company?',
    a: '<p>Because the group is four regulated firms rather than one. The entity named at each address is the one that contracts there; you deal with one team regardless.</p>',
  },
];

export default function LocationBody({ region }: { region: string }) {
  const reg = vxnRegionData(region);
  const phone = vxnRegionPhone(region);
  const offices = Object.entries(vxnOffices());
  const companies = vxnCompanyList();

  return (
    <div id="main-content">
      <div id="main" role="main" className="vamtam-main layout-full">
        <div className="vxh vxp">
          <PageHero
            region={region}
            crumb={[['About', '/about/'], ['Location']]}
            eyebrow="Where We Are"
            title={`${offices.length} offices. Two markets. <span class="vxh-grad">One team.</span>`}
            lede={`${vxnMarkets(
              'cities',
            )} &mdash; find the office nearest to you, see what is around it, and start a conversation with the people who work there.`}
            action={{ label: 'Talk to an adviser', href: rurl(region, '/contact/') }}
            bg={{ field: 'mist' }}
            par="slide"
            meta={offices.slice(0, 4).map(([, o]) => [o.city, o.note || o.country] as [string, string])}
          />

          {/* The map. Every office is in the markup below it, so the page still
              answers the question with the script blocked. */}
          <section className="vxl-sec vxp-sec" aria-labelledby="vxl-off-h">
            <div className="vxh__in">
              <Head
                split
                eyebrow="The Offices"
                title="Pick one and look around it."
                id="vxl-off-h"
                lede="Switch to the aerial view to see the building and what surrounds it before you set out."
              />
              <OfficeAtlas offices={offices} />

              {/* The plain list. It is what a reader without the map gets, and
                  what a crawler indexes — four addresses, marked up as such. */}
              <ol className="vxl-all">
                {offices.map(([key, o], i) => (
                  <li key={key} data-vxn-in="up">
                    <span className="vxl-all__n">{String(i + 1).padStart(2, '0')}</span>
                    <span className="vxl-all__c">
                      {o.city}
                      <small>{o.entity}</small>
                    </span>
                    <address className="vxl-all__a">{o.address}</address>
                    <span className="vxl-all__l">
                      <a href={`tel:${o.tel}`}>{o.phone}</a>
                      <a href={o.map} target="_blank" rel="noopener">
                        Directions <Ico name="ne" size={13} />
                      </a>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* The group companies — a list, because that is what they are. */}
          <section className="vxp-sec vxp-sec--cream" aria-labelledby="vxl-grp-h">
            <div className="vxh__in">
              <Head
                split
                eyebrow="Our Ecosystem"
                title="Four firms behind the four addresses."
                id="vxl-grp-h"
                lede={`Valuation, real estate, mortgage and corporate services across ${vxnMarkets('short')}.`}
              />
              <ol className="vxp-rows">
                {companies.map((c, i) => (
                  <li key={c.url} data-vxn-in="up">
                    <a className="vxp-row" href={rurl(region, c.url)}>
                      <span className="vxp-row__n">{String(i + 1).padStart(2, '0')}</span>
                      <span className="vxp-row__t">{c.name}</span>
                      <span className="vxp-row__d">
                        {c.discipline} &mdash; {c.blurb}
                      </span>
                      <Ico name="ne" size={16} />
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <Faq items={FAQ} title="Before you set out." />

          <Ready
            region={region}
            phone={phone}
            tel={reg.tel}
            hours={`${reg.hours} · ${reg.cities}`}
            abs="arcs"
          />
          <Newsletter region={region} />
        </div>
      </div>
    </div>
  );
}
