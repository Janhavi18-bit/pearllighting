import React from 'react'

export default function EditorialCollectionMosaic({ onOpenEnquiry, onSelectProduct }) {
  const mosaicItems = [
    {
      id: 'mosaic-tripod',
      name: 'Architectural Suspensions',
      label: 'Suspension & Pendants →',
      image: '/images/products/ceiling-fan-light-501-bk.png',
      alt: 'Pearl Lighting suspension and ceiling luminaire',
      gridArea: 'tile-top-right',
      aspect: 'tall',
    },
    {
      id: 'mosaic-recessed',
      name: 'Deep Recessed Series',
      label: 'Recessed Downlights →',
      image: '/images/products/deep-downlight-duo.png',
      alt: 'Pearl Lighting Deep Downlight Round and Square Duo',
      gridArea: 'tile-mid-wide',
      aspect: 'wide',
    },
    {
      id: 'mosaic-surface',
      name: 'Surface Cylinders',
      label: 'Surface Panels →',
      image: '/images/products/surface-panel-round-black.png',
      alt: 'Pearl Lighting Surface Panel Black Cylinder',
      gridArea: 'tile-mid-narrow',
      aspect: 'tall',
    },
    {
      id: 'mosaic-slim',
      name: 'Slim Panel Discs',
      label: 'Slim Ambient Discs →',
      image: '/images/products/slim-panel-round.png',
      alt: 'Pearl Lighting Slim Panel Round Ambient Disc',
      gridArea: 'tile-bot-1',
      aspect: 'square',
    },
    {
      id: 'mosaic-baffle',
      name: 'Moveable Gimbal COB',
      label: 'Directional Gimbals →',
      image: '/images/products/moveable-cob-detail.png',
      alt: 'Pearl Lighting Moveable Gimbal Mechanism',
      gridArea: 'tile-bot-2',
      aspect: 'square',
    },
    {
      id: 'mosaic-rope',
      name: 'Continuous Rope Light',
      label: 'Linear Rope & Strip →',
      image: '/images/products/rope-light-primary-warm.png',
      alt: 'Pearl Lighting Continuous Architectural Rope Light',
      gridArea: 'tile-bot-3',
      aspect: 'square',
    },
  ]

  const handleItemClick = (item) => {
    window.open(
      `https://wa.me/918329045712?text=${encodeURIComponent(`Hi Pearl Lighting! I am interested in exploring the ${item.name}.`)}`,
      '_blank'
    )
  }

  return (
    <div className="editorial-collection-mosaic-block" id="collections-mosaic">
      {/* Header matching Reference Screenshot */}
      <div className="mosaic-header-row">
        <div>
          <h2 className="mosaic-section-title">Collections</h2>
          <p className="mosaic-section-sub">
            Curated luminaire families designed for modern living, high visual comfort, and clean architectural cutoffs.
          </p>
        </div>
        <a
          href="https://wa.me/918329045712?text=Hi%20Pearl%20Lighting!%20Please%20share%20your%20complete%20architectural%20catalog."
          target="_blank"
          rel="noopener noreferrer"
          className="mosaic-shop-all-link"
        >
          <span>Explore All</span>
          <span className="arrow-sym">→</span>
        </a>
      </div>

      {/* Irregular 6-Tile Design Magazine Spread Mosaic */}
      <div className="mosaic-grid-container">
        {/* Row 1: Top right highlight item */}
        <div
          className="mosaic-card-tile tile-pendant"
          onClick={() => handleItemClick(mosaicItems[0])}
        >
          <img
            src={mosaicItems[0].image}
            alt={mosaicItems[0].alt}
            className="mosaic-tile-img"
          />
          <div className="mosaic-tile-overlay">
            <span className="mosaic-tile-label">{mosaicItems[0].label}</span>
          </div>
        </div>

        {/* Row 2: Middle wide recessed luminaire */}
        <div
          className="mosaic-card-tile tile-wide"
          onClick={() => handleItemClick(mosaicItems[1])}
        >
          <img
            src={mosaicItems[1].image}
            alt={mosaicItems[1].alt}
            className="mosaic-tile-img"
          />
          <div className="mosaic-tile-overlay">
            <span className="mosaic-tile-label">{mosaicItems[1].label}</span>
          </div>
        </div>

        {/* Row 2: Middle narrow surface cylinder */}
        <div
          className="mosaic-card-tile tile-narrow"
          onClick={() => handleItemClick(mosaicItems[2])}
        >
          <img
            src={mosaicItems[2].image}
            alt={mosaicItems[2].alt}
            className="mosaic-tile-img"
          />
          <div className="mosaic-tile-overlay">
            <span className="mosaic-tile-label">{mosaicItems[2].label}</span>
          </div>
        </div>

        {/* Row 3: 3 Bottom square tiles */}
        <div
          className="mosaic-card-tile tile-sq-1"
          onClick={() => handleItemClick(mosaicItems[3])}
        >
          <img
            src={mosaicItems[3].image}
            alt={mosaicItems[3].alt}
            className="mosaic-tile-img"
          />
          <div className="mosaic-tile-overlay">
            <span className="mosaic-tile-label">{mosaicItems[3].label}</span>
          </div>
        </div>

        <div
          className="mosaic-card-tile tile-sq-2"
          onClick={() => handleItemClick(mosaicItems[4])}
        >
          <img
            src={mosaicItems[4].image}
            alt={mosaicItems[4].alt}
            className="mosaic-tile-img"
          />
          <div className="mosaic-tile-overlay">
            <span className="mosaic-tile-label">{mosaicItems[4].label}</span>
          </div>
        </div>

        <div
          className="mosaic-card-tile tile-sq-3"
          onClick={() => handleItemClick(mosaicItems[5])}
        >
          <img
            src={mosaicItems[5].image}
            alt={mosaicItems[5].alt}
            className="mosaic-tile-img"
          />
          <div className="mosaic-tile-overlay">
            <span className="mosaic-tile-label">{mosaicItems[5].label}</span>
          </div>
        </div>
      </div>

      <style>{`
        .editorial-collection-mosaic-block {
          background: #FFFFFF;
          border-radius: 0 0 20px 0;
          padding: 60px 48px 80px;
          display: flex;
          flex-direction: column;
          gap: 36px;
        }

        .mosaic-header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
        }

        .mosaic-section-title {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: 28px;
          font-weight: 400;
          color: #161514;
          margin-bottom: 6px;
        }

        .mosaic-section-sub {
          font-size: 13px;
          line-height: 1.6;
          color: #655F55;
          max-width: 440px;
        }

        .mosaic-shop-all-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 700;
          color: #D85623;
          text-decoration: none;
          white-space: nowrap;
        }

        /* Irregular Magazine Grid Layout */
        .mosaic-grid-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: auto auto auto;
          gap: 16px;
        }

        .mosaic-card-tile {
          position: relative;
          background: #F8F5EE;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mosaic-card-tile:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
        }

        .mosaic-tile-img {
          width: 82%;
          height: 82%;
          object-fit: contain;
          transition: transform 0.4s ease;
          filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.2));
        }

        .mosaic-card-tile:hover .mosaic-tile-img {
          transform: scale(1.06);
        }

        .mosaic-tile-overlay {
          position: absolute;
          bottom: 12px;
          left: 12px;
          right: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .mosaic-tile-label {
          background: rgba(22, 21, 20, 0.85);
          backdrop-filter: blur(8px);
          color: #FAF7F2;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.04em;
          padding: 5px 12px;
          border-radius: 999px;
          transition: background 0.2s ease;
        }

        .mosaic-card-tile:hover .mosaic-tile-label {
          background: #D85623;
        }

        /* Specific Grid Spans */
        .tile-pendant {
          grid-column: 3;
          grid-row: 1;
          aspect-ratio: 1 / 1.1;
        }

        .tile-wide {
          grid-column: 1 / 3;
          grid-row: 1 / 2;
          aspect-ratio: 2 / 1.1;
        }

        .tile-narrow {
          grid-column: 3;
          grid-row: 2;
          aspect-ratio: 1 / 1.2;
        }

        .tile-sq-1 {
          grid-column: 1;
          grid-row: 2;
          aspect-ratio: 1 / 1.2;
        }

        .tile-sq-2 {
          grid-column: 2;
          grid-row: 2;
          aspect-ratio: 1 / 1.2;
        }

        .tile-sq-3 {
          grid-column: 1 / 4;
          grid-row: 3;
          aspect-ratio: 3 / 1;
          background: #11100F;
        }

        .tile-sq-3 .mosaic-tile-img {
          width: 70%;
          height: 70%;
        }

        @media (max-width: 900px) {
          .editorial-collection-mosaic-block {
            padding: 40px 24px;
            border-radius: 0;
          }
          .mosaic-grid-container {
            grid-template-columns: 1fr;
          }
          .tile-pendant,
          .tile-wide,
          .tile-narrow,
          .tile-sq-1,
          .tile-sq-2,
          .tile-sq-3 {
            grid-column: 1;
            grid-row: auto;
            aspect-ratio: 16 / 10;
          }
        }
      `}</style>
    </div>
  )
}
